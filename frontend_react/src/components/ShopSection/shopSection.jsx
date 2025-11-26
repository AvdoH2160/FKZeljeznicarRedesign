import React from 'react'
import {useState, useRef, useEffect} from 'react'
import "./shopSection.css"
import FkzShop from "../../assets/svg/fkz_shop.svg"

const shopSection = () => {
  return (
    <div id="shop-section-container">
        <div id="text-container">
            <h1 id="shop-section-text">FAN SHOP</h1>
            <img id="shop-section-image" src={FkzShop} alt="shop"></img>
        </div>
        <div id="card-container"> 
            <div className="shop-card item-0">

            </div>
            <div className="shop-card item-1">
                
            </div>
            <div className="shop-card item-2">
                
            </div>
            <div className="shop-card item-3">
                
            </div>
            <div className="shop-card item-4">
                
            </div>
        </div>
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