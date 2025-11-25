using Microsoft.Extensions.Logging;

namespace backend.Services
{
    public class LeagueTableUpdateService(ILogger<LeagueTableUpdateService> logger, IServiceProvider serviceProvider) : BackgroundService
    {
        
        protected override async Task ExecuteAsync (CancellationToken stoppingToken)
        {
            logger.LogInformation("LeagueTableUpdateService is starting.");

            while(!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = serviceProvider.CreateScope())
                    {
                        var tableService = scope.ServiceProvider.GetRequiredService<ITableStandingsService>();
                        await tableService.UpdateLeagueTableAsync(leagueId: 315, season: 2023);
                    }
                    
                    logger.LogInformation("League table updated successfully {time}", DateTime.Now);
                }
                catch(Exception ex)
                {
                    logger.LogError(ex, "Error updating league table {time}", DateTime.Now);
                }
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}
