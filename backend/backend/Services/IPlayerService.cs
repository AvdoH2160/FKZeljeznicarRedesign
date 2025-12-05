using backend.ViewModel;

namespace backend.Services
{
    public interface IPlayerService
    {
        Task<List<PlayerListDto>> GetAllPlayersAsync();
        Task<List<PlayerListDto>> GetFeaturedPlayersAsync();
        Task<List<PlayerListDto>> GetPlayerByPositionAsync(string position);
        Task<PlayerDetailsDto?> GetPlayerByIdAsync(int id);
        Task<PlayerListDto> CreatePlayerAsync(PlayerCreateDto create);
        Task<bool> UpdatePlayerAsync(int id, PlayerUpdateDto update);
        Task<bool> DeletePlayerAsync(int id);
    }
}
