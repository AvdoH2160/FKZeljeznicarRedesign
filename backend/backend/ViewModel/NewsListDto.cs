namespace backend.ViewModel
{
    public class NewsListDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public string ThumbnailUrl { get; set; } = string.Empty;
        public bool IsFeatured { get; set; } = false;
        public string Category { get; set; } = string.Empty;
        public DateTime PublishedDate { get; set; }
    }
}
