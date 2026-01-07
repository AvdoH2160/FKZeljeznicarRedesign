using Microsoft.AspNetCore.Identity;
using System.Runtime;

namespace backend.Model
{
    public class ApplicationUser : IdentityUser<int>
    {
        public Profile Profile { get; set; }
        public ICollection<Membership> Memberships { get; set; } = new List<Membership>();
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}
