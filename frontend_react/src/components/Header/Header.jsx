import React,{useState, useRef} from 'react'
import Zeljo from "../../assets/svg/zeljo.svg"
import "./header.css"

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header id="header-container" className="collapsed" style={{height:isExpanded ? "500px" : "100px"}}> 
        <div id="logo-option">
            <img src={Zeljo} alt="logo"></img>
        </div>
        <div id="news-option">
          Novosti
        </div>
    </header>
  )
}

export default Header