import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./relatedContent.css"

const RelatedContent = ({ type, currentId, publishedDate, categoryId }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    let url = ""

    if (type === "news") {
      url = `https://localhost:7010/api/News/related?currentId=${currentId}&date=${publishedDate}`
    }

    if (type === "product") {
      url = `https://localhost:7010/api/Products/related?currentId=${currentId}&categoryId=${categoryId}`
    }

    if (!url) return

    fetch(url)
      .then(res => res.json())
      .then(data => {
            const formattedNews = data.map(item => 
            {
                const dateObj = new Date(item.publishedDate);
                const formattedDate = dateObj.toLocaleString("bs-BA", 
                    {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    }
                );
                return {
                    ...item, formattedDate
                };
            }
            )
            setItems(formattedNews);
            console.log(formattedNews)
        })
      .catch(err => console.error("Greška:", err))
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
            to={type === "news" ? `/news/${item.slug}` : `/products/${item.slug}`}
            className="related-card"
          >
            <div className="related-image-wrapper">
                <img className="related-image" src={`https://localhost:7010${item.thumbnailUrl}`} />
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