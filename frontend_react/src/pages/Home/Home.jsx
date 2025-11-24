import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import "./home.css"
import FeaturedNews from "../../components/FeaturedNews/FeaturedNews.jsx"
import NewsSection from "../../components/NewsSection/newsSection.jsx"

const Home = ({isHeaderExpanded}) => {  
  return (
    <div id="home-container" className={isHeaderExpanded ? "blurred" : ""}>
      <FeaturedNews></FeaturedNews>
      <NewsSection></NewsSection>
    </div>
  )
}

export default Home