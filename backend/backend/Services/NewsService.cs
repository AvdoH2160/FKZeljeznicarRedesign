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

            if (request.IsFeatured.HasValue && request.IsFeatured.Value)
            {
                var existingFeatured = await context.News.Where(n => n.IsFeatured == true).FirstOrDefaultAsync();
                if (existingFeatured != null)
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
                IsFeatured = request.IsFeatured.Value,
                Category = request.Category,
                Images = imageUrls.Select(x => new NewsImage { ImageUrl = x }).ToList()
                //GameId = request.GameId,
            };

            if (request.PublishedDate.HasValue)
            {   
                news.PublishedDate = request.PublishedDate.Value;
            }
            else
            {
                news.PublishedDate = DateTime.UtcNow;
            }

            news.Slug = await GenerateUniqueSlugAsync(news.Title);

            context.News.Add(news);
            await context.SaveChangesAsync();
            return new NewsListDto
            {
                Id = news.Id,
                Title = news.Title,
                Slug = news.Slug,
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

            //if(request.GameId != null)
            //{
            //    news.GameId = request.GameId;
            //}

            if(request.Title != null)
            {
                news.Title = request.Title;
                news.Slug = await GenerateUniqueSlugAsync(request.Title);
            }
            if(request.Summary != null)
                news.Summary = request.Summary;
            if(request.Content != null)
                news.Content = request.Content;
            if (request.IsFeatured.HasValue)
            {
                news.IsFeatured = request.IsFeatured.Value;
            }
            if (request.Category != null)
                news.Category = request.Category;  

            if (request.Thumbnail != null)
            {
                var oldThumb = news.ThumbnailUrl;
                imageService.DeleteFile(oldThumb);
                news.ThumbnailUrl = await imageService.SaveFileAsync(request.Thumbnail, "news");
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

            if(request.PublishedDate.HasValue)
            {
                news.PublishedDate = request.PublishedDate.Value;
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
            return await context.News
                .OrderByDescending(n => n.PublishedDate)
                .Select(n => new NewsListDto
            {
                Id = n.Id,
                Title = n.Title,
                Slug = n.Slug,
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
                Slug = featuredNews.Slug,
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
                //GameId = news.GameId
            };
        }

        public async Task<string> GenerateUniqueSlugAsync(string title)
        {
            string baseSlug = SlugHelper.GenerateSlug(title);
            string slug = baseSlug;
            int counter = 1;

            while (await context.News.AnyAsync(n => n.Slug == slug))
            {
                slug = $"{baseSlug}-{counter}";
                counter++;
            }

            return slug;
        }

        public async Task<NewsDetailsDto?> GetNewsBySlugAsync(string slug)
        {
            var news = await context.News.Include(n => n.Images)
                .Where(n => n.Slug == slug).FirstOrDefaultAsync();
            if (news == null)
                return null;
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
                //GameId = news.GameId
            };

        }

        public async Task<List<NewsListDto>> GetNewsByCategoryAsync(string category)
        {
            return await context.News
                .Where(n => n.Category == category)
                .Select(n => new NewsListDto
            {
                Id = n.Id,
                Title = n.Title,
                Slug = n.Slug,
                Summary = n.Summary,
                ThumbnailUrl = n.ThumbnailUrl,
                IsFeatured = n.IsFeatured,
                Category = n.Category,
                PublishedDate = n.PublishedDate
            }).ToListAsync();
        }

        public async Task<PagedResult<NewsListDto>> GetPagedNewsAsync(int page, int pageSize, string? category)
        {
            var query = context.News.AsQueryable();

            if(!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(n => n.Category.ToLower() == category.ToLower());
            }

            query = query.OrderByDescending(n => n.PublishedDate);

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(n => new NewsListDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Slug = n.Slug,
                    Summary = n.Summary,
                    ThumbnailUrl = n.ThumbnailUrl,
                    IsFeatured = n.IsFeatured,
                    Category = n.Category,
                    PublishedDate = n.PublishedDate
                })
                .ToListAsync();

            return new PagedResult<NewsListDto>
            {
                Items = items,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount
            };
        }

        public async Task<List<NewsListDto>> GetRelatedNewsAsync(int currentId, DateTime publishedDate)
        {
            var fromDate = publishedDate.AddDays(-7);
            var toDate = publishedDate.AddDays(7);

            var result = await context.News
                .Where(n =>
                    n.Id != currentId &&
                    n.PublishedDate >= fromDate &&
                    n.PublishedDate <= toDate)
                .OrderByDescending(n => n.PublishedDate)
                .Take(4)
                .Select(n => new NewsListDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Slug = n.Slug,
                    Summary = n.Summary,
                    ThumbnailUrl = n.ThumbnailUrl,
                    IsFeatured = n.IsFeatured,
                    Category = n.Category,
                    PublishedDate = n.PublishedDate
                }).ToListAsync();

            if (!result.Any() || result.Count() < 4)
            {
                result = await context.News
                .OrderByDescending(n => n.PublishedDate)
                .Take(4)
                .Select(n => new NewsListDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Slug = n.Slug,
                    Summary = n.Summary,
                    ThumbnailUrl = n.ThumbnailUrl,
                    IsFeatured = n.IsFeatured,
                    Category = n.Category,
                    PublishedDate = n.PublishedDate
                }).ToListAsync();
            }
            return result;
        }

        //public async Task<NewsDetailsDto?> GetNewsByGameIdAsync(int gameId)
        //{
        //    var news = await context.News
        //        .Include(n => n.Images)
        //        .FirstOrDefaultAsync(n => n.GameId == gameId);

        //    if (news == null)
        //    {
        //        return null;
        //    }

        //    return new NewsDetailsDto
        //    {
        //        Id = news.Id,
        //        Title = news.Title,
        //        Summary = news.Summary,
        //        Content = news.Content,
        //        ThumbnailUrl = news.ThumbnailUrl,
        //        IsFeatured = news.IsFeatured,
        //        ViewCount = news.ViewCount,
        //        Category = news.Category,
        //        PublishedDate = news.PublishedDate,
        //        ImageUrls = news.Images.Select(i => i.ImageUrl).ToList(),
        //        GameId = news.GameId
        //    };
        //}
    }
}
