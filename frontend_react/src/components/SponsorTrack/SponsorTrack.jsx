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

const logos = [
  { src: Wwin, url: "https://wwin.com/" },
  { src: Opcina, url: "https://www.centar.ba/" },
  { src: Garden, url: "https://gardencity.ba/" },
  { src: Admiral, url: "https://www.admiral.com/" },
  { src: Bhtelekom, url: "https://www.bhtelecom.ba/" },
  { src: Klix, url: "https://www.klix.ba/" },
  { src: Penny, url: "https://pennyshop.ba/" },
  { src: Asabanka, url: "https://www.asabanka.ba/" },
  { src: Amko, url: "https://www.amko.ba/" },
  { src: S1, url: "https://www.oslobodjenje.ba/sport/" }
];

const SponsorTrack = () => {

  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const containerWidth = track.parentElement.offsetWidth;

    let trackWidth = track.scrollWidth;

    while (trackWidth < containerWidth * 2) {
      track.innerHTML += track.innerHTML;
      trackWidth = track.scrollWidth;
    }

    gsap.to(track, {
      x: -track.scrollWidth / 2,
      duration: 20,
      ease: "none",
      repeat: -1
    });
  }, []);

  return (
    <div id="sponsor-track-container">
      <div className="sponsor-track" ref={trackRef}>
        {logos.map((logo, i) => (
          <Link key={i} to={logo.url}>
            <img src={logo.src} alt="sponsor" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SponsorTrack