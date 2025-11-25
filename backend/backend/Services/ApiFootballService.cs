using backend.Model;
using System.Text.Json;

namespace backend.Services
{
    public class ApiFootballService : IApiFootballService
    {
        public readonly HttpClient _httpClient;

        public ApiFootballService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Add("x-apisports-key", "3c7714c2bbec929795628c88f574a9d4");
            //_httpClient.DefaultRequestHeaders.Add("x-apisports-host", "api-football-v1.p.rapidapi.com");
        }

        public async Task<List<TableStandings>> GetLeagueStandings(int leagueId, int season)
        {
            var url = $"https://v3.football.api-sports.io/standings?league={leagueId}&season={season}";
            var response = await _httpClient.GetAsync(url);

            if(!response.IsSuccessStatusCode)
            {
                throw new Exception($"Failed to fetch league standings: {response.ReasonPhrase}");
            }

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);
            var standingsList = new List<TableStandings>();

            var standingsArray = doc.RootElement
                .GetProperty("response")[0]
                .GetProperty("league")
                .GetProperty("standings")[0];

            foreach (var team in standingsArray.EnumerateArray())
            {
                standingsList.Add(new TableStandings
                {
                    LeagueId = leagueId,
                    Season = season,
                    Rank = team.GetProperty("rank").GetInt32(),
                    TeamId = team.GetProperty("team").GetProperty("id").GetInt32(),
                    TeamName = team.GetProperty("team").GetProperty("name").GetString(),
                    TeamLogoUrl = team.GetProperty("team").GetProperty("logo").GetString(),
                    Played = team.GetProperty("all").GetProperty("played").GetInt32(),
                    Wins = team.GetProperty("all").GetProperty("win").GetInt32(),
                    Draws = team.GetProperty("all").GetProperty("draw").GetInt32(),
                    Losses = team.GetProperty("all").GetProperty("lose").GetInt32(),
                    GoalsFor = team.GetProperty("all").GetProperty("goals").GetProperty("for").GetInt32(),
                    GoalsAgainst = team.GetProperty("all").GetProperty("goals").GetProperty("against").GetInt32(),
                    GoalDifference = team.GetProperty("all").GetProperty("goals").GetProperty("for").GetInt32() - team.GetProperty("all").GetProperty("goals").GetProperty("against").GetInt32(),
                    Points = team.GetProperty("points").GetInt32()
                });
            }

            return standingsList;
        }
    }
}
