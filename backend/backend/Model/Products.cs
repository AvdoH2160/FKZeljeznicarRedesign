namespace backend.Model
{
    public class Products
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public List<ProductSize> Sizes { get; set; } = new();
        public bool IsFeatured { get; set; } // da li je istaknuta na stranici shopa
        public int FeaturedOrder { get; set; } = 0; //0 nije izabrana, 1-prva kartica...
        public string Category { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public List<string> GalleryImages { get; set; } = new List<string>();
        public int ViewCount { get; set; } = 0;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string? ShopThumbnailUrl1 { get; set; }
        public string? ShopThumbnailUrl2 { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    }
}
