using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backend.Services
{
    public class AuthService(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole<int>> roleManager,
        AppDbContext context,
        ILogger<AuthService> logger,
        IConfiguration configuration) : IAuthService
    {
        public async Task<(
            ApplicationUser user, 
            string jwtToken, 
            string refreshToken, 
            List<string> roles)?> 
            LoginAsync(LoginDto request)
        {
            var user = await userManager.FindByNameAsync(request.UserName);

            if(user == null || !await userManager.CheckPasswordAsync(user, request.Password))
            {
                logger.LogWarning("Invalid login attempt for {Username}", request.UserName);
                return null;
            }

            var jwt = await CreateToken(user);
            var refresh = await GenerateRefreshTokenAsync(user);

            var roles = await userManager.GetRolesAsync(user);

            return (user, jwt, refresh, roles.ToList());
        }

        public async Task<(
            ApplicationUser user, 
            string jwtToken, 
            string refreshToken)?> 
            RegisterAsync(RegisterDto request)
        {
            var existingUser = await userManager.FindByNameAsync(request.UserName);
            if(existingUser != null)
            {
                return null;
            }

            var user = new ApplicationUser
            {
                UserName = request.UserName,
                Email = request.Email,
            };

            var result = await userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                logger.LogWarning("User registration failed for {Username}", request.UserName);
                foreach (var error in result.Errors)
                {
                    Console.WriteLine($"Registration failed: {error.Code} - {error.Description}");
                }
                return null;
            }

            if(!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole<int>("User"));
            }

            await userManager.AddToRoleAsync(user, "User");

            var profile = new Profile
            {
                UserId = user.Id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth,
                City = request.City
            };

            context.Profiles.Add(profile);
            await context.SaveChangesAsync();

            var jwt = await CreateToken(user);
            var refresh = await GenerateRefreshTokenAsync(user);

            return (user, jwt, refresh);
        }

        public async Task<(
            string jwtToken, 
            string refreshToken)?> 
            RefreshTokenAsync(RefreshTokenRequestDto request)
        {
            var user = await context.Users.FindAsync(request.UserId);
            if (user == null || user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
                return null;

            var jwt = await CreateToken(user);
            var refresh = await GenerateRefreshTokenAsync(user);
            return (jwt, refresh);
        }

        // private async Task<string> CreateToken(ApplicationUser user)
        // {
        //     var claims = new List<Claim>
        //     {
        //         new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //         new Claim(ClaimTypes.Name, user.UserName!)
        //     };

        //     var roles = await userManager.GetRolesAsync(user);
        //     foreach (var role in roles)
        //     {
        //         claims.Add(new Claim(ClaimTypes.Role, role));
        //     }

        //     var key = new SymmetricSecurityKey(
        //         Encoding.UTF8.GetBytes(configuration["AppSettings:Token"]!)
        //         );

        //     var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        //     var jwt = new JwtSecurityToken(
        //         issuer: configuration["AppSettings:Issuer"],
        //         audience: configuration["AppSettings:Audience"],
        //         claims: claims,
        //         expires: DateTime.UtcNow.AddMinutes(30),
        //         signingCredentials: creds
        //         );

        //     return new JwtSecurityTokenHandler().WriteToken(jwt);
        // }
        private async Task<string> CreateToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName!)
            };

            var roles = await userManager.GetRolesAsync(user);
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            var jwtToken = Environment.GetEnvironmentVariable("JWT_TOKEN") 
                        ?? throw new Exception("JWT_TOKEN env var is missing");
            var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") 
                            ?? throw new Exception("JWT_ISSUER env var is missing");
            var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") 
                            ?? throw new Exception("JWT_AUDIENCE env var is missing");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtToken));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var jwt = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(ApplicationUser user)
        {
            return await userManager.GenerateEmailConfirmationTokenAsync(user);
        }

        public async Task<bool> ConfirmEmailAsync(int userId, string token)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;

            var result = await userManager.ConfirmEmailAsync(user, token);
            return result.Succeeded;
        }

        private async Task<string?> GenerateRefreshTokenAsync(ApplicationUser user)
        {
            var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await context.SaveChangesAsync();
            return refreshToken;
        }
    }
}
