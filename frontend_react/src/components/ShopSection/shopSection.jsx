import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./shopSection.css"
import FkzShop from "../../assets/svg/fkz_shop.svg"

const shopSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [cardFeatured, setCardFeatured] = useState([]);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    fetch("https://localhost:7010/api/Products/cardFeatured")
    .then(res => res.json())
    .then(data => {
      const sorted = data.sort((a, b) => a.featuredOrder - b.featuredOrder);
      setCardFeatured(sorted);
    })
    .catch(err => console.error("Greska prilikom dohvacanja!", err))
  }, []);

  return (
    <div id="shop-section-container">
        <div id="text-container">
            <h1 id="shop-section-text">FAN SHOP</h1>
            <img id="shop-section-image" src={FkzShop} alt="shop"></img>
        </div>
        <div id="card-container"> 
          {cardFeatured.map((item, index) => (
            <div key = {item.id} className={`shop-card item-${index} ${
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
              <img className="products-image" src={`https://localhost:7010${item.thumbnailUrl}`}/>
              <h2 className="products-name">{item.name}</h2>
            </div>
          ))}
        </div>
        <Link className="newsSection-shop-button" to="/shop">
          SHOP
        </Link>
    </div>
  )
}

export default shopSection


// const [activeIndex, setActiveIndex] = useState(null);

// return (
//   <div id="card-container">
//     {items.map((item, i) => (
//       <div
//         key={item.id}
//         className={`shop-card item-${i} ${
//           activeIndex === null
//             ? ''
//             : activeIndex === i
//             ? 'is-active'
//             : i < activeIndex
//             ? 'is-left'
//             : 'is-right'
//         }`}
//         onMouseEnter={() => setActiveIndex(i)}
//         onMouseLeave={() => setActiveIndex(null)}
//       >
//         <div className="card-inner">
//           {/* ...card content... */}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// ...existing code...
// import React, { useRef } from "react";

// export default function ShopSection({ items }) {
//   const containerRef = useRef(null);

//   const scrollNext = () => {
//     const c = containerRef.current;
//     if (!c) return;
//     const step = c.clientWidth * 0.8; // pomakni za širinu jedne kartice (prilagodi)
//     c.scrollBy({ left: step, behavior: "smooth" });
//   };

//   const scrollPrev = () => {
//     const c = containerRef.current;
//     if (!c) return;
//     const step = c.clientWidth * 0.8;
//     c.scrollBy({ left: -step, behavior: "smooth" });
//   };

//   return (
//     <section id="shop-section-container">
//       {/* ...ostali elementi... */}
//       <div id="card-container" ref={containerRef}>
//         {items.map((item, i) => (
//           <div key={item.id} className={`shop-card item-${i}`}>
//             {/* ...card content... */}
//           </div>
//         ))}
//       </div>

//       {/* kontrole će se prikazati na manjim ekranima (CSS ih može stilizirati/pozicionirati) */}
//       <div className="carousel-controls">
//         <button type="button" onClick={scrollPrev} aria-label="Previous">‹</button>
//         <button type="button" onClick={scrollNext} aria-label="Next">›</button>
//       </div>
//     </section>
//   );
// }