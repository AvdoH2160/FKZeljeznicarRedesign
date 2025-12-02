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
          {standings.map((team, index) => (
            <div className={`table-rows item-${index}`}>
              <span id="position-data" className={`table-data item-${index}`}>{team.rank}</span>
              <span id="team-data" className={`table-data item-${index}`}><img src={team.teamLogoUrl} className="logo"/>{team.teamName}</span>
              <span id="played-data" className={`table-data item-${index}`}>{team.played}</span>
              <span id="won-data" className={`table-data item-${index}`}>{team.wins}</span>
              <span id="drawn-data" className={`table-data item-${index}`}>{team.draws}</span>
              <span id="lost-data" className={`table-data item-${index}`}>{team.losses}</span>
              <span id="goal-difference-data" className={`table-data item-${index}`}>{team.goalDifference}</span>
              <span id="goals-data" className={`table-data item-${index}`}>{team.goalsFor}:{team.goalsAgainst}</span>
              <span id="points-data" className={`table-data item-${index}`}>{team.points}</span>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TableSection