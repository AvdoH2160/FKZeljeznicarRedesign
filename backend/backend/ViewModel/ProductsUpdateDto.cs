namespace backend.ViewModel
{
    public class ProductsUpdateDto
    {
        public string? Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public string? Category { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public bool? IsFeatured { get; set; }

        public List<ProductsUpdateDto>? Sizes { get; set; } = new();
    }
}
