import React,{useState, useRef, useEffect, useContext} from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import Zeljo from "../../assets/svg/zeljo_white_icon.svg"
import ZeljoColor from "../../assets/svg/zeljo_color_icon.svg"
import ArrowDown from "../../assets/svg/arrow_down.svg"
import FloatingCart from "../../pages/Shop/components/FloatingCart/FloatingCart.jsx"
import User from "../../assets/svg/user.svg"
import "./header.css"

const Header = ({isExpanded, setIsExpanded, backgroundHeader, setBackgroundHeader}) => {
   const {user, logout, isAuthenticated, loading} = useContext(AuthContext);
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  const isHome = 
    location.pathname === "/" ||
    location.pathname.startsWith("/prvi-tim/") ||
    location.pathname === "/profil" ||
    location.pathname === "/stadion-grbavica";

  const scrollToBottom = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      navigate("/", { state: { scrollToBottom: true } });
    }
  };

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
            <div className="dropdown header-option">
              <Link to="/novosti">
              VIJESTI
              </Link>
              <div className="dropdown-menu">
                <Link className="button" to="/novosti/novosti">NOVOSTI</Link>
                <Link className="button" to="/novosti/najave">NAJAVE</Link>
                <Link className="button" to="/novosti/izvještaji">IZVJEŠTAJI</Link>
                <Link className="button" to="/novosti/galerija">GALERIJA</Link>
              </div>
              <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
            </div>
            <div className="dropdown header-option">
              <Link to="/opste-informacije">
              KLUB
              </Link>
              <div className="dropdown-menu">
                <Link className="button" to="/prvi-tim">PRVI TIM</Link>
                <Link className="button" to="/stadion-grbavica">STADION GRBAVICA</Link>
                <Link className="button" to="/historija">HISTORIJA</Link>
                <p onClick={scrollToBottom} className="button" to="/novosti/izvještaji">KONTAKT</p>
              </div>
              <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
            </div>
            <div className="dropdown header-option">
              <Link to="/clanstvo">
                ČLANSTVO
              </Link>
              <div className="dropdown-menu">
                <Link className="button" to="/clanstvo/uclani-se">UČLANI SE</Link>
                <Link className="button" to="/clanstvo/obnova">OBNOVA</Link>
                <Link className="button" to="/clanstvo/provjeri">PROVJERI STATUS</Link>
              </div>
              <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
            </div>
            <Link to="/shop" className="no-dropdown header-option">
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
      {location.pathname.startsWith("/shop") && <FloatingCart></FloatingCart>}
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