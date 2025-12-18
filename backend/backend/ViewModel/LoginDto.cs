using System.ComponentModel.DataAnnotations;

namespace backend.ViewModel
{
    public record LoginDto(
        [Required] string UserName,
        [Required] string Password
    );
}
