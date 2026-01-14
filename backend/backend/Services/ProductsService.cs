using Azure.Core;
using backend.Data;
using backend.Model;
using backend.ViewModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace backend.Services
{
    public class ProductsService(AppDbContext context, ImageService imageService) : IProductsService
    {
        public async Task<ProductsListDto> CreateProductAsync(ProductsCreateDto create)
        {
            if (create.ThumbnailUrl == null)
                throw new ArgumentNullException("ThumbnailMorabit poslan");
            var thumbnailUrl = await imageService.SaveFileAsync(create.ThumbnailUrl, "products");

            string? shopThumbnailUrl1 = create.ShopThumbnailUrl1 != null
                ? await imageService.SaveFileAsync(create.ShopThumbnailUrl1, "products")
                : null;

            string? shopThumbnailUrl2 = create.ShopThumbnailUrl2 != null
                ? await imageService.SaveFileAsync(create.ShopThumbnailUrl2, "products")
                : null;

            var imageUrl = new List<string>();
            if (create.GalleryImages != null)
            {
                foreach (var img in create.GalleryImages)
                {
                    var url = await imageService.SaveFileAsync(img, "news");
                    imageUrl.Add(url);
                }
            }

            if (create.IsFeatured)
            {
                var featuredProducts = await context.Products
                    .Where(p => p.IsFeatured)
                    .OrderBy(p => p.Id)
                    .ToListAsync();

                if (featuredProducts.Count >= 4)
                {
                    featuredProducts.First().IsFeatured = false;
                }
            }

            if (create.FeaturedOrder != 0)
            {
                var existingFeatured = await context.Products.Where(p => p.FeaturedOrder == create.FeaturedOrder).FirstOrDefaultAsync();
                if (existingFeatured != null)
                {
                    existingFeatured.FeaturedOrder = 0;
                }
            }


            var product = new Products
            {
                Name = create.Name,
                Description = create.Description,
                Price = create.Price,
                IsFeatured = create.IsFeatured,
                FeaturedOrder = create.FeaturedOrder,
                Category = create.Category,
                Brand = create.Brand,
                Color = create.Color,
                ThumbnailUrl = thumbnailUrl,
                ShopThumbnailUrl1 = shopThumbnailUrl1,
                ShopThumbnailUrl2 = shopThumbnailUrl2,
                GalleryImages = imageUrl
            };

            var sizes = new List<ProductSizeCreateDto>();
            foreach (var s in create.Sizes)
            {
                product.Sizes.Add(new ProductSize
                {
                    SizeLabel = s.Size,
                    Stock = s.Stock,
                });
            }

            context.Products.Add(product);
            await context.SaveChangesAsync();
            return new ProductsListDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                IsFeatured = product.IsFeatured,
                FeaturedOrder = product.FeaturedOrder,
                Category = product.Category,
                ThumbnailUrl = product.ThumbnailUrl,
                ShopThumbnailUrl1 = product.ShopThumbnailUrl1,
                ShopThumbnailUrl2 = product.ShopThumbnailUrl2,
                Sizes = product.Sizes
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

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await context.Products.Include(p => p.Sizes).FirstOrDefaultAsync(p => p.Id == id);
            if(product == null) 
                return false;
            if(product.GalleryImages != null)
            {
                foreach(var img in  product.GalleryImages)
                {
                    imageService.DeleteFile(img);
                }
            }
            if (product.ThumbnailUrl != null)
            {
                imageService.DeleteFile(product.ThumbnailUrl);
            }
            if (product.ShopThumbnailUrl1 != null)
            {
                imageService.DeleteFile(product.ShopThumbnailUrl1);
            }
            if (product.ShopThumbnailUrl2 != null)
            {
                imageService.DeleteFile(product.ShopThumbnailUrl2);
            }
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
                ShopThumbnailUrl1 = p.ShopThumbnailUrl1,
                ShopThumbnailUrl2 = p.ShopThumbnailUrl2,
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
                   ShopThumbnailUrl1 = p.ShopThumbnailUrl1,
                   ShopThumbnailUrl2 = p.ShopThumbnailUrl2,
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

        public async Task<List<ProductsListDto>> GetFeaturedProductAsync()
        {
            return await context.Products
                .Where(p => p.IsFeatured)
                .OrderBy(p => p.FeaturedOrder)
                .Take(4)
                .Include(p => p.Sizes)
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
                    ShopThumbnailUrl1 = p.ShopThumbnailUrl1,
                    ShopThumbnailUrl2 = p.ShopThumbnailUrl2,
                    Sizes = p.Sizes.Select(s => new ProductSizeDto
                    {
                        Id = s.Id,
                        SizeLabel = s.SizeLabel,
                        Stock = s.Stock,
                        PriceOverride = s.PriceOverride,
                        ProductId = s.ProductId
                    }).ToList()
                })
                .ToListAsync();
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
                ShopThumbnailUrl1 = product.ShopThumbnailUrl1,
                ShopThumbnailUrl2 = product.ShopThumbnailUrl2,
                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt
            };
        }

        public async Task<bool> UpdateProductAsync(int id, ProductsUpdateDto update)
        {
            var product = await context.Products.
                Include(p => p.Sizes).
                Where(p => p.Id == id).
                FirstOrDefaultAsync();
            if (product == null)
                return false;

            if (update.IsFeatured == true)
            {
                var featuredProducts = await context.Products
                    .Where(p => p.IsFeatured)
                    .OrderBy(p => p.Id)
                    .ToListAsync();

                if (featuredProducts.Count >= 4)
                {
                    featuredProducts.First().IsFeatured = false;
                }
            }

            if (product.FeaturedOrder != 0)
            {
                var existingFeatured = await context.Products.Where(p => p.FeaturedOrder == update.FeaturedOrder).FirstOrDefaultAsync();
                if (existingFeatured != null)
                {
                    existingFeatured.FeaturedOrder = 0;
                }
            }

            if (update.ThumbnailUrl != null)
            {
                imageService.DeleteFile(product.ThumbnailUrl);
                var thumbnailUrl = await imageService.SaveFileAsync(update.ThumbnailUrl, "products"); ;
                product.ThumbnailUrl = thumbnailUrl;
            }

            if (update.ShopThumbnailUrl1 != null)
            {
                if(product.ShopThumbnailUrl1 != null)
                    imageService.DeleteFile(product.ShopThumbnailUrl1);
                var shopThumbnailUrl1 = await imageService.SaveFileAsync(update.ShopThumbnailUrl1, "products"); ;
                product.ShopThumbnailUrl1 = shopThumbnailUrl1;
            }

            if (update.ShopThumbnailUrl2 != null)
            {
                if (product.ShopThumbnailUrl2 != null)
                    imageService.DeleteFile(product.ShopThumbnailUrl2);
                var shopThumbnailUrl2 = await imageService.SaveFileAsync(update.ShopThumbnailUrl2, "products"); ;
                product.ShopThumbnailUrl2 = shopThumbnailUrl2;
            }

            if (update.GalleryImages != null)
            {
                foreach(var img in product.GalleryImages)
                {
                    imageService.DeleteFile(img);
                }
                var imageUrl = new List<string>();
                foreach(var img in update.GalleryImages)
                {
                    var url = await imageService.SaveFileAsync(img, "products");
                    imageUrl.Add(url);
                }
                product.GalleryImages = imageUrl;
            }

            if (update.Name != null) product.Name = update.Name;
            if (update.Description != null) product.Description = update.Description;
            if (update.Price.HasValue) product.Price = update.Price.Value;
            if (update.Category != null) product.Category = update.Category;
            if (update.IsFeatured.HasValue) product.IsFeatured = update.IsFeatured.Value;
            if (update.FeaturedOrder.HasValue) product.FeaturedOrder = update.FeaturedOrder.Value;
            if (update.Brand != null) product.Brand = update.Brand;
            if (update.Color != null) product.Color = update.Color;

            await context.SaveChangesAsync();
            return true;
        }
    }
}
