import React,{useState, useRef, useEffect} from 'react'
import Zeljo from "../../assets/svg/zeljo_white_icon.svg"
import ZeljoColor from "../../assets/svg/zeljo_color_icon.svg"
import ArrowDown from "../../assets/svg/arrow_down.svg"
import User from "../../assets/svg/user.svg"
import "./header.css"

const Header = ({isExpanded, setIsExpanded, backgroundHeader, setBackgroundHeader}) => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const clickOnOptions = () => {
    setIsExpanded(!isExpanded);
    const currentScrollY = window.scrollY;
    if(currentScrollY < 200)
    {
      setBackgroundHeader(!backgroundHeader);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if(currentScrollY > lastScrollY.current && currentScrollY > 200)
      {
        setShowHeader(false);
      }
      else
      {
        setShowHeader(true);
      }
      if(currentScrollY > 200)
      {
        setBackgroundHeader(true);
      }
      else
      {
        setBackgroundHeader(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    if (isExpanded) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      document.body.classList.add("no-scrollbar");
    } else {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.body.classList.remove("no-scrollbar");
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isExpanded]);

  return (
    <header className={`${showHeader ? "show" : "hide"}`} 
    id="header-container" 
    style={{
      height:isExpanded ? "450px" : "100px", 
      backgroundColor:backgroundHeader ? "#002C6D" : "transparent",
      }}
    >
      <div id="header-fixed"> 
          <div id="logo-option">
              <img src={Zeljo} alt="logo"></img>
          </div>
          <div className="header-options">
            <div id="news-option" className="header-option" onClick={clickOnOptions}>
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
      </div>
      {isExpanded && (
        <div id="dropdown-container">
          <div className="dropdown-left">
            <h1>ZA<br/>ŽIVOT<br/><div id="colored-text">CIJELI</div></h1>
          </div>
          <div id="dropdown-news" className="dropdown-items">
            <h2>NOVOSTI</h2>
            <br/>
            <div className="dropdown-childItems">
              <h3>NAJAVE</h3>
              <h3>IZVJEŠTAJI</h3>
            </div>
          </div>
          <div id="dropdown-shop" className="dropdown-items">
            <h2>SHOP</h2>
            <br/>
            <div className="dropdown-childItems">
              <h3>DRESOVI</h3>
              <h3>AKCESOARI</h3>
              <h3>ODJEČA</h3>
            </div>
          </div>
          <div id="dropdown-tickets" className="dropdown-items">
            <h2>ULAZNICE</h2>
            <br/>
            <div className="dropdown-childItems">
              <h3>KUPI ULAZNICE</h3>
            </div>
          </div>
          <div id="dropdown-membership" className="dropdown-items">
            <h2>ČLANSTVO</h2>
            <br/>
            <div className="dropdown-childItems">
              <h3>KAKO POSTATI ČLAN</h3>
              <h3>OBNOVA ČLANARINE</h3>
              <h3>PROVJERA STATUSA ČLANARINE</h3>
            </div>
          </div>
          <div id="dropdown-aboutus" className="dropdown-items">
            <h2>O NAMA</h2>
            <br/>
            <div className="dropdown-childItems">
              <h3>PRVI TIM</h3>
              <h3>STRUČNI ŠTAB</h3>
              <h3>STADION GRBAVICA</h3>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header