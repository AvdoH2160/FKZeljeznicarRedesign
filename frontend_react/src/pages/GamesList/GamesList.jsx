import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./gamesList.css";

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [seasonFilter, setSeasonFilter] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [seasons, setSeasons] = useState([]);


  useEffect(() => {
    const loadGames = async () => {
      try {
        const res = await api.get("/games");
        const data = res.data.map(g => {
          const iso = g.kickOffTime.includes("T")
            ? g.kickOffTime
            : g.kickOffTime.replace(" ", "T");
          const date = new Date(iso);

          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();

          const hour = String(date.getHours()).padStart(2, "0");
          const minute = String(date.getMinutes()).padStart(2, "0");

          return {
            ...g,
            kickOffDateFormatted: `${day}.${month}.${year}`,
            kickOffTimeFormatted: `${hour}:${minute}`,
          };
        });

        setGames(data);

        const allSeasons = [...new Set(data.map(g => g.season))];
        setSeasons(allSeasons);
        setSeasonFilter(allSeasons[0] || "");
      } catch (err) {
        console.error("Greška prilikom učitavanja utakmica:", err);
      }
    };

    loadGames();
  }, []);

  const filteredGames = games.filter(g => {
    const now = new Date();
    const gameDate = new Date(g.kickOffTime);
    const seasonMatch = seasonFilter ? g.season === seasonFilter : true;
    const typeMatch =
      activeTab === "upcoming" ? gameDate >= now : gameDate < now;
    return seasonMatch && typeMatch;
  });

  return (
    <div className="gamesPage-container">
      <div className="gamesPage-header">
        <div className="gamesPage-header-container">
           <h1 className="gamesPage-title">UTAKMICE</h1>
           <div className="gamesPage-filters">
                <label>SEZONA:</label>
                <select
                value={seasonFilter}
                onChange={e => setSeasonFilter(e.target.value)}
                >
                {seasons.map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
                </select>
            </div>
        </div>
      </div>
      <div className="games-tabs">
        <div
            className={`tab upcoming ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
        >
            NAREDNE
        </div>
        <div
            className={`tab past ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
        >
            PRETHODNE
        </div>
      </div>
      <div className="gamesPage-vertical">
        {filteredGames.length === 0 && (
            <p>Nema utakmica za odabrani filter.</p>
        )}

        {filteredGames.map(game => (
            <div key={game.id} className="gameRow"
                // style={{
                //     "--league-logo": `url(https://localhost:7010${game.leagueLogoUrl})`
                // }}
            >
                <div className="gameRow-top">
                    <div className="league">
                        <img
                            src={`https://localhost:7010${game.smallLeagueLogoUrl}`}
                            alt={game.leagueName}
                        />
                        {/* <span>{game.leagueName}</span> */}
                    </div>
                    <div className="stadium">
                        {game.stadium}
                    </div>
                </div>
                <div className="gameRow-center">
                    <div 
                        className="team home"
                        style={{
                            "--team-logo": `url(https://localhost:7010${game.homeTeamLogoUrl})`
                        }}
                    >
                        <span>{game.homeTeamName.toUpperCase()}</span>
                    </div>
                    {activeTab === "past" ? (
                    <span className="score">
                        {game.homeScore} : {game.awayScore}
                    </span>
                    ) : (
                    <div className="kickoff">
                        <span>{game.kickOffDateFormatted}</span>
                        <span>{game.kickOffTimeFormatted}</span>
                    </div>
                    )}
                    <div 
                        className="team away"
                        style={{
                            "--team-logo": `url(https://localhost:7010${game.awayTeamLogoUrl})`
                        }}
                    >
                        <span>{game.awayTeamName.toUpperCase()}</span>
                    </div>
                </div>
                <div className="gameRow-bottom">

                </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default GamesList;
