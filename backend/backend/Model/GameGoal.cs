namespace backend.Model
{
    public class GameGoal
    {
        public int Id { get; set; }

        public int GameId { get; set; }
        public Games Game { get; set; } = null!;

        public string ScorerName { get; set; } = string.Empty;

        public int Minute { get; set; }      // 23, 45+2 = 47

        public bool IsPenalty { get; set; }
        public bool IsOwnGoal { get; set; }

        public bool IsHomeTeam { get; set; } 
    }
}
