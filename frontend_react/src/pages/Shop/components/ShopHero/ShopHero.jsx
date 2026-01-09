import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import HeroImage1 from "../../../../assets/images/shop-hero-image1.png"
import HeroImage2 from "../../../../assets/images/shop-hero-image2.png"
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
            <Link className='category'>Dresovi</Link>
            <Link className='category'>Odjeća</Link>
            <Link className='category'>Trening</Link>
            <Link className='category'>Asesoari</Link>
             <Link className='category'>Poklon bon</Link>
            <Link className='category'>Akcija</Link>
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
                <p className="small"><br/>SAZNAJ VIŠE</p>
            </div>
        </div>
     </div>
  )
}

export default ShopHero