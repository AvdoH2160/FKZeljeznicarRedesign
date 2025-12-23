using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController(IAdminService service) : ControllerBase
    {
        [HttpGet("stats")]
        public async Task<IActionResult> GeStats()
        {
            var stats = await service.GetStatsAsync();
            return Ok(stats);
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await service.GetUsersAsync();
            return Ok(users);
        }

        [HttpPost("users/{id}/ban")]
        public async Task<IActionResult> BanUser(int id)
        {
            var result = await service.BanUserAsync(id);
            return Ok(result);
        }

        [HttpPost("users/{id}/unban")]
        public async Task<IActionResult> UnBanUser(int id)
        {
            var result = await service.UnBanUserAsync(id);
            return Ok(result);
        }

        [HttpPost("users/{id}/promote")]
        public async Task<IActionResult> PromoteToAdmin(int id)
        {
            var result = await service.PromoteToAdminAsync(id);
            return Ok(result);
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
            => Ok(await service.DeleteUserAsync(id));
    }
}
