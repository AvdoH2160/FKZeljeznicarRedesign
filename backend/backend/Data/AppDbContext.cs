using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<News> News => Set<News>();
        public DbSet<NewsImage> NewsImages => Set<NewsImage>();
    }
}