namespace backend.ViewModel
{
    public class TeamCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public int LeagueId { get; set; }
        public IFormFile Logo { get; set; } = null!;
    }
}
