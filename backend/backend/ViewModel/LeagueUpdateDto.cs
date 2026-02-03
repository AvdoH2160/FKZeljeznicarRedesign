namespace backend.ViewModel
{
    public class LeagueUpdateDto
    {
        public string? Name { get; set; } 
        public IFormFile? Logo { get; set; }
        public IFormFile? SmallLogoUrl { get; set; }
    }
}
