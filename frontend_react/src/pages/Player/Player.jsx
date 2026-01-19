import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import gsap from "gsap";
import './player.css'

const Player = () => {
    const{ slug } = useParams();

    const[player, setPlayer] = useState(null);
    const numberRef = useRef(null);
    const backgroundRef = useRef(null);

    useEffect(() => {
        if (!slug) return;
        fetch(`https://localhost:7010/api/Player/slug/${slug}`)
        .then(res => res.json())
        .then(data => setPlayer(data))
        .catch(err => console.error("Greska prilikom dohvacanja!", err))
    }, [slug]);
    
    useEffect(() => {
        if (!player || !numberRef.current || !backgroundRef.current) return;

        gsap.to(numberRef.current, {
            backgroundPosition: "200% 50%", 
            duration: 1,                 
            repeat: -1,                
            yoyo: true,                   
            ease: "sine.inOut"          
        });
        gsap.to(backgroundRef.current, {
            backgroundPosition: "100% 100%", 
            duration: 4,                   
            repeat: -1,                     
            yoyo: true,                     
            ease: "sine.inOut"              
        });
    }, [player]);
    
    if (!player) {
        return <div>Loading...</div>;
    }
    else {
        document.title = `${player.name} ${player.surname} - FK Željezničar`;
    }

  return (
    <div className='player-container'>
        <div className='player-info-container' ref={backgroundRef}> 
            <div className='player-info'>
                <div className="onlyPlayer-number" ref={numberRef}>
                    {player.number}
                </div>
                <div className='player-text-container'>
                    <div className="onlyPlayer-name-surname-position">
                        <p className="onlyPlayer-name">
                            {player.name.toUpperCase()}
                        </p>
                        <p className="onlyPlayer-surname">
                            {player.surname}
                        </p>
                        <p className='onlyPlayer-position'>
                            {player.position.toUpperCase()}
                        </p>
                    </div>
                </div>
                <div className='player-image-container'>
                    <img className='onlyPlayer-image' src={`https://localhost:7010${player.thumbnailUrl}`}></img>
                </div>
            </div>
        </div>
        <div className="onlyPlayer-allDetails">
            <div className="onlyPlayer-details-info">
                <div className="onlyPlayer-details top">
                    Puno ime:<br/>
                    <span className="info-bottom">{player.name} {player.surname}</span>
                </div>
                <div className="onlyPlayer-details top">
                    Datum rođenja:<br/>
                    <span className="info-bottom">{player.birthDate}</span>
                </div>
                <div className="onlyPlayer-details top">
                    Mjesto rođenja:<br/>
                    <span className="info-bottom">{player.placeOfBirth}</span>
                </div>
                <div className="onlyPlayer-details top">
                    Državljanstvo:<br/>
                    <span className="info-bottom">{player.nationality}</span>
                </div>
            </div>
            <div className="onlyPlayer-details top">
                BIVŠI KLUBOVI:<br/>
                <span className="info-bottom">{player.previousClubs}</span>
            </div>
            <div className="onlyPlayer-details-biography">
                BIOGRAFIJA:<br/>
                <span className="biography">{player.description}</span>
            </div>
        </div>
    </div>
  )
}

export default Player