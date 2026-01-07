namespace backend.ViewModel
{
    public class MembershipDto
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;

        public int Year { get; set; }
        public string MembershipNumber { get; set; } = string.Empty;
        public string CodeValue { get; set; } = string.Empty;

        public bool IsActive { get; set; }
    }
}
