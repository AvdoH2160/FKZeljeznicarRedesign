import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
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
          <Link to="https://wwin.com/"><img src={Wwin}></img></Link>
          <Link to="https://www.centar.ba/"><img src={Opcina}></img></Link>
          <Link to="https://gardencity.ba/"><img src={Garden}></img></Link>
          <Link to="https://www.admiral.com/"><img src={Admiral}></img></Link>
          <Link to="https://www.bhtelecom.ba/"><img src={Bhtelekom}></img></Link>
          <Link to="https://www.klix.ba/"><img src={Klix}></img></Link>
          <Link to="https://pennyshop.ba/"><img src={Penny}></img></Link>
          <Link to="https://www.asabanka.ba/"><img src={Asabanka}></img></Link>
          <Link to="https://www.amko.ba/"><img src={Amko}></img></Link>
          <Link to="https://www.oslobodjenje.ba/sport/"><img src={S1}></img></Link>
        </div>
        <div className="sponsor-track">
          <Link to="https://wwin.com/"><img src={Wwin}></img></Link>
          <Link to="https://www.centar.ba/"><img src={Opcina}></img></Link>
          <Link to="https://gardencity.ba/"><img src={Garden}></img></Link>
          <Link to="https://www.admiral.com/"><img src={Admiral}></img></Link>
          <Link to="https://www.bhtelecom.ba/"><img src={Bhtelekom}></img></Link>
          <Link to="https://www.klix.ba/"><img src={Klix}></img></Link>
          <Link to="https://pennyshop.ba/"><img src={Penny}></img></Link>
          <Link to="https://www.asabanka.ba/"><img src={Asabanka}></img></Link>
          <Link to="https://www.amko.ba/"><img src={Amko}></img></Link>
          <Link to="https://www.oslobodjenje.ba/sport/"><img src={S1}></img></Link>
        </div>
    </div>
  )
}

export default SponsorTrack