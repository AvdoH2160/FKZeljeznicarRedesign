using backend.Model;
using backend.ViewModel;

namespace backend.Services
{
    public interface IGamesService
    {
        Task<List<GameStripDto>> GetAllGamesAsync();
        Task<GameDetailDto?> GetGameByIdAsync(int id);
        Task<GameEditDto?> GetGameForEditAsync(int id);
        Task<int> CreateAsync(GameCreateUpdateDto dto);
        Task<bool> UpdateAsync(int id, GameCreateUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<GameGoalDto> AddGoalAsync(GameGoalCreateDto dto);
        Task<bool> RemoveGoalAsync(int goalId);
    }
}
