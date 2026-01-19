import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Pagination from "../../components/Pagination/Pagination.jsx"
import './newsList.css'

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { category } = useParams();

  const isActive = (value) =>
  {
    return (category ?? "sve") === value;
  }

  useEffect(() => {
    const url = new URL("https://localhost:7010/api/News/page")
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", 12);

    if(category) {
      url.searchParams.append("category", category);
    }
    document.title= category ? `${category.charAt(0).toUpperCase() + category.slice(1)} - Fk Željezničar` : "Vijesti - Fk Željezničar";
    fetch(url)
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
  }, [page, category]);

  useEffect(() => {
    setPage(1);
  }, [category]);
  return (
    <div id="news-list-container">
        <div id="news-list-header">
            <h1 className="news-list-header-text">VIJESTI</h1>
            <div className="news-list-header-options">
              <Link 
                className={`news-list-header-option ${isActive("sve") ? "active" : ""}`} 
                to="/novosti"
              >
                SVE VIJESTI
              </Link>
               <Link 
                className={`news-list-header-option ${isActive("novosti") ? "active" : ""}`} 
                to="/novosti/novosti"
              >
                NOVOSTI
              </Link>
              <Link 
                className={`news-list-header-option ${isActive("najave") ? "active" : ""}`}
                to="/novosti/najave"
              >
                NAJAVE
              </Link>
              <Link 
                className={`news-list-header-option ${isActive("izvještaji") ? "active" : ""}`}
                to="/novosti/izvještaji"
              >
                IZVJEŠTAJI
              </Link>
              <Link 
                className={`news-list-header-option ${isActive("galerija") ? "active" : ""}`}
                to="/novosti/galerija"
              >
                GALERIJA
              </Link>
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
        <Pagination
          setPage={setPage} 
          page={page} 
          totalPages={totalPages}
        ></Pagination>
    </div>
  )
}

export default NewsList