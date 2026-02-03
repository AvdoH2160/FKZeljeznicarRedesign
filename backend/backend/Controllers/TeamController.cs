using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController(ITeamService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<LeagueDto>>> GetAllTeams()
        {
            return Ok(await service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeamDto>> GetTeamById(int id)
        {
            var team = await service.GetTeamByIdAsync(id);
            if (team == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(team);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromForm] TeamCreateDto dto)
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
        public async Task<ActionResult> UpdateTeam(int id, TeamUpdateDto dto)
        {
            var isUpdated = await service.UpdateTeamAsync(id, dto);
            if (!isUpdated)
            {
                return NotFound("Team not found");
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var result = await service.DeleteTeamAsync(id);
            if (!result)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
