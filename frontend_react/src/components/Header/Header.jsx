import React,{useState, useRef, useEffect, useContext} from 'react'
import { Link, useLocation} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import Zeljo from "../../assets/svg/zeljo_white_icon.svg"
import ZeljoColor from "../../assets/svg/zeljo_color_icon.svg"
import ArrowDown from "../../assets/svg/arrow_down.svg"
import User from "../../assets/svg/user.svg"
import "./header.css"

const Header = ({isExpanded, setIsExpanded, backgroundHeader, setBackgroundHeader}) => {
   const {user, logout, isAuthenticated, loading} = useContext(AuthContext);
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const isHome = location.pathname === "/";


  const clickOnOptions = () => {
    setIsExpanded(prev => !prev);
  };

  useEffect(() => {
    if(!isHome)
    {
      setBackgroundHeader(true);
    }
    else
    {
      setBackgroundHeader(window.scrollY > 200);
    }
  }, [location.pathname]);

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
      
      if(isHome)
      {
        setBackgroundHeader(currentScrollY > 200);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

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

  if(loading) {
      return null;
  }

  return (
    <header className={`${showHeader ? "show" : "hide"}`} 
    id="header-container" 
    style={{
      height:isExpanded ? "450px" : "100px", 
      backgroundColor:backgroundHeader ? "#002C6D" : "transparent",
      }}
    >
      <div id="header-fixed"> 
          <Link to="/"id="logo-option">
            <img src={Zeljo} alt="logo"></img>
          </Link>
          <div className="header-options">
            <Link to="/novosti" className="dropdown header-option">
              VIJESTI
              <div className="dropdown-menu">
                <Link className="button" to="/novosti/novosti">NOVOSTI</Link>
                <Link className="button" to="/novosti/najave">NAJAVE</Link>
                <Link className="button" to="/novosti/izvještaji">IZVJEŠTAJI</Link>
                <Link className="button" to="/novosti/galerija">GALERIJA</Link>
              </div>
              <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
            </Link>
            <Link to="/prvi-tim" className="dropdown header-option">
              KLUB
              <div className="dropdown-menu">
                <Link className="button" to="/prvi-tim">PRVI TIM</Link>
                <Link className="button" to="/novosti/najave">HISTORIJA</Link>
                <Link className="button" to="/novosti/izvještaji">KONTAKT</Link>
              </div>
              <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
            </Link>
            <Link to="/novosti" className="dropdown header-option">
              ČLANSTVO
              <div className="dropdown-menu">
                <Link className="button" to="/prvi-tim">UČLANI SE</Link>
                <Link className="button" to="/novosti/najave">OBNOVA</Link>
                <Link className="button" to="/novosti/izvještaji">PROVJERI STATUS</Link>
              </div>
              <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
            </Link>
            <Link to="/novosti" className="no-dropdown header-option">
              SHOP
            </Link>
            <Link to="/novosti" className="no-dropdown header-option">
              ULAZNICE
            </Link>
          </div>
          {!isAuthenticated ? (
              <Link to="/prijava" className="no-dropdown user-option">
                <img src={User} alt="" className='user-icon'></img>
                PRIJAVI SE
              </Link>
              ) : (
              <Link to="/profil" className="dropdown user-option">
                <img src={User} alt="" className='user-icon'></img>
                <span id="username">
                  {user?.username?.toUpperCase()}
                </span>
                <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
                <div className="dropdown-menu">
                  <div className="button" onClick={logout}>ODJAVA</div>
                </div>
              </Link>
            )}
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