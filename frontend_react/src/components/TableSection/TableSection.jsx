import React from 'react'
import {useState, useRef, useEffect} from 'react'
import "./tableSection.css"
import WwinLeagueLogo from "../../assets/svg/wwin_league_blue.svg"

const TableSection = () => {
  const leagueId = 315; 
  const season = 2023; 
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7010/api/TableStandings/${leagueId}/${season}`)
    .then(res => res.json())
    .then(data => setStandings(data))
    .catch(err => console.error("Greska prilikom dohvacanja!", err))
  }, []);

  return (
    <div id="table-section-wrapper"> 
      <div id="table-section-container">
        <h1 id="table-section-text">TABELA</h1>
        <div id="table-container">
          <div id="table-graphic-container">
            <div id="table-image-container">
              <img id="image" src={WwinLeagueLogo} alt="league"></img>
            </div>
          </div>
          <div id="table-info-container">
            <div id="table-headers">
              <span id="position-header" className="table-header">#</span>
              <span id="team-header" className="table-header">TEAM</span>
              <span id="played-header" className="table-header">P</span>
              <span id="won-header" className="table-header">W</span>
              <span id="drawn-header" className="table-header">D</span>
              <span id="lost-header" className="table-header">L</span>
              <span id="goal-difference-header" className="table-header">GD</span>
              <span id="goals-header" className="table-header">GOALS</span>
              <span id="points-header" className="table-header">PTS</span>
            </div>
              {standings.map((team, index) => {
                let circleClass = ""; 
                if (index === 0) circleClass = "champs";        // Champions League
                else if (index === 1 || index === 2) circleClass = "conference"; // Conference League
                else if (index >= standings.length - 2) circleClass = "relegation"; // Relegation

                return (
                  <div 
                    className={`table-rows animate-row ${team.teamName === "Zeljeznicar Sarajevo" ? "zeljo-pulse" : ""} item-${index}`} 
                    key={team.rank}
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <span className={`table-data`}>
                      <span className="position-wrapper">
                        <span className={`position-circle ${circleClass}`}>{team.rank}</span>
                      </span>
                    </span>
                    <span className="table-data" id="team-data">
                      <img src={team.teamLogoUrl} className="logo"/>
                      {team.teamName}
                    </span>
                    <span className="table-data">{team.played}</span>
                    <span className="table-data">{team.wins}</span>
                    <span className="table-data">{team.draws}</span>
                    <span className="table-data">{team.losses}</span>
                    <span className="table-data">{team.goalDifference}</span>
                    <span className="table-data">{team.goalsFor}:{team.goalsAgainst}</span>
                    <span className="table-data">{team.points}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableSection