using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace backend.ViewModel
{
    public class PlayerDetailsDto
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

        public string Slug { get {
                return $"{Name}-{Surname}"
                .ToLower()
                .Replace(" ", "-")
                .Replace("č", "c").Replace("ć", "c")
                .Replace("š", "s").Replace("ž", "z").Replace("đ", "dj");
            } set; } 

        public static string ToSlug(string name, string surname)
        {
            return $"{name}-{surname}"
                .ToLower()
                .Replace(" ", "-")
                .Replace("č", "c").Replace("ć", "c")
                .Replace("š", "s").Replace("š", "s").Replace("ž", "z").Replace("đ", "dj");
        }
    }
}
