namespace backend.Model
{
    public class MembershipApplication
    {
        public Guid Id { get; set; }

        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int Year { get; set; }

        public ApplicationType Type { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }

        public string? Address { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }

        public string? Email { get; set; }
        public string? Phone { get; set; }

        public string? OldMembershipNumber { get; set; }

        public ApplicationStatus Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
