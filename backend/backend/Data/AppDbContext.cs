using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<News> News => Set<News>();
        public DbSet<NewsImage> NewsImages => Set<NewsImage>();
        public DbSet<TableStandings> TableStandings => Set<TableStandings>();
        public DbSet<Products> Products => Set<Products>();
        public DbSet<ProductSize> ProductSizes => Set<ProductSize>();
        public DbSet<Player> Player => Set<Player>();

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