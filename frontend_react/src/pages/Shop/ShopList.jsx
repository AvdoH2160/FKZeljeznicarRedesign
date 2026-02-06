import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../../services/api";
import { getImageUrl } from "../../services/imageService";
import "./shopList.css";

const ITEMS_PER_LOAD = 9;

const categories = [
  "Svi proizvodi",
  "Dresovi",
  "Odjeća",
  "Trening",
  "Asesoari",
  "Akcija"
];

const ShopList = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [sortBy, setSortBy] = useState("new");

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "Svi proizvodi";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setVisibleCount(ITEMS_PER_LOAD);
  }, [categoryFromUrl]);

  const handleCategoryChange = (cat) => {
    setSearchParams(cat === "Svi proizvodi" ? {} : { category: cat });
  };

  const filtered =
    selectedCategory === "Svi proizvodi"
      ? products
      : products.filter(p => p.category === selectedCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "popular") return b.viewCount - a.viewCount;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  document.title=`${categoryFromUrl} - FK Željezničar`

  return (
    <div className="shop-list-page">
      <aside className="shop-filters">
        <h3>KATEGORIJE</h3>
        {categories.map(cat => (
          <button
            key={cat}
            className={cat === selectedCategory ? "active" : ""}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </aside>
      <section className="shop-content">
        {window.innerWidth <= 768 && (
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="mobile-category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        <div className="shop-sort">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="new">Najnovije</option>
            <option value="price-asc">Cijena ↑</option>
            <option value="price-desc">Cijena ↓</option>
            <option value="popular">Popularno</option>
          </select>
        </div>
        <div className="shop-products">
          {sorted.slice(0, visibleCount).map(p => (
            <Link key={p.id} className="product-card" to={`/shop/proizvodi/${p.slug}`}>
              <div className="shop-list-image-wrapper">
                <img
                   src={getImageUrl(p.thumbnailUrl)}
                   alt={p.name}
                   loading="lazy"
                />
              </div>
              <h4>{p.name}</h4>
              <p>{p.price} KM</p>
            </Link>
          ))}
        </div>
        {/* LOAD MORE */}
        {visibleCount < sorted.length && (
          <div className="load-more-wrapper">
            <button
              className="load-more"
              onClick={() => setVisibleCount(v => v + ITEMS_PER_LOAD)}
            >
              Učitaj još
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ShopList;
