using backend.Model;

namespace backend.Services
{
    public interface IApiFootballService
    {
        Task<List<TableStandings>> GetLeagueStandings(int leagueId, int season);
    }
}
