import React from 'react'
import { useEffect, useState, useRef } from "react"
import { Link } from 'react-router-dom'
import api from "../../../../services/api"
import { getImageUrl } from '../../../../services/imageService'
import "./shopFeatured.css"

const ShopFeatured = () => {
    const [featured, setFeatured] = useState([]);
    const [showButtons, setShowButtons] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        api.get('/products/featured')
            .then(res => setFeatured(res.data))
            .catch(err => console.error("Error fetching profile:", err));
    }, []);


    const checkScroll = () => {
        if (!containerRef.current) return;
        const el = containerRef.current;
        setShowButtons(el.scrollWidth > el.clientWidth);
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [featured]);

    const scroll = (direction) => {
        if (!containerRef.current) return;
        const scrollAmount = 300; 
        if (direction === "left") {
        containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
        containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };
    
  return (
    <div className='shop-featured-wrapper'>
        {showButtons && (
            <button className="scroll-btn left" onClick={() => scroll("left")}>
                &#10094;
            </button>
        )}
        <div 
            className="shop-featured-container"
            ref={containerRef}
        >
            {featured.map((item, index) => (
                <Link 
                    key={item.id} to ={`/shop/proizvodi/${item.slug}`} 
                    className='shop-featured-item'
                    onClick = {(e) => {
                        if (isDown) e.preventDefault();
                    }}
                >
                    <img
                        src={getImageUrl(item.shopThumbnailUrl1)}
                        className="featured-img img-main"
                        alt={item.name}
                    />
                    <img
                        src={getImageUrl(item.shopThumbnailUrl2)}
                        className="featured-img img-hover"
                        alt={item.name}
                    />
                    <div className='shop-featured-overlay'>
                        {item.name.toUpperCase()}
                    </div>
                </Link>
            ))}
        </div>
        {showButtons && (
            <button className="scroll-btn right" onClick={() => scroll("right")}>
                &#10095;
            </button>
        )}
    </div>
  )
}

export default ShopFeatured