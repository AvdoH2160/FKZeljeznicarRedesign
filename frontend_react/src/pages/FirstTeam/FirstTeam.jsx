import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import './firstTeam.css'
import PlayerList from "../../components/PlayerList/PlayerList.jsx"

const FirstTeam = () => {

  return (
    <div id="first-team-container">
        <div id="first-team-header">
            <h1 className="first-team-header-text">PRVI TIM</h1>
            <h2 className='first-team-header-text'>2025/26</h2>
        </div>
        <div className="first-team" id="first-team-goalkeepers">
            <h1 className="first-team-text">GOLMANI</h1>
            <PlayerList position={"Golman"}></PlayerList>
        </div>
        <div className="first-team" id="first-team-defenders">
            <h1 className="first-team-text">ODBRANA</h1>
            <PlayerList position={"Odbrana"}></PlayerList>
        </div>
        <div className="first-team" id="first-team-defenders">
            <h1 className="first-team-text">VEZNI RED</h1>
            <PlayerList position={"Vezni red"}></PlayerList>
        </div>
        <div className="first-team" id="first-team-defenders">
            <h1 className="first-team-text">NAPADAČI</h1>
            <PlayerList position={"Napadač"}></PlayerList>
        </div>
    </div>
  )
}

export default FirstTeam