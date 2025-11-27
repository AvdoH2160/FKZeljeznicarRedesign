using backend.Data;
using backend.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ProductsService(AppDbContext context) : IProductsService
    {
        public async Task<ProductsListDto> CreateProductAsync(ProductsCreateDto create)
        {
            if (create.ThumbnailUrl == null)
                throw new ArgumentNullException("ThumbnailMorabit poslan");
            var thumbnailUrl = await SaveFileAsync(create.ThumbnailUrl);

            var sizes = new List<ProductSizeCreateDto>();

        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await context.Products.Include(p => p.Sizes).FirstOrDefaultAsync(p => p.Id == id);
            if(product == null) 
                return false;
            context.ProductSizes.RemoveRange(product.Sizes);
            context.Products.Remove(product);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<List<ProductsListDto>> GetAllProductsAsync()
        {
            return await context.Products.Select(p => new ProductsListDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                IsFeatured = p.IsFeatured,
                FeaturedOrder = p.FeaturedOrder,
                Category = p.Category,
                ViewCount = p.ViewCount,
                ThumbnailUrl = p.ThumbnailUrl,
                Sizes = p.Sizes
                    .Select(s => new ProductSizeDto
                    {
                        Id = s.Id,
                        SizeLabel = s.SizeLabel,
                        Stock = s.Stock,
                        PriceOverride = s.PriceOverride,
                        ProductId = s.ProductId
                    }).ToList()
            }).ToListAsync();
        }

        public async Task<List<ProductsListDto>> GetCardFeaturedProductsAsync()
        {
            return await context.Products.Where(p => p.FeaturedOrder != 0)
               .Select(p => new ProductsListDto
               {
                   Id = p.Id,
                   Name = p.Name,
                   Price = p.Price,
                   IsFeatured = p.IsFeatured,
                   FeaturedOrder = p.FeaturedOrder,
                   Category = p.Category,
                   ViewCount = p.ViewCount,
                   ThumbnailUrl = p.ThumbnailUrl,
                   Sizes = p.Sizes
                       .Select(s => new ProductSizeDto
                       {
                           Id = s.Id,
                           SizeLabel = s.SizeLabel,
                           Stock = s.Stock,
                           PriceOverride = s.PriceOverride,
                           ProductId = s.ProductId
                       }).ToList()
               }).ToListAsync();
        }

        public async Task<ProductsListDto?> GetFeaturedProductAsync()
        {
            var featuredProduct = await context.Products.Where(p => p.IsFeatured).FirstOrDefaultAsync();
            if (featuredProduct == null)
                return null;
            return new ProductsListDto
            {
                Id = featuredProduct.Id,
                Name = featuredProduct.Name,
                Price = featuredProduct.Price,
                IsFeatured = featuredProduct.IsFeatured,
                FeaturedOrder = featuredProduct.FeaturedOrder,
                Category = featuredProduct.Category,
                ViewCount = featuredProduct.ViewCount,
                ThumbnailUrl = featuredProduct.ThumbnailUrl,
                Sizes = featuredProduct.Sizes
                    .Select(s => new ProductSizeDto
                    {
                        Id = s.Id,
                        SizeLabel = s.SizeLabel,
                        Stock = s.Stock,
                        PriceOverride = s.PriceOverride,
                        ProductId = s.ProductId
                    }).ToList()
            };
        }

        public async Task<ProductsDetailsDto?> GetProductByIdAsync(int id)
        {
            var product = await context.Products.Where(p => id == p.Id).FirstOrDefaultAsync();
            if(product == null) 
                return null;
            return new ProductsDetailsDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Sizes = product.Sizes
                    .Select(s => new ProductSizeDto
                    {
                        Id = s.Id,
                        SizeLabel = s.SizeLabel,
                        Stock = s.Stock,
                        PriceOverride = s.PriceOverride,
                        ProductId = s.ProductId
                    }).ToList(),
                IsFeatured = product.IsFeatured,
                FeaturedOrder = product.FeaturedOrder,
                Category = product.Category,
                Brand = product.Brand,
                Color = product.Color,
                GalleryImages = product.GalleryImages,
                ViewCount = product.ViewCount,
                ThumbnailUrl = product.ThumbnailUrl,
                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt
            };
        }

        public Task<bool> UpdateProductAsync(int id, ProductsUpdateDto update)
        {
            throw new NotImplementedException();
        }
    }
}
