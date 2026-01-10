using backend.Model;

namespace backend.ViewModel
{
    public class ProductsListDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsFeatured { get; set; }
        public int FeaturedOrder { get; set; } = 0;
        public string Category { get; set; } = string.Empty;
        public int ViewCount { get; set; } = 0;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string? ShopThumbnailUrl1 { get; set; } = string.Empty;
        public string? ShopThumbnailUrl2 { get; set; } = string.Empty;
        public List<ProductSizeDto> Sizes { get; set; } = new(); 
    }
}
