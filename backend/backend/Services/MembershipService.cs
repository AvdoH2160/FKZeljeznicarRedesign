using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Services
{
    public class MembershipService(AppDbContext context) : IMembershipService
    {
        public async Task ApplyAsync(int userId, MembershipApplicationDto dto)
        {
            bool alreadyMember = await context.Memberships
            .AnyAsync(m => m.UserId == userId && m.Year == dto.Year);

            if (alreadyMember)
                throw new Exception("Već ste član za ovu godinu.");

            bool alreadyApplied = await context.MembershipApplications
                .AnyAsync(a =>
                    a.UserId == userId &&
                    a.Year == dto.Year &&
                    a.Status == ApplicationStatus.Pending);

            if (alreadyApplied)
                throw new Exception("Već imate aktivnu prijavu.");

            var application = new MembershipApplication
            {
                UserId = userId,
                Year = dto.Year,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                Address = dto.Address,
                City = dto.City,
                PostalCode = dto.PostalCode,
                Country = dto.Country,
                Email = dto.Email,
                Phone = dto.Phone,
                Status = ApplicationStatus.Pending,
                Type = ApplicationType.New
            };

            context.MembershipApplications.Add(application);
            await context.SaveChangesAsync();
        }

        public async Task ApproveAsync(Guid applicationId)
        {
            var app = await context.MembershipApplications
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == applicationId);

            if (app == null) throw new Exception("Prijava ne postoji");

            bool exists = await context.Memberships
                .AnyAsync(m => m.UserId == app.UserId && m.Year == app.Year);

            if (exists)
                throw new Exception("Clanarina vec postoji");

            var count = await context.Memberships
                .CountAsync(m => m.Year == app.Year);

            var membershipNumber = (count + 1).ToString("D6");

            var membership = new Membership
            {
                UserId = app.UserId,
                Year = app.Year,
                MembershipNumber = membershipNumber,
                CodeValue = $"ZELJO|{app.Year}|{membershipNumber}",
                IsActive = true
            };

            context.Memberships.Add(membership);

            app.Status = ApplicationStatus.Approved;

            await context.SaveChangesAsync();
        }

        public async Task<MembershipCheckDto> CheckAsync(string code)
        {
            var membership = await context.Memberships
            .Include(m => m.User)
            .ThenInclude(u => u.Profile)
            .FirstOrDefaultAsync(m =>
                m.MembershipNumber == code &&
                m.IsActive);

            if (membership == null)
                throw new Exception("Nevažeća članska karta.");

            return new MembershipCheckDto
            {
                FirstName = membership.User.Profile.FirstName,
                LastName = membership.User.Profile.LastName,
                Year = membership.Year
            };
        }

        public async Task<Membership?> GetMyMembershipAsync(int userId)
        {
            return await context.Memberships
                .Where(m => m.UserId == userId && m.IsActive)
                .OrderByDescending(m => m.Year)
                .FirstOrDefaultAsync();
        }

        public async Task RenewAsync(int userId, MembershipRenewalDto dto)
        {
            bool alreadyMember = await context.Memberships
                .AnyAsync(m => m.UserId == userId && m.Year == dto.Year);

            if (alreadyMember)
                throw new Exception("Već ste član za ovu godinu.");

            var oldMembership = await context.Memberships
                .Include(m => m.User)
                .ThenInclude(u => u.Profile)
                .FirstOrDefaultAsync(m =>
                    m.MembershipNumber == dto.MembershipNumber);

            if (oldMembership == null)
                throw new Exception("Broj članske kartice ne postoji.");

            var profile = oldMembership.User.Profile;

            if (!string.Equals(profile.FirstName, dto.FirstName, StringComparison.OrdinalIgnoreCase) ||
                !string.Equals(profile.LastName, dto.LastName, StringComparison.OrdinalIgnoreCase))
            {
                throw new Exception("Podaci se ne poklapaju.");
            }

            var application = new MembershipApplication
            {
                UserId = userId,
                Year = dto.Year,
                Type = ApplicationType.Renewal,
                OldMembershipNumber = dto.MembershipNumber,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Status = ApplicationStatus.Pending
            };

            context.MembershipApplications.Add(application);
            await context.SaveChangesAsync();
        }

        public async Task<List<MembershipApplication>> GetPendingMembershipsAsync()
        {
            return await context.MembershipApplications
                .Where(m => m.Status != ApplicationStatus.Approved)
                .ToListAsync();
        }

        public async Task RejectAsync(Guid id)
        {
            var app = await context.MembershipApplications
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (app == null)
                throw new Exception("Prijava ne postoji");

            if (app.Status == ApplicationStatus.Approved)
                throw new Exception("Već odobrena prijava ne može biti odbijena");

            app.Status = ApplicationStatus.Rejected;

            await context.SaveChangesAsync();
        }

        public async Task<List<Membership>> GetActiveMembershipsAsync()
        {
            return await context.Memberships
                .Include(m => m.User)
                .ThenInclude(u => u.Profile)
                .Where(m => m.IsActive)
                .OrderByDescending(m => m.Year)
                .ToListAsync();
        }
    }
}
