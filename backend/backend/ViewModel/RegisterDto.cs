using System.ComponentModel.DataAnnotations;

namespace backend.ViewModel
{
    public record RegisterDto(
        [Required, EmailAddress] string Email,
        [Required, MinLength(3)] string UserName,
        [Required, MinLength(6)] string Password,
        [Required, MinLength(2)] string FirstName,
        [Required, MinLength(2)] string LastName,
        DateTime DateOfBirth,
        string City
    );
}
