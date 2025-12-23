using backend.ViewModel;

namespace backend.Services
{
    public interface IAdminService
    {
        Task<AdminStatsDto> GetStatsAsync();
        Task<List<AdminUserDto>> GetUsersAsync();
        Task<bool> BanUserAsync(int userId);
        Task<bool> UnBanUserAsync(int userId);
        Task<bool> PromoteToAdminAsync(int userId);
        Task<bool> DeleteUserAsync(int userId);
    }
}
