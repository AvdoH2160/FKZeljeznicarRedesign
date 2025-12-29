using backend.Model;

namespace backend.ViewModel
{
    public class GameStripDto
    {
        public int Id { get; set; }

        // Teams
        public string HomeTeamName { get; set; } = string.Empty;
        public string HomeTeamLogoUrl { get; set; } = string.Empty;

        public string AwayTeamName { get; set; } = string.Empty;
        public string AwayTeamLogoUrl { get; set; } = string.Empty;

        // Score
        public int? HomeScore { get; set; }
        public int? AwayScore { get; set; }

        // Goals (za tooltip / expand animaciju)
        public List<GameGoalDto> Goals { get; set; } = new();

        // Status & time
        public GameStatus Status { get; set; }
        public DateTime KickOffTime { get; set; }
        public float? GameLength { get; set; }

        // Context
        public bool IsHomeGame { get; set; }
        public bool TicketsAvailable { get; set; }

        // League / season
        public string LeagueName { get; set; } = string.Empty;
        public string LeagueLogoUrl { get; set; } = string.Empty;
        public string SmallLeagueLogoUrl { get; set; } = string.Empty;
        public string Season { get; set; } = string.Empty;

        // Stadium (tooltip / subtitle)
        public string Stadium { get; set; } = string.Empty;
    }
}
