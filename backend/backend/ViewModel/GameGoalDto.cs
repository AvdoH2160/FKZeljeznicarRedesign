namespace backend.ViewModel
{
    public class GameGoalDto
    {
        public int Id { get; set; }
        public string Minute { get; set; } = string.Empty;
        public string ScorerName { get; set; } = string.Empty;
        public bool IsHomeTeam { get; set; }
        public bool IsOwnGoal { get; set; }
        public bool IsPenalty { get; set; }
    }
}
