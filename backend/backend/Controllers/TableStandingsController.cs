using backend.Model;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableStandingsController(ITableStandingsService service) : ControllerBase
    {
        [HttpGet("{leagueId}/{season}")]
        public async Task<ActionResult<List<TableStandings>>> GetTableStandings(int leagueId, int season)
        {
            return await service.GetTableStandingsAsync(leagueId, season);
        }

        [HttpPost("update/{leagueId}/{season}")]
        public async Task<ActionResult> UpdateLeagueTable(int leagueId, int season)
        {
            await service.UpdateLeagueTableAsync(leagueId, season);
            return Ok(new {message = "League table updated successfully." });
        }

        [HttpPost("refresh")]
        public async Task<ActionResult> RefreshTable(int leagueId, int season)
        {
            await service.UpdateLeagueTableAsync(leagueId, season);
            return Ok(new { message = "League table refreshed successfully." });
        }

        [HttpDelete("delete/{leagueId}/{season}")]
        public async Task<ActionResult> DeleteLeagueTable(int leagueId, int season)
        {
            await service.DeleteLeagueTableAsync(leagueId, season);
            return Ok(new { message = "League table deleted successfully." });
        }
    }
}
