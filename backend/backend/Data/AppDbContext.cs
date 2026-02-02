using backend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

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
        public DbSet<MembershipApplication> MembershipApplications => Set<MembershipApplication>();
        public DbSet<Game> Games => Set<Game>();
        public DbSet<League> Leagues => Set<League>();
        public DbSet<Team> Teams => Set<Team>();  
        public DbSet<Sector> Sectors => Set<Sector>();
        public DbSet<SectorTemplate> SectorTemplates => Set<SectorTemplate>();
        public DbSet<Ticket> Tickets => Set<Ticket>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Products>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            builder.Entity<ProductSize>()
                .Property(ps => ps.PriceOverride)
                .HasPrecision(18, 2);

            builder.Entity<Game>()
                .HasOne(g => g.HomeTeam)
                .WithMany()
                .HasForeignKey(g => g.HomeTeamId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Game>()
                .HasOne(g => g.AwayTeam)
                .WithMany()
                .HasForeignKey(g => g.AwayTeamId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Game>()
                .HasOne(g => g.League)
                .WithMany()
                .HasForeignKey(g => g.LeagueId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Ticket>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tickets)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Ticket>()
                .Property(t => t.Price)
                .HasPrecision(10, 2);

            builder.Entity<Sector>()
                .Property(s => s.Price)
                .HasPrecision(10, 2);

            builder.Entity<SectorTemplate>()
                .Property(s => s.Price)
                .HasPrecision(10, 2);


        }
    }
}