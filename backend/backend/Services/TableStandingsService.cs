
using backend.Data;
using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TableStandingsService(AppDbContext context, IApiFootballService apiFootballService) : ITableStandingsService
    {
        public async Task<bool> DeleteLeagueTableAsync(int leagueId, int season)
        {
            var rows = await context.TableStandings
                .Where(ts => ts.LeagueId == leagueId && ts.Season == season)
                .ToListAsync();
            if(!rows.Any())
            {
                return false;
            }
            context.TableStandings.RemoveRange(rows);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<ActionResult<List<TableStandings>>> GetTableStandingsAsync(int leagueId, int season)
        {
            var standings = await context.TableStandings
                .Where(ts => ts.LeagueId == leagueId && ts.Season == season)
                .OrderBy(ts => ts.Rank)
                .ToListAsync();

            if(!standings.Any())
            {
                return new NotFoundResult();
            }

            return standings;
        }

        public async Task UpdateLeagueTableAsync(int leagueId, int season)
        {
            var standings = await apiFootballService.GetLeagueStandings(leagueId, season);
            
            foreach(var team in standings)
            {
                var existing = await context.TableStandings
                    .FirstOrDefaultAsync(ts => ts.LeagueId == leagueId && ts.Season == season && ts.TeamId == team.TeamId);

                if (existing != null)
                {
                    existing.Rank = team.Rank;
                    existing.TeamName = team.TeamName;
                    existing.TeamLogoUrl = team.TeamLogoUrl;
                    existing.Played = team.Played;
                    existing.Wins = team.Wins;
                    existing.Draws = team.Draws;
                    existing.Losses = team.Losses;
                    existing.GoalsFor = team.GoalsFor;
                    existing.GoalsAgainst = team.GoalsAgainst;
                    existing.GoalDifference = team.GoalDifference;
                    existing.Points = team.Points;
                    existing.LastUpdated = DateTime.UtcNow;

                }
                else
                {
                    var newStanding = new Model.TableStandings
                    {
                        LeagueId = leagueId,
                        Season = season,
                        Rank = team.Rank,
                        TeamId = team.TeamId,
                        TeamName = team.TeamName,
                        TeamLogoUrl = team.TeamLogoUrl,
                        Played = team.Played,
                        Wins = team.Wins,
                        Draws = team.Draws,
                        Losses = team.Losses,
                        GoalsFor = team.GoalsFor,
                        GoalsAgainst = team.GoalsAgainst,
                        GoalDifference = team.GoalDifference,
                        Points = team.Points,
                        LastUpdated = DateTime.UtcNow
                    };
                    await context.TableStandings.AddAsync(newStanding);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
