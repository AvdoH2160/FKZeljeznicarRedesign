using backend.Model;
using backend.ViewModel;

namespace backend.Services
{
    public interface INewsService
    {
        Task<List<NewsListDto>> GetAllNewsAsync();
        Task<NewsListDto?> GetFeaturedNewsAsync();
        Task<List<NewsListDto>> GetNewsByCategoryAsync(string category);
        Task<NewsDetailsDto?> GetNewsByIdAsync(int id);
        Task<NewsDetailsDto?> GetNewsBySlugAsync(string slug);
        Task<PagedResult<NewsListDto>> GetPagedNewsAsync(int page, int pageSize, string? category);
        Task<List<NewsListDto>> GetRelatedNewsAsync(int currentId, DateTime publishedDate);
        Task<NewsListDto> CreateNewsAsync(NewsCreateUpdateDto request);
        Task<bool> UpdateNewsAsync(int id, NewsCreateUpdateDto request);
        Task<bool> DeleteNewsAsync(int id);
        Task<string> GenerateUniqueSlugAsync(string title);

        //Task<NewsDetailsDto?> GetNewsByGameIdAsync(int gameId);
    }
}
