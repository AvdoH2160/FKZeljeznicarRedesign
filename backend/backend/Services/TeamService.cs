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
    }
}
