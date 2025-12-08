import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './trophiesSection2.css'
import TrophyImage1 from "../../assets/images/image14.png"
import TrophyImage2 from "../../assets/images/zajko-zeba-vedran-kojsevski-fk-zeljeznicar.jpg"
import TrophyImage3 from "../../assets/images/2002-05-11-Titula-Fedja-Krvavac.jpg"
import TrophyImage4 from "../../assets/images/image17.png"
import Trophy1 from "../../assets/svg/prvaci_jugoslavije_trofej.svg"
import Trophy2 from "../../assets/svg/premijer_liga_trofej.svg"
import Trophy3 from "../../assets/svg/kup_bih_trofej.svg"
import Trophy4 from "../../assets/svg/superkup_bih_trofej.svg"


gsap.registerPlugin(ScrollTrigger);

const TrophiesSection2 = () => {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);

    let xPercent = 0;
    const directionRef = useRef(1);

    useEffect(() => {
        //requestAnimationFrame(animation);

        gsap.to(slider.current, {
            x: "-=3000px",
            scrollTrigger : {
                trigger: slider.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                onUpdate: (self) => {
                    gsap.to(directionRef, {
                        value: self.direction * -1,
                        duration: 0.4,
                        ease: "power2.out",
                        overwrite: true
                    });
                }
            }
        })
    }, []);
    
    // const animation = () => {
    //     if(xPercent <= -100 )
    //     {
    //         xPercent = 0;
    //     }
    //     if(xPercent > 0)
    //     {
    //         xPercent = -100;
    //     }
    //     gsap.set(firstText.current, {xPercent: xPercent})
    //     gsap.set(secondText.current, {xPercent: xPercent})
    //     xPercent += 0.05 * direction;
    //     requestAnimationFrame(animation);
    // };

    
  return (
    <div id="trophies-section-container">
        <div id="trophies-text-image-container">
            <div id="trophies-fixed-text" ref={slider}>
                <p ref={firstText}>FK ŽELJEZNIČAR - FK ŽELJEZNIČAR - FK ŽELJEZNIČAR</p>
                {/* <p ref={secondText}>FK ŽELJEZNIČAR -</p> */}
            </div>
            <div id="trophies-text-container">
                <div id="trophies-trophy-container">
                    <div className='trophy-container'>
                        <img className="trophy" id="trophy1" src={Trophy1}></img>
                        <h3>PRVACI JUGOSLAVIJE</h3>
                        <h1>1</h1>
                    </div>
                    <div className='trophy-container' id="trophy2">
                        <img className="trophy" id="trophy2" src={Trophy2}></img>
                        <h3>PREMIJER LIGA BIH</h3>
                        <h1>6</h1>
                    </div>
                    <div className='trophy-container' id="trophy3">
                        <img className="trophy" id="trophy3" src={Trophy3}></img>
                        <h3>KUP BIH</h3>
                        <h1>6</h1>
                    </div>
                    <div className='trophy-container' id="trophy4">
                        <img className="trophy" id="trophy4" src={Trophy4}></img>
                        <h3>SUPER KUP BIH</h3>
                        <h1>3</h1>
                    </div>
                </div>
                <h1 id="trophies-text">NAJTROFEJNIJI KLUB <br/>U<br/>
                    <span className="larger"> HISTORIJI</span>
                </h1>
            </div>
            <div id="trophies-image-container">
                <img id="trophies-image" src={TrophyImage1}></img>
            </div>
        </div>
        <div id="trophies-article-container">
            <div className="article-text-container">
                <p>PROČITAJ VIŠE</p>
            </div>
            <div className="article-image-container">
                <img className="article-image"src={TrophyImage2}></img>
            </div>
            <div className="article-image-container">
                <img className="article-image" src={TrophyImage3}></img>
            </div>
            <div className="article-image-container">
                <img className="article-image" src={TrophyImage4}></img>
            </div>
        </div>

    </div>
  )
}

export default TrophiesSection2