import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "./shop.css"
import ShopFeatured from "./components/ShopFeatured/ShopFeatured"
import ShopHero from "./components/ShopHero/ShopHero"
import ShopImage from "../../assets/svg/fkz_shop.svg"
import ShopCategoryImage1 from "../../assets/images/shop-category1.png"
import ShopCategoryImage2 from "../../assets/images/shop-category2.png"

const Shop = () => {
  return (
    <div className='shop-page-container'>
        <ShopHero></ShopHero>
        <ShopFeatured></ShopFeatured>
        <div className='shop-page-limited-container'>
            <div className='shop-page-limited-text'>
                <img src={ShopImage}></img>
                <p>LIMITED</p>
                <p className='small'>SAZNAJ VISE</p>
            </div>
        </div>
        <div className='shop-page-categories-section'>
            <div className='shop-page-categories-container'>
                <div className='shop-page-categories-image-wrapper'>
                    <img src={ShopCategoryImage1}></img>
                    <div className='shop-page-categories-overlay'>
                        <p>TRENING KOLEKCIJA</p>
                        <div className='shop-button'>SHOP</div>
                    </div>
                </div>
                <div className='shop-page-categories-image-wrapper'>
                    <img src={ShopCategoryImage2}></img>
                    <div className='shop-page-categories-overlay'>
                        <p>LIFESTYLE KOLEKCIJA</p>
                        <div className='shop-button'>SHOP</div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='shop-page-gift'>
            <div className='shop-page-gift-text'>

            </div>
        </div> */}
    </div>
  )
}

export default Shop