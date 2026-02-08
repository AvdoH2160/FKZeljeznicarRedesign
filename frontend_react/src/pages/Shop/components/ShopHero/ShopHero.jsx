import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import Arrow from "../../../../assets/svg/arrow_right.svg"
// import HeroImage1 from "../../../../assets/images/shop-hero-image1.png"
// import HeroImage2 from "../../../../assets/images/shop-hero-image2.png"
import HeroImage1 from "/assets/images/shop-hero-image1.png"
import HeroImage2 from "/assets/images/shop-hero-image2.png"
import "./shopHero.css"

const ShopHero = () => {
    const images = [HeroImage1, HeroImage2];
        const [index, setIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);
  return (
    <div className='shop-page-hero'>
        <div className='shop-page-hero-categories'>
            <Link to="proizvodi" className='category'>Sve</Link>
            <Link to="proizvodi?category=Dresovi" className='category'>Dresovi</Link>
            <Link to="proizvodi?category=Odjeća" className='category'>Odjeća</Link>
            <Link to="proizvodi?category=Trening" className='category'>Trening</Link>
            <Link to="proizvodi?category=Asesoari" className='category'>Asesoari</Link>
            {/* <Link to="proizvodi?category=Poklon bon" className='category'>Poklon bon</Link> */}
            <Link to="proizvodi?category=Akcija" className='category'>Akcija</Link>
        </div>
        <div className='shop-page-hero-image'>
            {images.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    className={i === index ? "hero-image active" : "hero-image"}
                />
            ))}
            <div className='shop-page-hero-image-overlay'>
                <p>OŽIVITE EVROPSKI SAN</p>
                <p className='small'>Retro dresovi <span>1984/1985!</span></p>
            </div>
            <div className='shop-page-hero-image-overlay2'>
                <Link to="/shop/proizvodi/retro-dres" className="small"><p>SAZNAJ VIŠE</p><img src={Arrow}></img><img src={Arrow}></img></Link>
            </div>
        </div>
     </div>
  )
}

export default ShopHero