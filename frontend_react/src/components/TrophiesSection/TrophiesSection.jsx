import React from 'react'
import {useState, useRef, useEffect} from 'react'
import "./trophiesSection.css"
import TrophyImage1 from "../../assets/images/zajko-zeba-vedran-kojsevski-fk-zeljeznicar.jpg"
import TrophyImage2 from "../../assets/images/2002-05-11-Titula-Fedja-Krvavac.jpg"
import Trophy1 from "../../assets/svg/prvaci_jugoslavije_trofej.svg"
import Trophy2 from "../../assets/svg/premijer_liga_trofej.svg"
import Trophy3 from "../../assets/svg/kup_bih_trofej.svg"
import Trophy4 from "../../assets/svg/superkup_bih_trofej.svg"

const TrophiesSection = () => {

    return (
        <div id="trophies-section-container">
            <h1 id="trophies-section-text">TROFEJI</h1>
            <div id="trophies-container">
                <div id="trophies-movingText-container">
                    <div id="alltrophies-container">
                        <div className='trophy-container'>
                            <img className="trophy" id="trophy1" src={Trophy1}></img>
                            <h2>PRVACI JUGOSLAVIJE</h2>
                            <h1>1</h1>
                        </div>
                        <div className='trophy-container' id="trophy2">
                            <img className="trophy" id="trophy2" src={Trophy2}></img>
                            <h2>PREMIJER LIGA BIH</h2>
                            <h1>6</h1>
                        </div>
                        <div className='trophy-container' id="trophy3">
                            <img className="trophy" id="trophy3" src={Trophy3}></img>
                            <h2>KUP BIH</h2>
                            <h1>6</h1>
                        </div>
                        <div className='trophy-container' id="trophy4">
                            <img className="trophy" id="trophy4" src={Trophy4}></img>
                            <h2>SUPER KUP BIH</h2>
                            <h1>3</h1>
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