import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import "./home.css"
import FeaturedNews from "../../components/FeaturedNews/FeaturedNews.jsx"
import NewsSection from "../../components/NewsSection/newsSection.jsx"
import TableSection from '../../components/TableSection/TableSection.jsx'
import ShopSection from '../../components/ShopSection/shopSection.jsx'
import TrophiesSection2 from '../../components/TrophiesSection/TrophiesSection2.jsx'
import StadiumSection from "../../components/StadiumSection/StadiumSection.jsx"

const Home = () => {  
  document.title="FK Željezničar"

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToBottom) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [location]);
  return (
    <div id="home-container">
      <FeaturedNews></FeaturedNews>
      <NewsSection></NewsSection>
      <TableSection></TableSection>
      <ShopSection></ShopSection>
      <TrophiesSection2></TrophiesSection2>
      <StadiumSection></StadiumSection>
    </div>
  )
}

export default Home