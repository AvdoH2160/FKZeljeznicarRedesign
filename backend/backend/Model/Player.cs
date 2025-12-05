namespace backend.Model
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly? BirthDate { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? Nationality { get; set; }
        public int Number { get; set; }
        public string Position { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public bool IsFeatured { get; set; } 
        public List<string>? PreviousClubs { get; set; }

    }
}
