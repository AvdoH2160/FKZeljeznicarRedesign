import React from 'react'
import { useEffect, useState } from "react"
import api from "../../../../services/api"
import "./shopFeatured.css"

const ShopFeatured = () => {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        api.get('/products/featured')
            .then(res => setFeatured(res.data))
            .catch(err => console.error("Error fetching profile:", err));
    }, []);

  return (
    <div className='shop-featured-container'>
        {featured.map((item, index) => (
            <div key={item.id} className='shop-featured-item'>
                <img
                    src={`https://localhost:7010${item.shopThumbnailUrl1}`}
                    className="featured-img img-main"
                    alt={item.name}
                />
                <img
                    src={`https://localhost:7010${item.shopThumbnailUrl2}`}
                    className="featured-img img-hover"
                    alt={item.name}
                />
                <div className='shop-featured-overlay'>
                    {item.name.toUpperCase()}
                </div>
            </div>
        ))}
    </div>
  )
}

export default ShopFeatured