namespace backend.Model
{
    public class Profile
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string City { get; set; } = string.Empty;
    }
}
