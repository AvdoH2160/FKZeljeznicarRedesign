using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AdminService(AppDbContext context, UserManager<ApplicationUser> userManager) : IAdminService
    {
        public async Task<AdminStatsDto> GetStatsAsync()
        {
            return new AdminStatsDto
            {
                Users = await context.Users.CountAsync(),
                News = await context.News.CountAsync(),
                //Games = await context.Games.CountAsync(),
                Players = await context.Player.CountAsync()
            };
        }

        public async Task<List<AdminUserDto>> GetUsersAsync()
        {
            var users = userManager.Users.ToList();
            var result = new List<AdminUserDto>();

            foreach(var user in users)
            {
                var roles = await userManager.GetRolesAsync(user);

                result.Add(new AdminUserDto
                {
                    Id = user.Id,
                    Username = user.UserName!,
                    Email = user.Email!,
                    Role = roles.FirstOrDefault() ?? "User",
                    IsBanned = user.LockoutEnd != null
                });
            }

            return result;
        }

        public async Task<bool> BanUserAsync(int userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;
            user.LockoutEnd = DateTimeOffset.UtcNow.AddYears(100);
            await userManager.UpdateAsync(user);
            return true;
        }

        public async Task<bool> UnBanUserAsync(int userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;
            user.LockoutEnd = null;
            await userManager.UpdateAsync(user);
            return true;
        }

        public async Task<bool> PromoteToAdminAsync(int userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;
            if(!await userManager.IsInRoleAsync(user, "Admin"))
            {
                await userManager.AddToRoleAsync(user, "Admin");
            }
            return true;
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;
            await userManager.DeleteAsync(user);
            return true;
        }
    }
}
