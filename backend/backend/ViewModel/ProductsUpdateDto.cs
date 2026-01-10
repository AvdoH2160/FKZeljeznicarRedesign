namespace backend.ViewModel
{
    public class ProductsUpdateDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? Category { get; set; }
        public IFormFile? ThumbnailUrl { get; set; }
        public IFormFile? ShopThumbnailUrl1 { get; set; }
        public IFormFile? ShopThumbnailUrl2 { get; set; }
        public bool? IsFeatured { get; set; }
        public int? FeaturedOrder { get; set; }
        public string? Brand { get; set; }
        public string? Color { get; set; }

        public List<IFormFile>? GalleryImages { get; set; }

        public List<ProductSizeUpdateDto>? Sizes { get; set; }
    }
}
