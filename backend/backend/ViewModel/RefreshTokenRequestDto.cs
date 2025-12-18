using System.ComponentModel.DataAnnotations;

namespace backend.ViewModel
{
    public record RefreshTokenRequestDto(
        [Required] int UserId,
        [Required] string RefreshToken
        );
}
