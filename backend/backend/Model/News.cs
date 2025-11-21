namespace backend.Model
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public bool IsFeatured { get; set; } = false;
        public int ViewCount { get; set; } = 0;
        public string Category { get; set; } = string.Empty;
        public DateTime PublishedDate { get; set; }
        public ICollection<NewsImage> Images { get; set; } = new List<NewsImage>();
    }
}
