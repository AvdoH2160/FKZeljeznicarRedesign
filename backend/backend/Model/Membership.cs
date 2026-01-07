namespace backend.Model
{
    public class Membership
    {
        public Guid Id { get; set; }

        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int Year { get; set; } // npr. 2026

        public string MembershipNumber { get; set; } = string.Empty;
        public string CodeValue { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; }
    }
}
