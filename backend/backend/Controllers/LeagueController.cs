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

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateLeague(LeagueCreateDto dto)
        {
            var result = await service.CreateAsync(dto);
            if (result != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
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
