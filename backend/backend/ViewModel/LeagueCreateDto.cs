namespace backend.ViewModel
{
    public class LeagueCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public IFormFile Logo { get; set; } = null!;
        public IFormFile SmallLogoUrl { get; set; } = null!;
    }
}
