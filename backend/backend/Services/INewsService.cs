using backend.ViewModel;

namespace backend.Services
{
    public interface INewsService
    {
        Task<List<NewsListDto>> GetAllNewsAsync();
        Task<NewsListDto> GetFeaturedNewsAsync();
        Task<NewsDetailsDto?> GetNewsByIdAsync(int id);
        Task<NewsListDto> CreateNewsAsync(NewsCreateUpdateDto request);
        Task<bool> UpdateNewsAsync(int id, NewsCreateUpdateDto request);
        Task<bool> DeleteNewsAsync(int id);
    }
}
