using backend.Model;
using backend.Services;
using backend.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController(IGamesService service) : ControllerBase
    {
        [HttpGet()]
        public async Task<ActionResult<List<GameStripDto>>> GetGamesForStrip()
        {
            return Ok(await service.GetAllGamesAsync());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(GameCreateUpdateDto dto)
        {
            var id = await service.CreateAsync(dto);
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, GameCreateUpdateDto dto)
        {
            var success = await service.UpdateAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var success = await service.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{gameId}/goals")]
        public async Task<ActionResult<GameGoal>> AddGoal(int gameId, [FromBody] GameGoalCreateDto dto)
        {
            dto.GameId = gameId;
            var goal = await service.AddGoalAsync(dto);
            return Ok(goal);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("goals/{goalId}")]
        public async Task<ActionResult> RemoveGoal(int goalId)
        {
            var success = await service.RemoveGoalAsync(goalId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
