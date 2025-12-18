using backend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace backend.Data
{
    public class AppDbContext
        : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<News> News => Set<News>();
        public DbSet<NewsImage> NewsImages => Set<NewsImage>();
        public DbSet<TableStandings> TableStandings => Set<TableStandings>();
        public DbSet<Products> Products => Set<Products>();
        public DbSet<ProductSize> ProductSizes => Set<ProductSize>();
        public DbSet<Player> Player => Set<Player>();
        public DbSet<Profile> Profiles => Set<Profile>();
        public DbSet<Membership> Memberships => Set<Membership>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Products>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            builder.Entity<ProductSize>()
                .Property(ps => ps.PriceOverride)
                .HasPrecision(18, 2);
        }
    }
}