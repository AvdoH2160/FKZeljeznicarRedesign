import React,{useState, useRef, useEffect} from 'react'
import "./featuredNews.css"

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
                <div id="featuredNews-title">
                    {news.title}
                </div>
            </div>
        )}
    </div>
  )
}

export default FeaturedNews