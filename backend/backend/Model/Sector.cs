namespace backend.Model
{
    public class Sector
    {
        public int Id { get; set; }

        public string Code { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Capacity { get; set; }

        public int GameId { get; set; }
        public Game Game { get; set; }
        public ICollection<Ticket> Tickets { get; set; }

        public int SoldTickets { get; set; } = 0;

        public int Available => Capacity - SoldTickets;
    }
}
