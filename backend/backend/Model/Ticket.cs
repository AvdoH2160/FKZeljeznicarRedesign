namespace backend.Model
{
    public class Ticket
    {
        public int Id { get; set; }

        public string TicketNumber { get; set; } // UUID / QR
        public decimal Price { get; set; }

        public int SectorId { get; set; }
        public Sector Sector { get; set; }

        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        public DateTime PurchasedAt { get; set; } = DateTime.UtcNow;
    }
}
