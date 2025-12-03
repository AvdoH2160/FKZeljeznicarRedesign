import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import "./home.css"
import FeaturedNews from "../../components/FeaturedNews/FeaturedNews.jsx"
import NewsSection from "../../components/NewsSection/newsSection.jsx"
import TableSection from '../../components/TableSection/TableSection.jsx'
import ShopSection from '../../components/ShopSection/shopSection.jsx'
import TrophiesSection from '../../components/TrophiesSection/TrophiesSection.jsx'
import StadiumSection from "../../components/StadiumSection/StadiumSection.jsx"

const Home = ({isHeaderExpanded}) => {  
  return (
    <div id="home-container" className={isHeaderExpanded ? "blurred" : ""}>
      <FeaturedNews></FeaturedNews>
      <NewsSection></NewsSection>
      <TableSection></TableSection>
      <ShopSection></ShopSection>
      <TrophiesSection></TrophiesSection>
      <StadiumSection></StadiumSection>
    </div>
  )
}

export default Home