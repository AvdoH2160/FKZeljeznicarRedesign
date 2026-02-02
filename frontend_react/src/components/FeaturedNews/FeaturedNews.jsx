import React,{useState, useRef, useEffect} from 'react'
import api from "../../services/api"
import { Link } from 'react-router-dom'
import "./featuredNews.css"
import GamesTrack from '../GamesTrack/GamesTrack'
import ArrowRight from "../../assets/svg/arrow_right.svg"
import MembershipCard from '../Membership/MembershipCard'

const FeaturedNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await api.get("/News/featured");
        setNews(res.data);
      }
      catch(err) {
        console.error("Greška prilikom dohvata istaknute novosti:", err);
      }
      finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  return (
    <div id="featuredNews-container">
        {loading && <p>Loading...</p>}
        {news && (
            <div id="featuredNewsImage-container">
                <img src={`https://localhost:7010${news.thumbnailUrl}`} alt={news.title} id="featuredNews-image"/>
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
        </div>
    </div>
  )
}

export default FeaturedNews