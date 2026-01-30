import React,{useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./featuredNews.css"
import GamesTrack from '../GamesTrack/GamesTrack'
import ArrowRight from "../../assets/svg/arrow_right.svg"
import MembershipCard from '../Membership/MembershipCard'

const FeaturedNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:7010/api/News/featured")
    .then(res => res.json())
    .then(data => {console.log(data); setNews(data);})
    .catch(err => console.error("Error pilikom dohvacanja istaknute novosti:", err))
    .finally(() => setLoading(false))
  }, []);

  return (
    <div id="featuredNews-container">
        {loading && <p>Loading...</p>}
        {news && (
            <div id="featuredNewsImage-container">
                <img src={`https://localhost:7010${news.thumbnailUrl}`} alt={news.title} id="featuredNews-image"/>
                {/* <Link to={`/novost/${news.slug}`} className="featuredNews-link">
                  <div className="featuredNews-title">
                    <h1>{news.title}</h1>
                    <h2>
                      PROCITAJ VISE
                      <img className="arrowRight-container" src={ArrowRight} alt="" />
                      <img src={ArrowRight} alt="" />
                    </h2>
                  </div>
                </Link> */}
            </div>
        )}
        <div id="games-membership-text-container">
          {news && (
            <Link to={`/novost/${news.slug}`} className="featuredNews-link">
              <div className="featuredNews-title">
                <h1>{news.title}</h1>
                <h2>
                  PROCITAJ VISE
                  <img className="arrowRight-container" src={ArrowRight} alt="" />
                  <img src={ArrowRight} alt="" />
                </h2>
              </div>
            </Link>
          )}
          <Link to="/utakmice" className='games-link'>UTAKMICE</Link>
          <div id="games-membership-container">
            <GamesTrack></GamesTrack>
            <div className="next-game-slot">
              <GamesTrack showOnlyActive />
            </div>
            <MembershipCard></MembershipCard>
          </div>
          {/* <GamesTrack></GamesTrack>
          <div className="next-game-slot">
            <GamesTrack showOnlyActive />
          </div>
          <MembershipCard></MembershipCard> */}
        </div>
    </div>
  )
}

export default FeaturedNews