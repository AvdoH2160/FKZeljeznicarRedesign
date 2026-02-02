using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TicketService(AppDbContext context) : ITicketService
    {
        public async Task BuyTicketsAsync(int userId, TicketBuyDto dto)
        {
            using var transaction = await context.Database.BeginTransactionAsync();

            var game = await context.Games
                .FirstOrDefaultAsync(g => g.Id == dto.GameId);

            if (game == null)
                throw new Exception("Game not found");

            if (DateTime.UtcNow >= game.KickOffTime)
                throw new Exception("Ticket sales are closed – the game has started");

            var sector = await context.Sectors
                .FirstOrDefaultAsync(s =>
                    s.GameId == dto.GameId &&
                    s.Code == dto.SectorCode);

            if (sector == null)
                throw new Exception("Sector not found");

            if (sector.Available < dto.Quantity)
                throw new Exception("Not enough tickets available");

            sector.SoldTickets += dto.Quantity;

            var tickets = Enumerable.Range(0, dto.Quantity)
                .Select(_ => new Ticket
                {
                    SectorId = sector.Id,
                    UserId = userId,
                    Price = sector.Price,
                    PurchasedAt = DateTime.UtcNow,
                    TicketNumber = Guid.NewGuid().ToString()
                })
                .ToList();

            context.Tickets.AddRange(tickets);
            await context.SaveChangesAsync();
            await transaction.CommitAsync();
        }

        public async Task<IEnumerable<SectorAvailabilityDto>> GetSectorsForGame(int gameId)
        {
            var game = await context.Games
                .Include(g => g.Sectors)
                .ThenInclude(s => s.Tickets)
                .FirstOrDefaultAsync(g => g.Id == gameId);

            if (game == null || !game.IsHomeGame || game.KickOffTime < DateTime.UtcNow)
                return new List<SectorAvailabilityDto>();

            return game.Sectors.Select(s => new SectorAvailabilityDto
            {
                Code = s.Code,
                Price = s.Price,
                Available = s.Capacity - s.SoldTickets,
                Capacity = s.Capacity
            }).ToList();
        }

        public async Task<IEnumerable<TicketDto>> GetUserTicketsAsync(int userId)
        {
            return await context.Tickets
                .Where(t => t.UserId == userId)
                .Select(t => new TicketDto
                {
                    TicketNumber = t.TicketNumber,
                    Sector = t.Sector.Code,
                    Game = t.Sector.Game.HomeTeam.Name + " - " + t.Sector.Game.AwayTeam.Name,
                    MatchDate = t.Sector.Game.KickOffTime
                }).ToListAsync();
        }

        public async Task<List<SectorTemplateDto>> GetSectorTemplatesAsync()
        {
            return await context.SectorTemplates
                .Select(s => new SectorTemplateDto
                {
                    Id = s.Id,
                    Code = s.Code,
                    Capacity = s.Capacity,
                    Price = s.Price
                }).ToListAsync();
        }

        public async Task<SectorTemplateDto> CreateSectorTemplateAsync(SectorTemplateDto dto)
        {
            var entity = new SectorTemplate
            {
                Code = dto.Code,
                Capacity = dto.Capacity,
                Price = dto.Price
            };

            context.SectorTemplates.Add(entity);
            await context.SaveChangesAsync();

            dto.Id = entity.Id;
            return dto;
        }

        public async Task<SectorTemplateDto> UpdateSectorTemplateAsync(int id, SectorTemplateDto dto)
        {
            var entity = await context.SectorTemplates.FindAsync(id);
            if (entity == null) throw new Exception("Sector template not found");

            entity.Code = dto.Code;
            entity.Capacity = dto.Capacity;
            entity.Price = dto.Price;

            await context.SaveChangesAsync();
            return dto;
        }

        public async Task DeleteSectorTemplateAsync(int id)
        {
            var entity = await context.SectorTemplates.FindAsync(id);
            if (entity == null) throw new Exception("Sector template not found");

            context.SectorTemplates.Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task CreateSectorsForGameAsync(int gameId)
        {
            var game = await context.Games.FindAsync(gameId);
            if (game == null) throw new Exception("Game not found");
            if (!game.IsHomeGame) return;

            var templates = await context.SectorTemplates.ToListAsync();

            foreach (var t in templates)
            {
                context.Sectors.Add(new Sector
                {
                    GameId = game.Id,
                    Code = t.Code,
                    Capacity = t.Capacity,
                    Price = t.Price
                });
            }

            await context.SaveChangesAsync();
        }
    }
}
