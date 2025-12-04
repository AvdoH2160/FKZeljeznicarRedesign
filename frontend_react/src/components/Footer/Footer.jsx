import React from 'react'
import {useState, useRef, useEffect} from 'react'
import "./footer.css"
import ZeljoLogo from '../../assets/svg/zeljo_color_icon.svg'

const Footer = () => {
  return (
    <div id="footer-sponsor-container">
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
        </div>
      </div>
    </div>
  )
}

export default Footer