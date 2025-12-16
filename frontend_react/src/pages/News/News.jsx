import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import "./news.css"
import RelatedContent from '../../components/RelatedContent/RelatedContent.jsx'

const News = () => {
  const {slug} = useParams();
  const [news, setNews] = useState(null);

  useEffect (() => {
    fetch(`https://localhost:7010/api/News/slug/${slug}`)
      .then(res => res.json())
      .then(data => {
        const dateObj = new Date(data.publishedDate)
        const formattedDate = dateObj.toLocaleString("bs-BA", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })

        const formattedNews = {
          ...data,
          formattedDate
        }
          setNews(formattedNews);
          console.log(formattedNews)
        })
      .catch(err => console.error("Greska prilikom dohvacanja!", err))
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