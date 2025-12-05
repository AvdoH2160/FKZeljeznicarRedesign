import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import "./playerList.css"

const PlayerList = ({position}) => {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
    fetch(`https://localhost:7010/api/Player/position/${position}`)
    .then(res => res.json())
    .then(data => setPlayerData(data))
    .catch(err => console.error("Greska prilikom dohvacanja!", err))
  }, []);

  return (
    <div id="player-card-container">
        {playerData.map((player, index) => (
            <div className={`player item-${index}`}>
                <img src={`https://localhost:7010${player.thumbnailUrl}`}></img>
            </div>
        ))}
    </div>
  )
}

export default PlayerList