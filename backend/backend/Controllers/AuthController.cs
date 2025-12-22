using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(
        IAuthService service, 
        ILogger<AuthController> logger) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterDto request)
        {
            if (!ModelState.IsValid)
            {
                foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                    Console.WriteLine("Validation error: " + error.ErrorMessage);
                return BadRequest(ModelState);
            }

            var result = await service.RegisterAsync(request);
            if (result == null)
            {
                return BadRequest("Registration failed");
            }
            
            var (user, jwtToken, refreshToken) = result.Value;
            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                jwtToken,
                refreshToken
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDto request)
        {
            var result = await service.LoginAsync(request);
            if (result == null) return Unauthorized();

            var (user, jwtToken, refreshToken) = result.Value;
            return Ok(new { 
                id = user.Id,
                username = user.UserName,
                email = user.Email,
                jwtToken, 
                refreshToken 
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(RefreshTokenRequestDto request)
        {
            var result = await service.RefreshTokenAsync(request);
            if (result == null) return Unauthorized();
            var (jwtToken, refreshToken) = result.Value;
            return Ok(new { jwtToken, refreshToken });
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(int userId, string token)
        {
            var success = await service.ConfirmEmailAsync(userId, token);
            if (!success) return BadRequest("Email confirmation failed");
            return Ok("Email confirmed successfully");
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            return Ok("Samo ulogovani");
        }
    }
}
