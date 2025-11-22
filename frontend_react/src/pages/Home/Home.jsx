import React, { useEffect } from 'react'
import {useState, useRef} from 'react'
import "./home.css"
import FeaturedNews from "../../components/FeaturedNews/FeaturedNews.jsx"

const Home = () => {
  

  return (
    <div id="home-container">
      <FeaturedNews></FeaturedNews>
    </div>
  )
}

export default Home