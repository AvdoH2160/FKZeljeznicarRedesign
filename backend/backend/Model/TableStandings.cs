namespace backend.Model
{
    public class TableStandings
    {
        public int Id { get; set; }
        public int LeagueId { get; set; }
        public int Season { get; set; }
        public int Rank { get; set; }
        public int TeamId { get; set; }
        public string TeamName { get; set; } = string.Empty;
        public string TeamLogoUrl { get; set; } = string.Empty;
        public int Played { get; set; }
        public int Wins { get; set; }
        public int Draws { get; set; }
        public int Losses { get; set; }
        public int GoalsFor { get; set; }
        public int GoalsAgainst { get; set; }
        public int GoalDifference { get; set; }
        public int Points { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
