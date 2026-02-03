using backend.Model;
using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController(ILeagueService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<LeagueDto>>> GetAllLeagues()
        {
            return Ok(await service.GetAllAsync());
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<LeagueDto>> GetPlayerById(int id)
        {
            var league = await service.GetLeagueByIdAsync(id);
            if (league == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(league);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateLeague(LeagueCreateDto dto)
        {
            var result = await service.CreateAsync(dto);
            if (result == null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateLeague(int id, LeagueUpdateDto dto)
        {
            var isUpdated = await service.UpdateLeagueAsync(id, dto);
            if (!isUpdated)
            {
                return NotFound("League not found");
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeague(int id)
        {
            var result = await service.DeleteLeagueAsync(id);
            if(!result)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
