using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public interface ITableStandingsService
    {
        Task UpdateLeagueTableAsync(int leagueId, int season);
        Task<ActionResult<List<TableStandings>>> GetTableStandingsAsync(int leagueId, int season);
        Task<bool> DeleteLeagueTableAsync(int leagueId, int season);
    }
}
