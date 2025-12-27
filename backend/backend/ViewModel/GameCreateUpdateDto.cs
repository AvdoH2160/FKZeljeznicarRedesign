using backend.Model;

namespace backend.ViewModel
{
    public class GameCreateUpdateDto
    {
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
        public int HomeScore { get; set; }
        public int AwayScore { get; set; }
        public GameStatus Status { get; set; }
        public bool IsHomeGame { get; set; }
        public bool TicketsAvailable { get; set; }
        public DateTime KickOffTime { get; set; }
        public float GameLength { get; set; }
        public int? NewsId { get; set; }
        public string Stadium { get; set; } = string.Empty;
        public int LeagueId { get; set; }
        public string Season { get; set; } = string.Empty;
    }
}
