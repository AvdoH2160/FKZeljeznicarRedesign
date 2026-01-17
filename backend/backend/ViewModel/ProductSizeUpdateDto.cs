namespace backend.ViewModel
{
    public class ProductSizeUpdateDto
    {
        public int? Id { get; set; }
        public string SizeLabel { get; set; }
        public int Stock { get; set; }
        public decimal? PriceOverride { get; set; }
    }
}
