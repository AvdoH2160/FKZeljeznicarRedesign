import React from 'react'
import {useState, useRef, useEffect} from 'react'
import "./footer.css"
import ZeljoLogo from '../../assets/svg/zeljo_color_icon.svg'
import GooglePlay from '../../assets/svg/google_play.svg'
import AppStore from '../../assets/svg/app_store.svg'
import SocialFacebook from '../../assets/svg/social_facebook.svg'
import SocialX from '../../assets/svg/social_x.svg'
import SocialInstagram from '../../assets/svg/social_instagram.svg'
import SocialTikTok from '../../assets/svg/social_tiktok.svg'
import SocialYoutube from '../../assets/svg/social_youtube.svg'
import SponsorTrack from '../SponsorTrack/SponsorTrack'

const Footer = () => {
  return (
    <div id="footer-sponsor-container">
      <SponsorTrack></SponsorTrack>
      <div id="footer-container">
        <div id="footer-image-wrapper"> 
          <img src={ZeljoLogo} id="footer-image"></img>
        </div>
        <div id="footer">
          <div id="footer-fixed-text">
            <h1 id="fixed-left">MI SMO <span className="colored">ŽELJINI</span></h1>
            <div></div>
            <h1 id="fixed-right">ŽELJO JE <span className="colored">NAŠ</span></h1>
          </div>
          <div id="footer-options">
            <div id="footer-options-menu">
              <div className="options">
                <p className='main'>KLUB</p>
                <p className='option'>O NAMA</p>
                <p className='option'>NAVIJAČI</p>
                <p className='option'>PRVI TIM</p>
                <p className='option'>HISTORIJA</p>
              </div>
              <div className="options">
                <p className='main'>USLUGE</p>
                <p className='option'>PROFIL</p>
                <p className='option'>ULAZNICE</p>
                <p className='option'>SHOP</p>
              </div>
              <div className="options">
                <p className='main'>NOVOSTI</p>
                <p className='option'>NAJAVE</p>
                <p className='option'>IZVJEŠTAJI</p>
                <p className='option'>FOTO GALERIJA</p>
              </div>
              <div className="options">
                <p className='main'>POMOČ</p>
                <p className='option'>ČLANSTVO</p>
                <p className='option'>PRESS</p>
                <p className='option'>KONTAKT</p>
              </div>
            </div>
            <div></div>
            <div id="footer-options-aboutus">
              <div id="aboutus-info">
                <div className="info">
                  <p className='option-light'>Fudbalski Klub Željezničar Sarajevo</p>
                  <p className='option-light'>Bulevar Ivice Osima 27</p>
                  <p className='option-light'>Sarajevo 71000</p>
                  <p className='option-light'>Bosna i Hercegovina</p>
                </div>
                <div className='info'>
                  <p className='option'><span className='option-light'>Kontakt:</span>info@fkzeljeznicar.ba</p>
                  <p className='option'><span className='option-light'>Ulaznice:</span> tickets@fkzeljeznicar.ba</p>
                  <p className='option'><span className='option-light'>Telefon:</span> +387 (0)33 660 133</p>
                  <p className='option'>+387 (0)33 660 133</p>
                </div>
              </div>
              <div className="aboutus-app">
                <p className='main'>PREUZMI APLIKACIJU</p>
                <div>
                  <img className="app-image" src={GooglePlay}></img>
                  <img className="app-image" src={AppStore}></img>
                </div>
              </div>
            </div>
          </div>
          <div id="footer-socials">
            <img className="social" src={SocialFacebook}></img>
            <img className="social" src={SocialX}></img>
            <img className="social" src={SocialInstagram}></img>
            <img className="social" src={SocialTikTok}></img>
            <img className="social" src={SocialYoutube}></img>
          </div>
          <div id="footer-copyright">
            <p className='option-elight'>© 1921 - 2025. FK Željezničar<br/><br/>
            Dokumenti, podaci i informacije objavljeni na domeni fkzeljeznicar.ba 
            se mogu koristiti samo za individualne potrebe korisnika, uz poštivanje 
            svih autorskih i vlasničkih prava te prava trećih osoba. FK Željezničar 
            polaže autorska prava na sve vlastite sadržaje (tekstualne, vizualne i 
            audio materijale, baze podataka i programski kod). Neovlašteno 
            korištenje bilo kojeg dijela domene fkzeljeznicar.ba smatra se kršenjem
             autorskih prava, i može rezultirati sudskim i drugim postupcima protiv 
             prekršitelja. Svi sadržaji objavljeni na domeni fkzeljeznicar.ba se 
             mogu prenositi uz obavezno navođenje izvora, autora i linka.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer