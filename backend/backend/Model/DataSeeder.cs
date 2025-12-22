using Microsoft.AspNetCore.Identity;

namespace backend.Model
{
    public static class DataSeeder
    {
        public static async Task SeedRolesAndAdminAsync(
            UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole<int>> roleManager,
            IConfiguration configuration)
        {
            if(!await roleManager.RoleExistsAsync("Admin"))
                await roleManager.CreateAsync(new IdentityRole<int>("Admin"));

            if(!await roleManager.RoleExistsAsync("User"))
                await roleManager.CreateAsync(new IdentityRole<int>("User"));

            var adminEmail = configuration["AdminSettings:Email"];
            var adminPassword = configuration["AdminSettings:Password"];

            if(string.IsNullOrWhiteSpace(adminPassword))
                throw new Exception("Admin password is not set in configuration.");
            if (string.IsNullOrWhiteSpace(adminEmail))
                throw new Exception("Admin password is not set in configuration.");

            var admin = await userManager.FindByEmailAsync(adminEmail);
            if (admin == null)
            {
                admin = new ApplicationUser
                {
                    UserName = "admin",
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var createResult = await userManager.CreateAsync(admin, adminPassword);
                if(!createResult.Succeeded)
                {
                    var errors = string.Join(", ", createResult.Errors.Select(e => e.Description));
                    throw new Exception($"Failed to create admin user: {errors}");
                }
                await userManager.AddToRoleAsync(admin, "Admin");
            }
        }
    }
}
