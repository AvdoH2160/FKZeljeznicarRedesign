using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductsService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<ProductsListDto>>> GetAllProducts()
        {
            return Ok(await service.GetAllProductsAsync());
        }

        [HttpGet("featured")]
        public async Task<ActionResult<ProductsListDto>> GetFeaturedProduct()
        {
            var featuredProduct = await service.GetFeaturedProductAsync();
            if (featuredProduct == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(featuredProduct);
        }

        [HttpGet("cardFeatured")]
        public async Task<ActionResult<ProductsListDto>> GetCardFeaturedProducts()
        {
            var cardFeaturedProducts = await service.GetCardFeaturedProductsAsync();
            if (cardFeaturedProducts == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(cardFeaturedProducts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductsDetailsDto>> GetProductById(int id)
        {
            var product = await service.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<ProductsListDto>> CreateProduct([FromForm] ProductsCreateDto create)
        {
            var product = await service.CreateProductAsync(create);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, ProductsUpdateDto request)
        {
            var isUpdated = await service.UpdateProductAsync(id, request);
            if (!isUpdated)
            {
                return NotFound("Product not found");
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var isDeleted = await service.DeleteProductAsync(id);
            if (!isDeleted)
            {
                return NotFound("Product not found");
            }
            return NoContent();
        } 
    }
}
