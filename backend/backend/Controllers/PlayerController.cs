using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController(IPlayerService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<PlayerListDto>>> GetAllPlayers()
        {
            return Ok(await service.GetAllPlayersAsync());
        }

        [HttpGet("featured")]
        public async Task<ActionResult<List<PlayerListDto>>> GetFeaturedPlayers()
        {
            var featuredPlayers = await service.GetFeaturedPlayersAsync();
            if (featuredPlayers == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(featuredPlayers);
        }

        [HttpGet("position/{position}")]
        public async Task<ActionResult<List<PlayerListDto>>> GetPlayerByPosition(string position)
        {
            var player = await service.GetPlayerByPositionAsync(position);
            if (player == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(player);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerDetailsDto>> GetPlayerById(int id)
        {
            var player = await service.GetPlayerByIdAsync(id);
            if (player == null)
            {
                return NotFound("Ne postoji");
            }
            return Ok(player);
        }

        [HttpPost]
        public async Task<ActionResult<PlayerListDto>> CreatePlayer([FromForm] PlayerCreateDto create)
        {
            var player = await service.CreatePlayerAsync(create);
            return Ok(player);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePlayer(int id, PlayerUpdateDto request)
        {
            var isUpdated = await service.UpdatePlayerAsync(id, request);
            if (!isUpdated)
            {
                return NotFound("Player not found");
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePlayer(int id)
        {
            var isDeleted = await service.DeletePlayerAsync(id);
            if (!isDeleted)
            {
                return NotFound("Player not found");
            }
            return NoContent();
        }
    }
}
