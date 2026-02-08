import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "./shop.css"
import ShopFeatured from "./components/ShopFeatured/ShopFeatured"
import ShopHero from "./components/ShopHero/ShopHero"
import ShopImage from "../../assets/svg/fkz_shop.svg"
// import ShopCategoryImage1 from "../../assets/images/shop-category1.png"
// import ShopCategoryImage2 from "../../assets/images/shop-category2.png"
import Arrow from "../../assets/svg/arrow_right.svg"

const Shop = () => {
    useEffect(() => {
        document.title = "Shop - FK Željezničar";
    }, []);
  return (
    <div className='shop-page-container'>
        <ShopHero></ShopHero>
        <ShopFeatured></ShopFeatured>
        <div className='shop-page-limited-container'>
            <div className='shop-page-limited-text'>
                <img src={ShopImage} className='shop-page-limited-text-item'></img>
                <p>LIMITED</p>
                <Link to="proizvodi?category=Akcija" className='small shop-page-limited-text-item'>
                    <p className='small'>SAZNAJ VISE</p>
                    <img src={Arrow}></img><img src={Arrow}></img>
                </Link>
            </div>
        </div>
        <div className='shop-page-categories-section'>
            <div className='shop-page-categories-container'>
                <div className='shop-page-categories-image-wrapper'>
                    <img src={"/assets/images/shop-category1.png"}></img>
                    <div className='shop-page-categories-overlay'>
                        <p>TRENING KOLEKCIJA</p>
                        <Link to="proizvodi?category=Trening"><div className='shop-button'>SHOP</div></Link>
                    </div>
                </div>
                <div className='shop-page-categories-image-wrapper'>
                    <img src={"/assets/images/shop-category2.png"}></img>
                    <div className='shop-page-categories-overlay'>
                        <p>LIFESTYLE KOLEKCIJA</p>
                        <Link to="proizvodi?category=Odjeća"><div className='shop-button'>SHOP</div></Link>
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