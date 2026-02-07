import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import api from "../../services/api"
import Pagination from "../../components/Pagination/Pagination.jsx"
import './NewsList.css'
import { getImageUrl } from "../../services/imageService";

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
    const url = new URL("https://localhost:7010/api/News/page");
    url.searchParams.append("page", page);
    url.searchParams.append("pageSize", 12);

    if (category) {
      url.searchParams.append("category", category);
    }

    document.title = category
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} - FK Željezničar`
      : "Vijesti - FK Željezničar";

    // const load = async () => {
    //   try {
    //     const res = await api.get(url);
    //     const { items, totalPages } = res.data;

    //     const formatted = items.map(g => {
    //       const iso = g.publishedDate.includes("T")
    //         ? g.publishedDate
    //         : g.publishedDate.replace(" ", "T");
    //       const date = new Date(iso);
    //       const day = String(date.getDate()).padStart(2, "0");
    //       const month = String(date.getMonth() + 1).padStart(2, "0");
    //       const year = date.getFullYear();
    //       const hour = String(date.getHours()).padStart(2, "0");
    //       const minute = String(date.getMinutes()).padStart(2, "0");

    //       return {
    //         ...g,
    //         formattedDate: `${day}.${month}.${year} ${hour}:${minute}`,
    //       };
    //     });

    //     setTotalPages(totalPages);
    //     setNews(formatted); 
    //   } catch (err) {
    //     console.error("Greška prilikom dohvatanja vijesti:", err);
    //   }
    // };
    const load = async () => {
      try {
        const res = await api.get("/News/page", {
          params: {
            page,
            pageSize: 12,
            ...(category && { category }),
          },
        });

        const { items, totalPages } = res.data;

        const formatted = items.map(g => {
          const iso = g.publishedDate.includes("T")
            ? g.publishedDate
            : g.publishedDate.replace(" ", "T");
          const date = new Date(iso);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hour = String(date.getHours()).padStart(2, "0");
          const minute = String(date.getMinutes()).padStart(2, "0");

          return {
            ...g,
            formattedDate: `${day}.${month}.${year} ${hour}:${minute}`,
          };
        });

        setTotalPages(totalPages);
        setNews(formatted);
      } catch (err) {
        console.error("Greška prilikom dohvatanja vijesti:", err);
      }
    };

    load();
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
                <img className="news-list-image" src={getImageUrl(n.thumbnailUrl)}></img>
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