namespace backend.ViewModel
{
    public class SectorTemplateDto
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public decimal Price { get; set; }
    }
}
