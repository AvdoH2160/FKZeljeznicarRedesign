using System.ComponentModel.DataAnnotations;

namespace backend.ViewModel
{
    public class NewsCreateUpdateDto
    {
        public string? Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public string? Content { get; set; } = string.Empty;
        public IFormFile? Thumbnail { get; set; }
        public List<IFormFile>? Images { get; set; }
        public bool? IsFeatured { get; set; }
        public string? Category { get; set; } = string.Empty;
    }
}
