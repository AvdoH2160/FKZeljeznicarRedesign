namespace backend.ViewModel
{
    public class PlayerUpdateDto
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Description { get; set; }
        public DateOnly? BirthDate { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? Nationality { get; set; }
        public int? Number { get; set; }
        public string? Position { get; set; }
        public IFormFile? ThumbnailUrl { get; set; }
        public bool? IsFeatured { get; set; }
        public List<string>? PreviousClubs { get; set; }
    }
}
