using backend.ViewModel;

namespace backend.Services
{
    public interface ILeagueService
    {
        Task<LeagueDto> CreateAsync(LeagueCreateDto dto);
        Task<List<LeagueDto>> GetAllAsync();
        Task<bool> DeleteLeagueAsync(int id);
    }
}
