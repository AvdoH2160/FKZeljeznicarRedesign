using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace backend.Services
{
    public class NewsService(AppDbContext context, IHttpContextAccessor httpContextAccessor) : INewsService
    {
        private string RequestScheme => httpContextAccessor.HttpContext.Request.Scheme;
        private string RequestHost => httpContextAccessor.HttpContext.Request.Host.Value;
        public async Task<NewsListDto> CreateNewsAsync(NewsCreateUpdateDto request)
        {
            if(request.Thumbnail == null)
            {
                throw new ArgumentNullException("Mora bit poslan");
            }    
            var thumbnailUrl = await SaveFileAsync(request.Thumbnail);

            var imageUrls = new List<string>();
            if (request.Images != null && request.Images.Count > 0)
            {
                foreach(var img in request.Images)
                {
                    var url = await SaveFileAsync(img);
                    imageUrls.Add(url);
                }
            }

            if(request.IsFeatured)
            {
                var existingFeatured = await context.News.Where(n => n.IsFeatured).FirstOrDefaultAsync();
                if(existingFeatured != null)
                {
                    existingFeatured.IsFeatured = false;
                }
            }

            var news = new News
            {
                Title = request.Title,
                Summary = request.Summary,
                Content = request.Content,
                ThumbnailUrl = thumbnailUrl,
                IsFeatured = request.IsFeatured,
                Category = request.Category,
                PublishedDate = DateTime.UtcNow,
                Images = imageUrls.Select(x => new NewsImage { ImageUrl = x }).ToList()
            };

            context.News.Add(news);
            await context.SaveChangesAsync();
            return new NewsListDto
            {
                Id = news.Id,
                Title = news.Title,
                Summary = news.Summary,
                ThumbnailUrl = news.ThumbnailUrl,
                IsFeatured = news.IsFeatured,
                PublishedDate = news.PublishedDate
            };
        }

        public async Task<bool> UpdateNewsAsync(int id, NewsCreateUpdateDto request)
        {
            var news = await context.News.Include(n => n.Images).FirstOrDefaultAsync(n => n.Id == id);
            if (news == null)
            {
                return false;
            }

            if (news.IsFeatured && request.IsFeatured)
            {
                var currentFeatured = await context.News.FirstOrDefaultAsync(n => n.IsFeatured);
                if (currentFeatured != null)
                {
                    currentFeatured.IsFeatured = false;
                }
            }

            news.Title = request.Title;
            news.Summary = request.Summary;
            news.Content = request.Content;
            news.IsFeatured = request.IsFeatured;
            news.Category = request.Category;

            if (request.Thumbnail != null)
            {
                var thumbnailUrl = await SaveFileAsync(request.Thumbnail);
            }

            if (request.Images != null && request.Images.Count > 0)
            {
                context.NewsImages.RemoveRange(news.Images);
                var imageUrls = new List<string>();
                foreach (var img in request.Images)
                {
                    var url = await SaveFileAsync(img);
                    imageUrls.Add(url);
                }
                news.Images = imageUrls.Select(x => new NewsImage { ImageUrl = x }).ToList();
            }

            await context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteNewsAsync(int id)
        {
            var news = await context.News.Include(n => n.Images).FirstOrDefaultAsync(n => n.Id == id);
            if(news == null)
            {
                return false;
            } 
            context.NewsImages.RemoveRange(news.Images);
            context.News.Remove(news);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<List<NewsListDto>> GetAllNewsAsync()
        {
            return await context.News.Select(n => new NewsListDto
            {
                Id = n.Id,
                Title = n.Title,
                Summary = n.Summary,
                ThumbnailUrl = n.ThumbnailUrl,
                IsFeatured = n.IsFeatured,
                PublishedDate = n.PublishedDate
            }).ToListAsync();
        }

        public async Task<NewsListDto> GetFeaturedNewsAsync()
        {
            var featuredNews = await context.News.Where(n => n.IsFeatured).FirstOrDefaultAsync();
            if(featuredNews == null)
            {
               return null;
            }
            return new NewsListDto
            {
                Id = featuredNews.Id,
                Title = featuredNews.Title,
                Summary = featuredNews.Summary,
                ThumbnailUrl = featuredNews.ThumbnailUrl,
                IsFeatured = featuredNews.IsFeatured,
                PublishedDate = featuredNews.PublishedDate
            };
        }

        public async Task<NewsDetailsDto?> GetNewsByIdAsync(int id)
        {
            var news = await context.News.Include(n => n.Images).Where(n => n.Id == id).FirstOrDefaultAsync();
            if (news == null)
            {
                return null;
            }
            return new NewsDetailsDto
            {
                Id = news.Id,
                Title = news.Title,
                Summary = news.Summary,
                Content = news.Content,
                ThumbnailUrl = news.ThumbnailUrl,
                IsFeatured = news.IsFeatured,
                ViewCount = news.ViewCount,
                Category = news.Category,
                PublishedDate = news.PublishedDate,
                ImageUrls = news.Images.Select(i => i.ImageUrl).ToList()
            };
        }

        private async Task<string> SaveFileAsync(IFormFile file)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot", "uploads", "news");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using(var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/uploads/news/{fileName}";
        }
    }
}
