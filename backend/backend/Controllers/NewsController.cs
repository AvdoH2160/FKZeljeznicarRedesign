using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController(INewsService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<NewsListDto>>> GetAllNews()
        {
            return Ok(await service.GetAllNewsAsync());
        }

        [HttpGet("featured")]
        public async Task<ActionResult<NewsListDto>> GetFeatured()
        {
            var featuredNews = await service.GetFeaturedNewsAsync();
            if (featuredNews == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(featuredNews);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NewsDetailsDto>> GetNewsById(int id)
        {
            var news = await service.GetNewsByIdAsync(id);
            if (news == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(news);
        }

        [HttpGet("/category/{category}")]
        public async Task<ActionResult<NewsDetailsDto>> GetNewsByCategory(string category)
        {
            var news = await service.GetNewsByCategoryAsync(category);
            if (news == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(news);
        }

        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<NewsDetailsDto>> GetNewsBySlug(string slug)
        {
            var news = await service.GetNewsBySlugAsync(slug);
            if (news == null)
                return NotFound("Ne postoji");
            return Ok(news);
        }

        [HttpPost]
        public async Task<ActionResult<NewsListDto>> CreateNews([FromForm] NewsCreateUpdateDto request)
        {
            var news = await service.CreateNewsAsync(request);
            return CreatedAtAction(nameof(GetNewsById), new { id = news.Id }, news);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateNews(int id, NewsCreateUpdateDto request)
        {
            var isUpdated = await service.UpdateNewsAsync(id, request);
            if (!isUpdated)
            {
                return NotFound("News not found");
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNews(int id)
        {
            var isDeleted = await service.DeleteNewsAsync(id);
            if(!isDeleted)
            {
                return NotFound("News not found");
            }
            return NoContent();
        }
    }
}
