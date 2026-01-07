namespace backend.ViewModel
{
    public class MembershipApplicationDto
    {
        public int Year { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
