using backend.Model;
using backend.ViewModel;

namespace backend.Services
{
    public interface IGamesService
    {
        Task<List<GameStripDto>> GetAllGamesAsync();
        //Task<GameDto> GetGameByIdAsync(int id);
        Task<int> CreateAsync(GameCreateUpdateDto dto);
        Task<bool> UpdateAsync(int id, GameCreateUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<GameGoal> AddGoalAsync(GameGoalCreateDto dto);
        Task<bool> RemoveGoalAsync(int goalId);
    }
}
