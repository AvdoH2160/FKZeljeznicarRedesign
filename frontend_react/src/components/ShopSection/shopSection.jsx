import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./shopSection.css";
import FkzShop from "../../assets/svg/fkz_shop.svg";

const ShopSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [cardFeatured, setCardFeatured] = useState([]);
  const [bounce, setBounce] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("https://localhost:7010/api/Products/cardFeatured")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => a.featuredOrder - b.featuredOrder);
        setCardFeatured(sorted);
      })
      .catch(err => console.error("Greska prilikom dohvacanja!", err));
  }, []);

  const scrollNext = () => {
    if (!containerRef.current) return;
    const step = containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  const scrollPrev = () => {
    if (!containerRef.current) return;
    const step = containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  return (
    <div id="shop-section-container">
      <div id="text-container">
        <h1 id="shop-section-text">FAN SHOP</h1>
        <img id="shop-section-image" src={FkzShop} alt="shop" />
      </div>

      <div id="card-container" ref={containerRef}>
        {cardFeatured.map((item, index) => (
          <div
            key={item.id}
            className={`shop-card item-${index} ${
              activeIndex === null
                ? ''
                : activeIndex === index
                ? 'is-active'
                : index < activeIndex
                ? `is-left is-left-${activeIndex - index}`
                : `is-right is-right-${index - activeIndex}`
            } ${bounce ? "bounce" : ""}`}
            onMouseEnter={() => {
              setActiveIndex(index);
              setBounce(true);
              setTimeout(() => setBounce(false), 150);
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <img className="products-image" src={`https://localhost:7010${item.thumbnailUrl}`} />
            <h2 className="products-name">{item.name}</h2>
          </div>
        ))}
      </div>
      
      <div className="carousel-controls">
        <button onClick={scrollPrev} aria-label="Previous">‹</button>
        <button onClick={scrollNext} aria-label="Next">›</button>
      </div>

      <Link className="newsSection-shop-button" to="/shop">
        SHOP
      </Link>
    </div>
  );
};

export default ShopSection;