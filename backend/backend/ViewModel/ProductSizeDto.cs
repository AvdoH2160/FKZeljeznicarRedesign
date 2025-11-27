namespace backend.ViewModel
{
    public class ProductSizeDto
    {
        public int Id { get; set; }
        public string SizeLabel { get; set; } = string.Empty;
        public int Stock { get; set; }
        public decimal? PriceOverride { get; set; }
        public int ProductId { get; set; }
    }
}
