import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import './newsList.css'

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://localhost:7010/api/News/page?page=${page}&pageSize=12`)
        .then(res => {
          if (!res.ok) throw new Error("Fetch error");
          return res.json();
        })
        .then(data => {
            setTotalPages(data.totalPages);
            const formattedNews = data.items.map(item => 
            {
                const dateObj = new Date(item.publishedDate);
                const formattedDate = dateObj.toLocaleString("bs-BA", 
                    {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    }
                );
                return {
                    ...item, formattedDate
                };
            }
            )
            setNews(formattedNews);
            console.log(formattedNews)
        })
        .catch(err => console.error("Greska prilikom dohvacanja!", err))
  }, [page]);

  return (
    <div id="news-list-container">
        <div id="news-list-header">
            <h1 className="news-list-header-text">NOVOSTI</h1>
            <div className="news-list-header-options">
              <p className="news-list-header-option">
                SVE NOVOSTI
              </p>
              <p className="news-list-header-option">
                NAJAVE
              </p>
              <p className="news-list-header-option">
                IZVJEŠTAJI
              </p>
              <p className="news-list-header-option">
                GALERIJA
              </p>
            </div>
        </div>
        <div className="news-list">
          {news.map(n => (
            <Link key={n.id} to={`/novost/${n.slug}`} className="news-list-item">
              <div className="news-list-image-wrapper">
                <img className="news-list-image" src={`https://localhost:7010${n.thumbnailUrl}`}></img>
              </div>
              <p className='news-list-category'>{n.category+ ": "}{n.formattedDate}</p>
              <p className='news-list-title'>{n.title}</p>
            </Link>
          ))}
        </div>
        <div className="pagination">
          <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}>
              ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
              <button
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => setPage(i + 1)}
              >
                  {i + 1}
              </button>
          ))}

          <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}>
              ›
          </button>
        </div>
    </div>
  )
}

export default NewsList