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

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    if (window.innerWidth < 850 && isExpanded)
      setActiveDropdown(prev => prev === menuName ? null : menuName);
  };

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
    if(isExpanded && window.scrollY <= 200 && isHome)
      setBackgroundHeader(false);
    if(!isExpanded && isHome && window.scrollY <= 200)
      setBackgroundHeader(true);
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
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850 && isExpanded) {
        setIsExpanded(false);
        setActiveDropdown(null);
        if(isHome)
          setBackgroundHeader(window.scrollY > 200);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isExpanded, setIsExpanded, setBackgroundHeader]);

  if(loading) {
      return null;
  }

  return (
    <header className={`${showHeader ? "show" : "hide"}`} 
    id="header-container" 
    style={{
      height:isExpanded ? "100vh" : "100px", 
      backgroundColor:backgroundHeader ? "#002C6D" : "transparent",
      }}
    >
      <div id="header-fixed"> 
          <Link to="/"id="logo-option" onClick={() => setIsExpanded(false)}>
            <img src={Zeljo} alt="logo"></img>
          </Link>
          <div className={`header-options` + (isExpanded ? " mobile-open" : "")}>
            <div className={`dropdown header-option ${activeDropdown === 'vijesti' ? 'open' : ''}`}>
              <div className='option-arrow'>
                <div onClick={() => toggleDropdown('vijesti')}>
                  VIJESTI
                </div>
                <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
              </div>
              <div className="dropdown-menu">
                <Link className="button" to="/novosti" onClick={() => setIsExpanded(false)}>SVE VIJESTI</Link>
                <Link className="button" to="/novosti/novosti" onClick={() => setIsExpanded(false)}>NOVOSTI</Link>
                <Link className="button" to="/novosti/najave" onClick={() => setIsExpanded(false)}>NAJAVE</Link>
                <Link className="button" to="/novosti/izvještaji" onClick={() => setIsExpanded(false)}>IZVJEŠTAJI</Link>
                <Link className="button" to="/novosti/galerija" onClick={() => setIsExpanded(false)}>GALERIJA</Link>
              </div>
            </div>
            <div className={`dropdown header-option ${activeDropdown === 'klub' ? 'open' : ''}`}>
              <div className='option-arrow'>
                <div onClick={() => toggleDropdown('klub')}>
                  KLUB
                </div>
                <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
              </div>
              <div className="dropdown-menu">
                <Link className="button" to="/opste-informacije" onClick={() => setIsExpanded(false)}>O NAMA</Link>
                <Link className='button' to ="/utakmice" onClick={() => setIsExpanded(false)}>UTAKMICE</Link>
                <Link className="button" to="/prvi-tim" onClick={() => setIsExpanded(false)}>PRVI TIM</Link>
                <Link className="button" to="/stadion-grbavica" onClick={() => setIsExpanded(false)}>STADION GRBAVICA</Link>
                <Link className="button" to="/historija" onClick={() => setIsExpanded(false)}>HISTORIJA</Link>
                <p className="button" to="/novosti/izvještaji" onClick={() => {setIsExpanded(false); scrollToBottom()}}>KONTAKT</p>
              </div>
            </div>
            <div className={`dropdown header-option ${activeDropdown === 'clanstvo' ? 'open' : ''}`}>
              <div className='option-arrow'>
                <div onClick={() => toggleDropdown('clanstvo')}>
                  ČLANSTVO
                </div>
                <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
              </div>
              <div className="dropdown-menu">
                <Link className="button" to="/clanstvo/uclani-se" onClick={() => setIsExpanded(false)}>UČLANI SE</Link>
                <Link className="button" to="/clanstvo/obnova" onClick={() => setIsExpanded(false)}>OBNOVA</Link>
                <Link className="button" to="/clanstvo/provjeri" onClick={() => setIsExpanded(false)}>PROVJERI STATUS</Link>
              </div>
            </div>
            <Link to="/shop" className="no-dropdown header-option" onClick={() => setIsExpanded(false)}>
              SHOP
            </Link>
            <Link to="/utakmice" className="no-dropdown header-option" onClick={() => setIsExpanded(false)}>
              ULAZNICE
            </Link>
          </div>
          {!isAuthenticated ? (
            <Link to="/prijava" className="no-dropdown user-option" onClick={() => setIsExpanded(false)}>
              <img src={User} alt="" className='user-icon'></img>
              PRIJAVI SE
            </Link>
            ) : (
            <div className={`dropdown user-option ${activeDropdown === 'korisnik' ? 'open' : ''}`}>
              <div className='option-arrow'>
                <img src={User} alt="" className='user-icon'></img>
                <div onClick={() => toggleDropdown('korisnik')}>
                  {user?.username?.toUpperCase()}
                </div>
                <img src={ArrowDown} alt="ˇ" className='arrow-down'></img>
              </div>
              <div className="dropdown-menu">
                <Link className="button" to="/profil" onClick={() => setIsExpanded(false)}>PROFIL</Link>
                <div className="button" onClick={logout}>ODJAVA</div>
              </div>
            </div>
          )}
          <div className='dropdown-menu-controls-container' onClick={clickOnOptions}> 
            <div className={`upper-control ${isExpanded ? 'rotated' : ''}`}>

            </div>
            <div className={`middle-control ${isExpanded ? 'rotated' : ''}`}>

            </div>
            <div className={`lower-control ${isExpanded ? 'rotated' : ''}`}>

            </div>
          </div>
      </div>
      {location.pathname.startsWith("/shop") && <FloatingCart></FloatingCart>}
    </header>
  )
}

export default Header