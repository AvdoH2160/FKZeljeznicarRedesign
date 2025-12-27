namespace backend.Model
{
    public class GameGoal
    {
        public int Id { get; set; }

        public int GameId { get; set; }
        public Game Game { get; set; } = null!;

        public string ScorerName { get; set; } = string.Empty;

        public string Minute { get; set; } = string.Empty;

        public bool IsPenalty { get; set; }
        public bool IsOwnGoal { get; set; }

        public bool IsHomeTeam { get; set; } 
    }
}
