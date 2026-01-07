using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController(UserManager<ApplicationUser> userManager, AppDbContext context) : ControllerBase
    {
        [HttpGet("me")]
        public async Task<IActionResult> GetProfile()
        {
            var currentYear = DateTime.UtcNow.Year;
            var userId = int.Parse(userManager.GetUserId(User));

            var user = await userManager
                .Users
                .Include(u => u.Profile)
                .Include(u => u.Memberships)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return Unauthorized();

            var currentMembership = user.Memberships
                .FirstOrDefault(m => m.Year == currentYear && m.IsActive);

            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.Profile.FirstName,
                user.Profile.LastName,
                user.Profile.City,
                user.Profile.DateOfBirth,
                Membership = currentMembership == null ? null : new
                {
                    currentMembership.Id,
                    currentMembership.MembershipNumber,
                    currentMembership.CodeValue,
                    currentMembership.Year,
                    currentMembership.IsActive,
                    currentMembership.CreatedAt
                }
            });
        }

        [Authorize]
        [HttpPut("me")]
        public async Task<IActionResult> UpdateProfile(ProfileUpdateDto dto)
        {
            var userId = int.Parse(userManager.GetUserId(User));
            var user = await userManager.Users
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(u => u.Id == userId);
            
            if (user == null) return Unauthorized();

            if(user.Profile != null)
            {
                user.Profile.FirstName = dto.FirstName;
                user.Profile.LastName = dto.LastName;
                user.Profile.City = dto.City;
                if(dto.DateOfBirth.HasValue)
                    user.Profile.DateOfBirth = dto.DateOfBirth.Value;
            }


            if (!string.IsNullOrEmpty(dto.Email) && dto.Email != user.Email)
            {
                user.Email = dto.Email;
                user.NormalizedEmail = dto.Email.ToUpper();
            }

            try
            {
                await userManager.UpdateAsync(user);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            return Ok(new
            {
                user.UserName,
                user.Email,
                user.Profile.FirstName,
                user.Profile.LastName,
                user.Profile.City,
                user.Profile.DateOfBirth
            });
        }
    }
}
