using backend.ViewModel;

namespace backend.Services
{
    public interface ITicketService
    {
        Task<IEnumerable<SectorAvailabilityDto>> GetSectorsForGame(int gameId);
        Task BuyTicketsAsync(int userId, TicketBuyDto dto);
        Task<IEnumerable<TicketDto>> GetUserTicketsAsync(int userId);

        Task<List<SectorTemplateDto>> GetSectorTemplatesAsync();
        Task<SectorTemplateDto> CreateSectorTemplateAsync(SectorTemplateDto dto);
        Task<SectorTemplateDto> UpdateSectorTemplateAsync(int id, SectorTemplateDto dto);
        Task DeleteSectorTemplateAsync(int id);
        Task CreateSectorsForGameAsync(int gameId);
    }
}
