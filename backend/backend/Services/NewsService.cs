using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace backend.Services
{
    public class NewsService(AppDbContext context, ImageService imageService) : INewsService
    {
        public async Task<NewsListDto> CreateNewsAsync(NewsCreateUpdateDto request)
        {
            if(request.Thumbnail == null)
            {
                throw new ArgumentNullException("Mora bit poslan");
            }    
            var thumbnailUrl = await imageService.SaveFileAsync(request.Thumbnail, "news");

            var imageUrls = new List<string>();
            if (request.Images != null && request.Images.Count > 0)
            {
                foreach(var img in request.Images)
                {
                    var url = await imageService.SaveFileAsync(img, "news");
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

            if (request.IsFeatured == true)
            {
                var currentFeatured = await context.News.FirstOrDefaultAsync(n => n.IsFeatured);
                if (currentFeatured != null)
                {
                    currentFeatured.IsFeatured = false;
                }
            }

            if(request.Title != null)
                news.Title = request.Title;
            if(request.Summary != null)
                news.Summary = request.Summary;
            if(request.Content != null)
                news.Content = request.Content;
            news.IsFeatured = request.IsFeatured;
            if(request.Category != null)
                news.Category = request.Category;  

            if (request.Thumbnail != null)
            {
                var oldThumb = news.ThumbnailUrl;
                imageService.DeleteFile(oldThumb);
                var thumbnailUrl = await imageService.SaveFileAsync(request.Thumbnail, "news");
            }

            if (request.Images != null && request.Images.Count > 0)
            {
                foreach(var img in news.Images)
                {
                    imageService.DeleteFile(img.ImageUrl);
                }
                context.NewsImages.RemoveRange(news.Images);
                var imageUrls = new List<string>();
                foreach (var img in request.Images)
                {
                    var url = await imageService.SaveFileAsync(img, "news");
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
            if (news.Images != null && news.Images.Count > 0)
            {
                foreach (var img in news.Images)
                {
                    imageService.DeleteFile(img.ImageUrl);
                }
                context.NewsImages.RemoveRange(news.Images);
            }
            if(news.ThumbnailUrl != null)
            {
                imageService.DeleteFile(news.ThumbnailUrl);
            }
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
                Category = n.Category,
                PublishedDate = n.PublishedDate
            }).ToListAsync();
        }

        public async Task<NewsListDto?> GetFeaturedNewsAsync()
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
                Category = featuredNews.Category,
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
    }
}
