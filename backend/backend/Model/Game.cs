namespace backend.Model
{
    public class Game
    {
        public int Id { get; set; }
        public int HomeTeamId { get; set; }
        public Team HomeTeam { get; set; } = null!;
        public int AwayTeamId { get; set; }
        public Team AwayTeam { get; set; } = null!;
        public int? HomeScore { get; set; }
        public int? AwayScore { get; set; }
        public ICollection<GameGoal> Goals { get; set; } = new List<GameGoal>();
        public GameStatus Status {  get; set; }
        public bool IsHomeGame { get; set; }
        public bool TicketsAvailable { get; set; }
        public DateTime KickOffTime { get; set; }
        public float? GameLength { get; set; }
        public int? NewsId { get; set; }
        public News? News { get; set; }
        public string Stadium { get; set; } = string.Empty;
        public int LeagueId { get; set; }
        public League League { get; set; } = null!;
        public string Season {  get; set; } = string.Empty;

        public List<Sector>? Sectors { get; set; }
    }
}
