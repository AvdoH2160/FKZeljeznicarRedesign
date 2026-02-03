using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TeamService(AppDbContext context, ImageService imageService) : ITeamService
    {
        public async Task<TeamDto> CreateAsync(TeamCreateDto dto)
        {
            var team = new Team { 
                Name = dto.Name, 
                LogoUrl = await imageService.SaveFileAsync(dto.Logo, "team"), 
                LeagueId = dto.LeagueId 
            };
            context.Teams.Add(team);
            await context.SaveChangesAsync();
            return new TeamDto { Id = team.Id, Name = team.Name, LogoUrl = team.LogoUrl, LeagueId = team.LeagueId };
        }

        public async Task<bool> DeleteTeamAsync(int id)
        {
            var team  = await context.Teams.FirstOrDefaultAsync(t => t.Id == id);
            if (team == null)
            {
                return false;
            }
            if (team.LogoUrl != null)
            {
                imageService.DeleteFile(team.LogoUrl);
            }
            context.Remove(team);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<List<TeamDto>> GetAllAsync()
        {
            return await context.Teams
            .Select(t => new TeamDto { Id = t.Id, Name = t.Name, LogoUrl = t.LogoUrl, LeagueId = t.LeagueId })
            .ToListAsync();
        }

        public async Task<TeamDto?> GetTeamByIdAsync(int id)
        {
            var team = await context.Teams.FirstOrDefaultAsync(t => id == t.Id);
            if (team == null)
                return null;
            return new TeamDto
            {
                Id = team.Id,
                Name = team.Name,
                LogoUrl = team.LogoUrl,
                LeagueId = team.LeagueId
            };
        }

        public async Task<bool> UpdateTeamAsync(int id, TeamUpdateDto dto)
        {
            var team = await context.Teams.FirstOrDefaultAsync(t => id == t.Id);

            if (team == null)
                return false;

            if (dto.Logo != null)
            {
                imageService.DeleteFile(team.LogoUrl);
                var thumbnailUrl = await imageService.SaveFileAsync(dto.Logo, "team");
                team.LogoUrl = thumbnailUrl;
            }

            if (dto.Name != null)
                team.Name = dto.Name;

            if (dto.LeagueId.HasValue)
                team.LeagueId = dto.LeagueId.Value;

            await context.SaveChangesAsync();
            return true;
        }
    }
}
