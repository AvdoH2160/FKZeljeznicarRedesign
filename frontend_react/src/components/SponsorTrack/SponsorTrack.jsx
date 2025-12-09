import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import "./sponsorTrack.css"
import gsap from 'gsap'
import Wwin from "../../assets/svg/sponsor_wwin.svg"
import Opcina from "../../assets/svg/sponsor_opcina.svg"
import Garden from "../../assets/svg/sponsor_garden.svg"
import Admiral from "../../assets/svg/sponsor_admiral.svg"
import Bhtelekom from "../../assets/svg/sponsor_bhtelekom.svg"
import Klix from "../../assets/svg/sponsor_klix.svg"
import Penny from "../../assets/svg/sponsor_penny.svg"
import Asabanka from "../../assets/svg/sponsor_asabanka.svg"
import Amko from "../../assets/svg/sponsor_amko.svg"
import S1 from "../../assets/svg/sponsor_s1.svg"

const SponsorTrack = () => {
  useEffect(() => {
  const tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: "none" }
  });

  tl.to(".sponsor-track", {
    xPercent: -100,
    duration: 20
  });

  return () => tl.kill();
}, []);


  return (
    <div id="sponsor-track-container">
        <div className="sponsor-track">
            <img src={Wwin}></img>
            <img src={Opcina}></img>
            <img src={Garden}></img>
            <img src={Admiral}></img>
            <img src={Bhtelekom}></img>
            <img src={Klix}></img>
            <img src={Penny}></img>
            <img src={Asabanka}></img>
            <img src={Amko}></img>
            <img src={S1}></img>
        </div>
        <div className="sponsor-track">
            <img src={Wwin}></img>
            <img src={Opcina}></img>
            <img src={Garden}></img>
            <img src={Admiral}></img>
            <img src={Bhtelekom}></img>
            <img src={Klix}></img>
            <img src={Penny}></img>
            <img src={Asabanka}></img>
            <img src={Amko}></img>
            <img src={S1}></img>
        </div>
    </div>
  )
}

export default SponsorTrack