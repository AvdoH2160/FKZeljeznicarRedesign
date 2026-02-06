import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { getImageUrl } from "../../services/imageService";
import "./relatedContent.css"

const RelatedContent = ({ type, currentId, publishedDate, categoryId }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    let url = ""

    if (type === "news") {
      url = `/News/related?currentId=${currentId}&date=${publishedDate}`
    }

    if (type === "product") {
      url = `/Products/related?currentId=${currentId}&categoryId=${categoryId}`
    }

    if (!url) return

    const load = async () => {
      try {
        const res = await api.get(url);
        const formatted = res.data.map(item => {
          const iso = item.publishedDate.includes("T")
              ? item.publishedDate
              : item.publishedDate.replace(" ", "T");
          
          const date = new Date(iso);
          
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          
          return {
            ...item,
            formattedDate: `${day}.${month}.${year}`      
          };
        })
        setItems(formatted);
      }
      catch(err) {
        console.error("Greška:", err)
      }
    }
    load();
  }, [type, currentId, publishedDate, categoryId])

  if (items.length === 0) return null

  return (
    <div className="related-container">
      <h3>
        {type === "news" ? "OSTALE NOVOSTI" : "SLIČNI ARTIKLI"}
      </h3>

      <div className="related-grid">
        {items.map(item => (
          <Link 
            key={item.id}
            to={type === "news" ? `/novost/${item.slug}` : `/products/${item.slug}`}
            className="related-card"
          >
            <div className="related-image-wrapper">
                <img className="related-image" src={getImageUrl(item.thumbnailUrl)} />
            </div>
            <p className='related-category'>
                {item.category+ ": "}{type === "news" ? item.formattedDate : ""}
            </p>
            <p className="related-title">{item.title || item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedContent