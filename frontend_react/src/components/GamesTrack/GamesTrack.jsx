import React, { useState, useEffect, useRef } from 'react'
import api from "../../services/api"
import "./gamesTrack.css"

const GamesTrack = ({showOnlyActive = false}) => {
    const [games, setGames] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isActive, setIsActive] = useState(0);
    const sliderRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const loadGames = async () => {
            try {
            const res = await api.get("/games");

            const formatted = res.data.map(g => {
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
                    kickOffTimeFormatted: `${hour}:${minute}`       
                };
            });
            const now = new Date();
            formatted.sort((a,b) => new Date(a.kickOffTime) - new Date(b.kickOffTime));

            const nextIndex = formatted.findIndex(
                g => new Date(g.kickOffTime) > now
            );
            setSelectedIndex(nextIndex === -1 ? formatted.length - 1 : nextIndex);
            setGames(formatted);
            } catch (err) {
            console.error("Greška prilikom dohvatanja utakmica:", err);
            }
        };

        loadGames();
    }, []);

    useEffect(() => {
        const container = document.querySelector(".gamesTrack-container");
        if(container) {
            container.scrollLeft = container.scrollWidth;
        }
    }, [games, windowWidth]);

    const handleMouseDown = (e) => {
      setIsDown(true);
      setIsActive(0);
      if(!sliderRef.current) return;
      sliderRef.current.classList.add("dragging");
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
      setIsDown(false);
      sliderRef.current?.classList.remove("dragging");
    };
    
    const handleMouseUp = () => {
      setIsDown(false);
      sliderRef.current?.classList.remove("dragging");
    };

    const handleMouseMove = (e) => {
      if (!isDown || !sliderRef.current) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 1; 
      sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth <= 786);
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

  return (
    <div 
      className="gamesTrack-container"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
        {games.map((game, index) => {
            const isActive = index === selectedIndex;

            if (showOnlyActive) {
                if (!isActive) return null;
            }

            if (!showOnlyActive) {
                if (isMobile && isActive) return null;
                if (index > selectedIndex) return null;
            }
            
            return (
            <div key={game.id} className={`game ${isActive ? "active" : ""}`}>
                <div className="gameLogo-container">
                <img
                    src={`https://localhost:7010${
                    isActive ? game.leagueLogoUrl : game.smallLeagueLogoUrl
                    }`}
                />
                </div>

                <div className="gameText-container">
                <div className="homeLogoText-container">
                    <img src={`https://localhost:7010${game.homeTeamLogoUrl}`} />
                    <p className="teamName">
                    {game.homeTeamName.toUpperCase()}
                    </p>
                    {!isActive && <p className="teamScore">{game.homeScore}</p>}
                </div>

                {isActive && (
                    <div className="gameDate-container">
                    <span>{game.kickOffTimeFormatted}</span><br />
                    {game.kickOffDateFormatted}<br />
                    {game.stadium}
                    </div>
                )}

                <div className="homeLogoText-container">
                    <img src={`https://localhost:7010${game.awayTeamLogoUrl}`} />
                    <p className="teamName">
                    {game.awayTeamName.toUpperCase()}
                    </p>
                    {!isActive && <p className="teamScore">{game.awayScore}</p>}
                </div>

                {!isActive && (
                    <div className="gameDate-container">
                    {game.kickOffDateFormatted}
                    </div>
                )}
                </div>
            </div>
            );
        })}
    </div>
  
  )
}

export default GamesTrack