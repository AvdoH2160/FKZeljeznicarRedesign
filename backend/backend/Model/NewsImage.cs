namespace backend.Model
{
    public class NewsImage
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Caption { get; set; } = string.Empty;
        public int NewsId { get; set; }
        public News? News { get; set; } 
    }
}
