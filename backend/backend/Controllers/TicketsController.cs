using backend.Model;
using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController(ITicketService service, UserManager<ApplicationUser> userManager) : ControllerBase
    {
        [HttpGet("sectors/{gameId}")]
        public async Task<IActionResult> GetSectors(int gameId)
        {
            var result = await service.GetSectorsForGame(gameId);
            return Ok(result);
        }

        [Authorize]
        [HttpPost("buy")]
        public async Task<IActionResult> BuyTickets([FromBody] TicketBuyDto dto)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            try
            {
                await service.BuyTicketsAsync(user.Id, dto);
                return Ok(new { message = "Tickets purchased successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<IActionResult> MyTickets()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var tickets = await service.GetUserTicketsAsync(user.Id);
            return Ok(tickets);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("templates")]
        public async Task<IActionResult> GetSectorTemplates()
        {
            var templates = await service.GetSectorTemplatesAsync();
            return Ok(templates);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("templates")]
        public async Task<IActionResult> CreateSectorTemplate([FromBody] SectorTemplateDto dto)
        {
            try
            {
                var created = await service.CreateSectorTemplateAsync(dto);
                return Ok(created);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("templates/{id}")]
        public async Task<IActionResult> UpdateSectorTemplate(int id, [FromBody] SectorTemplateDto dto)
        {
            try
            {
                var updated = await service.UpdateSectorTemplateAsync(id, dto);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("templates/{id}")]
        public async Task<IActionResult> DeleteSectorTemplate(int id)
        {
            try
            {
                await service.DeleteSectorTemplateAsync(id);
                return Ok(new { message = "Sector template deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("createSectors/{gameId}")]
        public async Task<IActionResult> CreateSectorsForGame(int gameId)
        {
            try
            {
                await service.CreateSectorsForGameAsync(gameId);
                return Ok(new { message = "Sectors created for game" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
