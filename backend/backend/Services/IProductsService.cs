using backend.ViewModel;

namespace backend.Services
{
    public interface IProductsService
    {
        Task<List<ProductsListDto>> GetAllProductsAsync();
        Task<List<ProductsListDto>> GetFeaturedProductAsync();
        Task<List<ProductsListDto>> GetCardFeaturedProductsAsync();
        Task<ProductsDetailsDto?> GetProductByIdAsync(int id);
        Task<ProductsListDto> CreateProductAsync(ProductsCreateDto create);
        Task<bool> UpdateProductAsync(int id, ProductsUpdateDto update);
        Task<bool> DeleteProductAsync(int id);
    }
}
