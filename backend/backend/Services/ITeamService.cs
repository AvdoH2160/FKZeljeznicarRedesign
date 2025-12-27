using backend.ViewModel;

namespace backend.Services
{
    public interface ITeamService
    {
        Task<TeamDto> CreateAsync(TeamCreateDto dto);
        Task<List<TeamDto>> GetAllAsync();
        Task<bool> DeleteTeamAsync(int id);
    }
}
