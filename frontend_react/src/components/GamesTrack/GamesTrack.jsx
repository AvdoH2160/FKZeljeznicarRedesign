import React, { useState, useEffect } from 'react'
import api from "../../services/api"
import "./gamesTrack.css"

const GamesTrack = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const loadGames = async () => {
            try {
            const res = await api.get("/games");

            const formatted = res.data.map(g => {
                const iso = g.kickOffTime.includes("T")
                ? g.kickOffTime
                : g.kickOffTime.replace(" ", "T");

                return {
                ...g,
                kickOffFormatted: new Date(iso).toLocaleString("bs-BA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })
                };
            });

            console.log(formatted);
            setGames(formatted);
            } catch (err) {
            console.error("Greška prilikom dohvatanja utakmica:", err);
            }
        };

        loadGames();
    }, []);

  return (
    <div className='gamesTrack-container'>
        {games.map((game, index) => (
            <div key={game.id} className='game'>
                <div className='gameLogo-container'>
                    <img src={`https://localhost:7010${game.smallLeagueLogoUrl}`}></img>
                </div>
                <div className='gameText-container'>
                    <div className='homeLogoText-container'>
                        <img src={`https://localhost:7010${game.homeTeamLogoUrl}`}></img>
                        <p className='teamName'> 
                            {game.homeTeamName}
                        </p>
                        <p className='teamScore'>
                            {game.homeScore}
                        </p>
                    </div>
                    <div className='homeLogoText-container'>
                        <img src={`https://localhost:7010${game.awayTeamLogoUrl}`}></img>
                        <p className='teamName'>
                            {game.awayTeamName}
                        </p>
                        <p className='teamScore'>
                            {game.awayScore}
                        </p>
                    </div>
                    <div className='gameDate-container'>
                        {game.kickOffFormatted}
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default GamesTrack