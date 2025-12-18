namespace backend.Model
{
    public class Membership
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string MembershipNumber { get; set; } = string.Empty;
        public DateTime MembershipStartDate { get; set; }
        public DateTime MembershipEndDate { get; set; }
        public string MembershipType { get; set; } = string.Empty;
    }
}
