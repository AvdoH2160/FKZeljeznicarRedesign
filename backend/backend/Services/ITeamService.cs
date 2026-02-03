using backend.ViewModel;

namespace backend.Services
{
    public interface ITeamService
    {
        Task<TeamDto> CreateAsync(TeamCreateDto dto);
        Task<List<TeamDto>> GetAllAsync();
        Task<TeamDto?> GetTeamByIdAsync(int id);
        Task<bool> UpdateTeamAsync(int id, TeamUpdateDto dto);
        Task<bool> DeleteTeamAsync(int id);
    }
}
