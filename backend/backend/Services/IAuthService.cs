using backend.Model;
using backend.ViewModel;

namespace backend.Services
{
    public interface IAuthService
    {
        Task<(ApplicationUser user, string jwtToken, string refreshToken)?> RegisterAsync(RegisterDto request);
        Task<(string jwtToken, string refreshToken)?> LoginAsync(LoginDto request);
        Task<(string jwtToken, string refreshToken)?> RefreshTokenAsync(RefreshTokenRequestDto request);
        Task<string> GenerateEmailConfirmationTokenAsync(ApplicationUser user);
        Task<bool> ConfirmEmailAsync(int userId, string token);
    }
}
