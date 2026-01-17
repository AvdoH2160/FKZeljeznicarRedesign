namespace backend.ViewModel
{
    public class ProductSizeCreateDto
    {
        public string SizeLabel { get; set; } = null!;
        public int Stock { get; set; }
        public decimal? PriceOverride { get; set; }
    }
}
