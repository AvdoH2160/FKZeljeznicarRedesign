import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import api from "../../services/api"
import { Link } from 'react-router-dom'
import "./playerList.css"

const PlayerList = ({position}) => {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
      const load = async () => {
        try {
          const res = await api.get(`/Player/position/${position}`);
          setPlayerData(res.data);
        }
        catch(err) {
          console.error("Greska prilikom dohvacanja!", err);
        }
      }

      load();
    }, []);

    function toSlug(name, surname) {
    return `${name}-${surname}`
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace("č", "c").replace("ć", "c")
      .replace("š", "s").replace("ž", "z").replace("đ", "dj");
    }
  return (
    <div id="player-card-container">
        {playerData.map((player, index) => (
          <Link to={`/prvi-tim/${toSlug(player.name, player.surname)}`} 
            key={player.id}
            className={`player item-${index}`}
          >
            <div className="player-text">
              <h1 className="player-name">{player.name}</h1>
              <h1 className="player-surname">{player.surname.toUpperCase()}</h1>
              <h1 className="player-position">{player.position}</h1>
            </div>
            <h1 className="player-number">{player.number}</h1>
            <img className="player-image" src={`https://localhost:7010${player.thumbnailUrl}`}></img>
          </Link>
        ))}
    </div>
  )
}

export default PlayerList