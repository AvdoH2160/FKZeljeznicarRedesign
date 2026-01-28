namespace backend.ViewModel
{
    public class NewsDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public string Content { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }
        public int ViewCount { get; set; }
        public string Category { get; set; } = string.Empty;
        public DateTime PublishedDate { get; set; }
        public List<string> ImageUrls { get; set; } = new();

        //public int? GameId { get; set; }
    }
}
