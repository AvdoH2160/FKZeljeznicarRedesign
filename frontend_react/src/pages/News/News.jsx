import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import "./news.css"
import api from "../../services/api"
import RelatedContent from '../../components/RelatedContent/RelatedContent.jsx'

const News = () => {
  const {slug} = useParams();
  const [news, setNews] = useState(null);

  useEffect (() => {
      const load = async () => {
      try {
        const res = await api.get(`/News/slug/${slug}`);

        const data = res.data;

        const iso = data.publishedDate.includes("T")
            ? data.publishedDate
            : data.publishedDate.replace(" ", "T");

        const date = new Date(iso);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        setNews({
          ...data,
          formattedDate: `${day}.${month}.${year}`
        });
      }
      catch(err) {
        console.error("Greska prilikom dohvacanja!", err);
      }
    }

    load();
  }, [slug])


  if (!news) {
    return <div>Loading...</div>
  }
  document.title= news.title;
  return (
    <div id='onlyNews-container'>
      <div id="onlyNews-header">
        <div id="onlyNews-image-wrapper">
        <img 
          className="onlyNews-image" 
          src={`https://localhost:7010${news.thumbnailUrl}`}
        ></img>
        </div>
        <div id="onlyNews-title-wrapper">
          <p className='onlyNews-title'>{news.title}</p>
          <div className="onlyNews-category-date">
            <p>{news.category}</p>
            <p>{news.formattedDate}</p>
          </div>
        </div> 
      </div>
      <div id="onlyNews-content-container">
        <div id="onlyNews-summary">
          {news.summary}
        </div>
        <div id="onlyNews-content">
          {news.content}
        </div>
      </div>
      <RelatedContent
        type="news"
        currentId={news.id}
        publishedDate={news.publishedDate}
      ></RelatedContent>
    </div>
  )
}

export default News