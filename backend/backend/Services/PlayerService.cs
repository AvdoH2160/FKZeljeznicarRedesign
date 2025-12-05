using backend.Data;
using backend.Migrations;
using backend.Model;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class PlayerService(AppDbContext context, ImageService imageService) : IPlayerService
    {
        public async Task<PlayerListDto> CreatePlayerAsync(PlayerCreateDto create)
        {
            if(create.ThumbnailUrl == null)
                throw new ArgumentNullException("ThumbnailMorabit poslan");
            var thumbnailUrl = await imageService.SaveFileAsync(create.ThumbnailUrl, "players");

            var player = new Player
            {
                Name = create.Name,
                Surname = create.Surname,
                Description = create.Description,
                BirthDate = create.BirthDate,
                PlaceOfBirth = create.PlaceOfBirth,
                Nationality = create.Nationality,
                Number = create.Number,
                Position = create.Position,
                ThumbnailUrl = thumbnailUrl,
                IsFeatured = create.IsFeatured,
                PreviousClubs = create.PreviousClubs
            };

            context.Player.Add(player);
            await context.SaveChangesAsync();
            return new PlayerListDto
            {
                Id = player.Id,
                Name = player.Name,
                Surname = player.Surname,
                Number = player.Number,
                Position = player.Position,
                ThumbnailUrl = player.ThumbnailUrl,
                IsFeatured = player.IsFeatured,
            };
        }

        public async Task<bool> DeletePlayerAsync(int id)
        {
            var player = await context.Player.FirstOrDefaultAsync(p => p.Id == id);
            if(player == null)
                return false;
            if(player.ThumbnailUrl != null)
            {
                imageService.DeleteFile(player.ThumbnailUrl);
            }
            context.Remove(player);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<List<PlayerListDto>> GetAllPlayersAsync()
        {
            return await context.Player.Select(p => new PlayerListDto
            {
                Id = p.Id,
                Name = p.Name,
                Surname = p.Surname,
                Number = p.Number,
                Position = p.Position,
                ThumbnailUrl = p.ThumbnailUrl,
                IsFeatured = p.IsFeatured,
            }).ToListAsync();
        }

        public async Task<List<PlayerListDto>> GetFeaturedPlayersAsync()
        {
            return await context.Player.Where(p => p.IsFeatured)
                .Select(p => new PlayerListDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Surname = p.Surname,
                    Number = p.Number,
                    Position = p.Position,
                    ThumbnailUrl = p.ThumbnailUrl,
                    IsFeatured = p.IsFeatured,
                }).ToListAsync();
        }

        public async Task<PlayerDetailsDto?> GetPlayerByIdAsync(int id)
        {
            var player = await context.Player.Where(p => id == p.Id).FirstOrDefaultAsync();
            if (player == null)
                return null;
            return new PlayerDetailsDto
            {
                Id = player.Id,
                Name = player.Name,
                Surname = player.Surname,
                Description = player.Description,
                BirthDate = (DateOnly)player.BirthDate,
                PlaceOfBirth = player.PlaceOfBirth,
                Nationality = player.Nationality,
                Number = player.Number,
                Position = player.Position,
                ThumbnailUrl = player.ThumbnailUrl,
                IsFeatured = player.IsFeatured,
                PreviousClubs = player.PreviousClubs
            };
        }

        public async Task<List<PlayerListDto>> GetPlayerByPositionAsync(string position)
        {
            return await context.Player.Where(p => position == p.Position)
                .Select(p => new PlayerListDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Surname = p.Surname,
                    Number = p.Number,
                    Position = p.Position,
                    ThumbnailUrl = p.ThumbnailUrl,
                    IsFeatured = p.IsFeatured,
                }).ToListAsync();
        }

        public async Task<bool> UpdatePlayerAsync(int id, PlayerUpdateDto update)
        {
            var player = await context.Player.FirstOrDefaultAsync(p => id == p.Id);
            if(player == null)
                return false;

            if(update.ThumbnailUrl != null)
            {
                imageService.DeleteFile(player.ThumbnailUrl);
                var thumbnailUrl = await imageService.SaveFileAsync(update.ThumbnailUrl, "players"); ;
                player.ThumbnailUrl = thumbnailUrl;
            }

            if(update.Name != null) 
                player.Name = update.Name;
            if(update.Surname != null)
                player.Surname = update.Surname;
            if(update.Description != null)
                player.Description = update.Description;
            if(update.BirthDate != null)
                player.BirthDate = (DateOnly)update.BirthDate;
            if(update.PlaceOfBirth != null)
                player.PlaceOfBirth = update.PlaceOfBirth;
            if(update.Nationality != null)
                player.Nationality = update.Nationality;
            if (update.Number != null)
                player.Number = (int)update.Number;
            if (update.Position != null)
                player.Position = update.Position;
            if(update.IsFeatured.HasValue)
                player.IsFeatured = (bool)update.IsFeatured.Value;
            if(update.PreviousClubs != null)
                player.PreviousClubs = update.PreviousClubs;

            return true;
        }
    }
}
