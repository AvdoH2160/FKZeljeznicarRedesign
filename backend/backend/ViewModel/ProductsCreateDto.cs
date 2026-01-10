using backend.Model;

namespace backend.ViewModel
{
    public class ProductsCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsFeatured { get; set; } // da li je istaknuta na stranici shopa
        public int FeaturedOrder { get; set; } = 0; //0 nije izabrana, 1-prva kartica...
        public string Category { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public List<ProductSizeCreateDto> Sizes { get; set; } = new();
        public string Color { get; set; } = string.Empty;
        public List<IFormFile>? GalleryImages { get; set; }
        public int ViewCount { get; set; } = 0;
        public IFormFile? ThumbnailUrl { get; set; }
        public IFormFile? ShopThumbnailUrl1 { get; set; } 
        public IFormFile? ShopThumbnailUrl2 { get; set; } 
    }
}
