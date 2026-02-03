using backend.ViewModel;

namespace backend.Services
{
    public interface ILeagueService
    {
        Task<LeagueDto> CreateAsync(LeagueCreateDto dto);
        Task<List<LeagueDto>> GetAllAsync();
        Task<LeagueDto?> GetLeagueByIdAsync(int id);
        Task<bool> UpdateLeagueAsync(int id, LeagueUpdateDto dto);
        Task<bool> DeleteLeagueAsync(int id);
    }
}
