namespace backend.ViewModel
{
    public class TeamUpdateDto
    {
        public string? Name { get; set; }
        public int? LeagueId { get; set; }
        public IFormFile? Logo { get; set; } 
    }
}
