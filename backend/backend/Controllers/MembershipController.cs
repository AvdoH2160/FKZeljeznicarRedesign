using backend.Model;
using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipController(UserManager<ApplicationUser> userManager, IMembershipService service) : ControllerBase
    {
        [Authorize]
        [HttpPost("apply")]
        public async Task<IActionResult> Apply([FromBody] MembershipApplicationDto dto)
        {
            var user = await userManager.GetUserAsync(User);
            await service.ApplyAsync(user.Id, dto);
            return Ok("Prijava uspješno poslana.");
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<IActionResult> MyMembership()
        {
            var user = await userManager.GetUserAsync(User);
            var membership = await service.GetMyMembershipAsync(user.Id);
            return Ok(membership);
        }

        [Authorize]
        [HttpGet("check/{membershipNumber}")]
        public async Task<IActionResult> Check(string membershipNumber)
        {
            var result = await service.CheckAsync(membershipNumber);
            if (result == null) return BadRequest("Nema clanske");
            return Ok(result);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("approve/{id}")]
        public async Task<IActionResult> Approve(Guid id)
        {
            await service.ApproveAsync(id);
            return Ok("Članarina odobrena.");
        }


        [Authorize]
        [HttpPost("renew")]
        public async Task<IActionResult> Renew([FromBody] MembershipRenewalDto dto)
        {
            var user = await userManager.GetUserAsync(User);
            await service.RenewAsync(user.Id, dto);
            return Ok("Zahtjev za obnovu poslan.");
        }

        [HttpGet("pending")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPendingMemberships()
        {
            var list = await service.GetPendingMembershipsAsync();
            return Ok(list);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("active")]
        public async Task<IActionResult> GetActive()
        {
            var list = await service.GetActiveMembershipsAsync();
            var dtos = list.Select(m => new MembershipDto
            {
                Id = m.Id,
                FirstName = m.User.Profile?.FirstName ?? "",
                LastName = m.User.Profile?.LastName ?? "",
                Email = m.User.Email,
                City = m.User.Profile?.City ?? "",
                Year = m.Year,
                MembershipNumber = m.MembershipNumber,
                CodeValue = m.CodeValue,
                IsActive = m.IsActive
            }).ToList();

            return Ok(dtos);
        }

        [HttpPost("reject/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Reject(Guid id)
        {
            try
            {
                await service.RejectAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
