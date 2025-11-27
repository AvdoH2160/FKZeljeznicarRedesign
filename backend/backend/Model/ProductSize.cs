namespace backend.Model
{
    public class ProductSize
    {
        public int Id { get; set; }
        public string SizeLabel { get; set; } = string.Empty;
        public int Stock { get; set; }
        public decimal? PriceOverride { get; set; } = null;

        public int ProductId { get; set; }
        public Products Products { get; set; } 
    }
}
