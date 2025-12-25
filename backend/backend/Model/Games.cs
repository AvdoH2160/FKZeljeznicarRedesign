namespace backend.Model
{
    public class Games
    {
        public int Id { get; set; }
        public string Home {  get; set; } = string.Empty;
        public string Away {  get; set; } = string.Empty;
        public string HomeLogoUrl {  get; set; } = string.Empty;
        public string AwayLogoUrl { get; set; } =string.Empty;
        public int HomeScore { get; set; }
        public int AwayScore { get; set; }
        public ICollection<GameGoal> Goals { get; set; } = new List<GameGoal>();
        public GameStatus Status {  get; set; }
        public bool IsHomeGame { get; set; }
        public bool TicketsAvailable { get; set; }
        public DateTime KickOffTime { get; set; }
        public float GameLength { get; set; }
        public int? NewsId { get; set; }
        public string Stadium { get; set; } = string.Empty;
        public string LeagueName {  get; set; } = string.Empty;
        public string Season {  get; set; } = string.Empty;

    }
}
