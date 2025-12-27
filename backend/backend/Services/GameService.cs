using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class GameService(AppDbContext context) : IGamesService
    {
        public async Task<List<GameStripDto>> GetAllGamesAsync()
        {
            return await context.Games
            .AsNoTracking()
            .Include(g => g.HomeTeam)
            .Include(g => g.AwayTeam)
            .Include(g => g.League)
            .Include(g => g.Goals)
            .OrderBy(g => g.KickOffTime)
            .Select(g => new GameStripDto
            {
                Id = g.Id,

                HomeTeamName = g.HomeTeam.Name,
                HomeTeamLogoUrl = g.HomeTeam.LogoUrl,

                AwayTeamName = g.AwayTeam.Name,
                AwayTeamLogoUrl = g.AwayTeam.LogoUrl,

                HomeScore = g.HomeScore,
                AwayScore = g.AwayScore,

                Status = g.Status,
                KickOffTime = g.KickOffTime,
                GameLength = g.GameLength,

                IsHomeGame = g.IsHomeGame,
                TicketsAvailable = g.TicketsAvailable,

                LeagueName = g.League.Name,
                LeagueLogoUrl = g.League.LogoUrl,
                Season = g.Season,

                Stadium = g.Stadium,

                Goals = g.Goals.Select(goal => new GameGoalDto
                {
                    Minute = goal.Minute,
                    ScorerName = goal.ScorerName,
                    IsHomeTeam = goal.IsHomeTeam,
                    IsOwnGoal = goal.IsOwnGoal,
                    IsPenalty = goal.IsPenalty
                }).ToList()
            })
            .ToListAsync();
        }

        public async Task<int> CreateAsync(GameCreateUpdateDto dto)
        {
            var game = new Game
            {
                HomeTeamId = dto.HomeTeamId,
                AwayTeamId = dto.AwayTeamId,
                HomeScore = dto.HomeScore,
                AwayScore = dto.AwayScore,
                Status = dto.Status,
                IsHomeGame = dto.IsHomeGame,
                TicketsAvailable = dto.TicketsAvailable,
                KickOffTime = dto.KickOffTime,
                GameLength = dto.GameLength,
                NewsId = dto.NewsId,
                Stadium = dto.Stadium,
                LeagueId = dto.LeagueId,
                Season = dto.Season,
            };

            context.Games.Add(game);
            await context.SaveChangesAsync();

            return game.Id;
        }

        public async Task<bool> UpdateAsync(int id, GameCreateUpdateDto dto)
        {
            var game = await context.Games.FindAsync(id);
            if (game == null) return false;

            game.HomeTeamId = dto.HomeTeamId;
            game.AwayTeamId = dto.AwayTeamId;
            game.HomeScore = dto.HomeScore;
            game.AwayScore = dto.AwayScore;
            game.Status = dto.Status;
            game.IsHomeGame = dto.IsHomeGame;
            game.TicketsAvailable = dto.TicketsAvailable;
            game.KickOffTime = dto.KickOffTime;
            game.GameLength = dto.GameLength;
            game.NewsId = dto.NewsId;
            game.Stadium = dto.Stadium;
            game.LeagueId = dto.LeagueId;
            game.Season = dto.Season;

            await context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var game = await context.Games.FindAsync(id);
            if (game == null) return false;

            context.Games.Remove(game);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<GameGoal> AddGoalAsync(GameGoalCreateDto dto)
        {
            var game = await context.Games
                .Include(g => g.Goals)
                .FirstOrDefaultAsync(g => g.Id == dto.GameId);

            if (game == null)
                throw new Exception("Game not found");

            var goal = new GameGoal
            {
                GameId = dto.GameId,
                Game = game,
                ScorerName = dto.ScorerName,
                Minute = dto.Minute,
                IsHomeTeam = dto.IsHomeTeam,
                IsPenalty = dto.IsPenalty,
                IsOwnGoal = dto.IsOwnGoal
            };

            game.Goals.Add(goal);
            await context.SaveChangesAsync();

            return goal;
        }

        public async Task<bool> RemoveGoalAsync(int goalId)
        {
            var game = await context.Games.Include(g => g.Goals)
                .FirstOrDefaultAsync(g => g.Goals.Any(goal => goal.Id == goalId));

            if (game == null) return false;

            var goal = game.Goals.FirstOrDefault(g => g.Id == goalId);
            if (goal == null) return false;
            game.Goals.Remove(goal);

            await context.SaveChangesAsync();
            return true;
        }
    }
}
