import { useEffect, useState } from "react";
import api from "../../services/api";
import "./adminNews.css";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const loadNews = () => {
    api.get("/news").then(res => setNews(res.data));
  };

  useEffect(() => {
    loadNews();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setSummary("");
    setContent("");
    setCategory("");
    setIsFeatured(false);
    setThumbnail(null);
    setImages([]);
  };

  const handleEdit = async (id) => {
    const res = await api.get(`/news/${id}`);
    const n = res.data;
    setEditingId(n.id);
    setTitle(n.title);
    setSummary(n.summary);
    setContent(n.content);
    console.log(n.content);
    setCategory(n.category);
    setIsFeatured(n.isFeatured);
  };

  const createNews = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("isFeatured", isFeatured);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    images.forEach(img => formData.append("images", img));

    if (editingId) {
      await api.put(`/news/${editingId}`, formData);
    } else {
      await api.post("/news", formData);
    }

    resetForm();
    loadNews();
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Delete news?")) return;
    await api.delete(`/news/${id}`);
    loadNews();
  };

  return (
    <div className="admin-news">
      <h1>Vijesti</h1>

      {/* CREATE / EDIT */}
      <div className="news-form">
        <input
          placeholder="Naslov"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Sažetak"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <textarea
          placeholder="Sadržaj"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <input
          placeholder="Kategorija"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={e => setIsFeatured(e.target.checked)}
          />
          Izdvojeno
        </label>

        {/* Thumbnail */}
        <div>
          <label>Thumbnail:</label>
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
          {editingId && news.find(n => n.id === editingId)?.thumbnailUrl && !thumbnail && (
            <div className="preview-container">
              <span className="preview-label">Current Thumbnail:</span>
              <img
                src={`https://localhost:7010${news.find(n => n.id === editingId).thumbnailUrl}`}
                alt="Current Thumbnail"
                className="preview-image"
              />
            </div>
          )}
          {thumbnail && (
            <img src={URL.createObjectURL(thumbnail)} alt="New Thumbnail" className="preview-image" />
          )}
        </div>

        {/* News Images */}
        <div>
          <label>News Images:</label>
          <input type="file" multiple onChange={e => setImages([...e.target.files])} />
          {editingId && news.find(n => n.id === editingId)?.images?.length > 0 && images.length === 0 && (
            <div className="preview-container">
              <span className="preview-label">Current News Images:</span>
              {news.find(n => n.id === editingId).images.map((img, index) => (
                <img
                  key={index}
                  src={`https://localhost:7010$${img}`}
                  alt={`News Image ${index + 1}`}
                  className="preview-image"
                />
              ))}
            </div>
          )}
          {images.length > 0 && (
            <div className="gallery">
              {images.map((img, idx) => (
                <img key={idx} src={URL.createObjectURL(img)} alt={`Preview ${idx}`} className="preview-image" />
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button onClick={createNews}>{editingId ? "Spasi promjene" : "Dodaj vijest"}</button>
          {editingId && <button onClick={resetForm} className="cancel">Otkaži promjene</button>}
        </div>
      </div>

      {/* TABLE */}
      <table className="adminNews-table">
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Datum</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {news.map(n => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{new Date(n.publishedDate).toLocaleDateString()}</td>
              <td className="actions">
                <button className="edit" onClick={() => handleEdit(n.id)}>Edit</button>
                <button className="delete" onClick={() => deleteNews(n.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}