import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./newsSection.css"

const newsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:7010/api/News")
    .then(res => res.json())
    .then(data => {
        const nonFeatured = data.filter(item => !item.isFeatured);
        const formattedNews = nonFeatured.map(item => 
        {
            const dateObj = new Date(item.publishedDate);
            const formattedDate = dateObj.toLocaleString("bs-BA", 
                {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric"
                }
            );
            return {
                ...item, formattedDate
            };
        }
        )
        setNews(formattedNews.slice(0, 3));
    })
    .catch(err => console.error("Greska prilikom dohvacanja!", err))
    .finally(() => setLoading(false))
  }, []);

  return (
    <div id="newsSection-container">
        <h1 id="news-text">VIJESTI</h1>

        <div id="news-container">
          {news.map((news, index) => ( 
            <Link key={news.id} to={`/novost/${news.slug}`} className={`news-item item-${index}`}>
                <img className={`news-image item-${index}`} src={`https://localhost:7010${news.thumbnailUrl}`}></img>
                <div className="text-overlay">
                    <h3 className="top-overlay">{news.category+ ": "}{news.formattedDate}</h3>
                    <h1>{news.title.toUpperCase()}</h1>
                    <h3 className="summary">{news.summary}</h3>
                </div>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default newsSection