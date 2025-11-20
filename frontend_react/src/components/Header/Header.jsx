import React,{useState, useRef} from 'react'
import Zeljo from "../../assets/svg/zeljo_white_icon.svg"
import ArrowDown from "../../assets/svg/arrow_down.svg"
import User from "../../assets/svg/user.svg"
import "./header.css"

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header id="header-container" style={{height:isExpanded ? "500px" : "100px"}}> 
        <div id="logo-option">
            <img src={Zeljo} alt="logo"></img>
        </div>
        <div className="header-options">
          <div id="news-option" className="header-option">
            Novosti
            <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
          </div>
          <div id="shop-option" className="header-option">
            Shop
            <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
          </div>
          <div id="tickets-option" className="header-option">
            Ulaznice
            <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
          </div>
          <div id="member-option" className="header-option">
            Članstvo
            <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
          </div>
          <div id="about-option" className="header-option">
            O nama
            <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
          </div>
        </div>
        <div id="user-option">
          <img src={User} alt="" className='user-icon'></img>
        </div>
        <div id="sign-in-text">
          Prijavi se
        </div>
    </header>
  )
}

export default Header