using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController(UserManager<ApplicationUser> userManager) : ControllerBase
    {
        [HttpGet("me")]
        public async Task<IActionResult> GetProfile()
        {
            var user = await userManager.GetUserAsync(User);

            if (user == null)
                return Unauthorized();

            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email
            });
        }
    }
}
