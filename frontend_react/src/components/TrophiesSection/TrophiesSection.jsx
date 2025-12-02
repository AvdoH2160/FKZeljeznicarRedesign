import React from 'react'
import {useState, useRef, useEffect} from 'react'
import "./trophiesSection.css"
import TrophyImage1 from "../../assets/images/zajko-zeba-vedran-kojsevski-fk-zeljeznicar.jpg"
import TrophyImage2 from "../../assets/images/2002-05-11-Titula-Fedja-Krvavac.jpg"


const TrophiesSection = () => {

    return (
        <div id="trophies-section-container">
            <h1 id="trophies-section-text">TROFEJI</h1>
            <div id="trophies-container">
                <div id="trophies-movingText-container">
                    <div id="alltrophies-container">
                        <div className='trophy' id="trophy1">

                        </div>
                        <div className='trophy' id="trophy2">
                            
                        </div>
                        <div className='trophy' id="trophy3">
                            
                        </div>
                        <div className='trophy' id="trophy4">
                            
                        </div>
                    </div>
                    <div id="moving-text">
                        <h1 className="loop-text">FK ŽELJEZNIČAR</h1>
                    </div>
                </div>
                <div id="trophies-image-container">
                    <img id="trophy-image"src={TrophyImage2}></img>
                </div>
            </div>
        </div>
    )
}

export default TrophiesSection