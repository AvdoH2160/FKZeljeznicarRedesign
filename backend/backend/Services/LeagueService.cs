using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class LeagueService(AppDbContext context, ImageService imageService) : ILeagueService
    {
        public async Task<LeagueDto> CreateAsync(LeagueCreateDto dto)
        {
            var league = new League
            {
                Name = dto.Name,
                LogoUrl = await imageService.SaveFileAsync(dto.Logo, "leagues"),
                SmallLogoUrl = await imageService.SaveFileAsync(dto.SmallLogoUrl, "leagues")
            };
            context.Leagues.Add(league);
            await context.SaveChangesAsync();
            return new LeagueDto 
            { 
                Id = league.Id, 
                Name = league.Name, 
                LogoUrl = league.LogoUrl,
                SmallLogoUrl = league.SmallLogoUrl,
            };
        }

        public async Task<List<LeagueDto>> GetAllAsync()
        {
            return await context.Leagues
                .Select(l => new LeagueDto { Id = l.Id, Name = l.Name, LogoUrl = l.LogoUrl, SmallLogoUrl = l.SmallLogoUrl })
                .ToListAsync();
        }

        public async Task<bool> DeleteLeagueAsync(int id)
        {
            var league = await context.Leagues.FirstOrDefaultAsync(l => l.Id == id);
            if (league == null)
            {
                return false;
            }
            if (league.LogoUrl != null)
            {
                imageService.DeleteFile(league.LogoUrl);
            }
            if (league.SmallLogoUrl != null)
            {
                imageService.DeleteFile(league.SmallLogoUrl);
            }
            context.Remove(league);
            await context.SaveChangesAsync();
            return true;
        }
    }
}
