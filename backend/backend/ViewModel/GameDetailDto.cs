using backend.Model;

namespace backend.ViewModel
{
    public class GameDetailDto
    {
        public int Id { get; set; }

        // Timovi
        public string HomeTeamName { get; set; } = string.Empty;
        public string HomeTeamLogoUrl { get; set; } = string.Empty;

        public string AwayTeamName { get; set; } = string.Empty;
        public string AwayTeamLogoUrl { get; set; } = string.Empty;

        // Rezultat
        public int? HomeScore { get; set; }
        public int? AwayScore { get; set; }

        // Golovi (za tooltip / detaljan prikaz)
        public List<GameGoalDto> Goals { get; set; } = new();

        // Status & vrijeme
        public GameStatus Status { get; set; }
        public DateTime KickOffTime { get; set; }
        public float? GameLength { get; set; }

        // Kontekst utakmice
        public bool IsHomeGame { get; set; }
        public bool TicketsAvailable { get; set; }

        // Liga / sezona
        public string LeagueName { get; set; } = string.Empty;
        public string LeagueLogoUrl { get; set; } = string.Empty;
        public string SmallLeagueLogoUrl { get; set; } = string.Empty;
        public string Season { get; set; } = string.Empty;

        // Stadion
        public string Stadium { get; set; } = string.Empty;

        // Vezano za vijest
        public int? NewsId { get; set; }
        public string? NewsSlug { get; set; }
    }
}
