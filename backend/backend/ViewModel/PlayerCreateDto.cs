namespace backend.ViewModel
{
    public class PlayerCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly? BirthDate { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? Nationality { get; set; }
        public int Number { get; set; }
        public string Position { get; set; } = string.Empty;
        public IFormFile? ThumbnailUrl { get; set; }
        public bool IsFeatured { get; set; }
        public List<string>? PreviousClubs { get; set; }
    }
}
