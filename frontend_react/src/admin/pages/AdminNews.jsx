import { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification"
import "../admin.css";

export default function AdminNews() {
  const [notification, setNotification] = useState(null);
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const [publishedDate, setPublishedDate] = useState("");

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
    setPublishedDate("");
  };

  const handleEdit = async (id) => {
    const res = await api.get(`/news/${id}`);
    const n = res.data;
    setEditingId(n.id);
    setTitle(n.title);
    setSummary(n.summary);
    setContent(n.content);
    setCategory(n.category);
    setIsFeatured(n.isFeatured);
    setPublishedDate(n.publishedDate.slice(0, 16));
  };

  const createNews = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("isFeatured", isFeatured);
    formData.append("publishedDate", publishedDate);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    images.forEach(img => formData.append("images", img));

    try {
      if (editingId) {
        await api.put(`/news/${editingId}`, formData);
        setNotification({
          type: "success",
          message: "Vijest uspješno ažurirana"
        });
      } else {
        await api.post("/news", formData);
        setNotification({
          type: "success",
          message: "Vijest uspješno dodana"
        });
      }
      resetForm();
      loadNews();
    } catch(err) {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Delete news?")) return;
    try {
      await api.delete(`/news/${id}`);
      loadNews();
      setNotification({
        type: "success",
        message: "Vijest uspješno obrisana"
      });
    } catch (err) {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="admin-card">
      <Notification
        notification={notification}  
        onClose={() => setNotification(null)}
      />
      <h1>Vijesti</h1>

      <div className="admin-form">
        <label>Naslov</label>
        <input
          placeholder="Naslov"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>Sažetak</label>
        <input
          placeholder="Sažetak"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <label>Sadržaj</label>
        <textarea
          placeholder="Sadržaj"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <label>Kategorija</label>
        <input
          placeholder="Kategorija"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <label>Datum objave</label>
        <input
          type="datetime-local"
          value={publishedDate}
          onChange={e => setPublishedDate(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={e => setIsFeatured(e.target.checked)}
          />
          Izdvojeno
        </label>

        <div>
          <label>Thumbnail:</label>
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
          {editingId && news.find(n => n.id === editingId)?.thumbnailUrl && !thumbnail && (
            <div className="preview-container">
              <span className="preview-label">Current Thumbnail:</span>
              <img
                src={`https://localhost:7010${news.find(n => n.id === editingId).thumbnailUrl}`}
                alt="Current Thumbnail"
                className="thumbnail-preview"
              />
            </div>
          )}
          {thumbnail && (
            <img src={URL.createObjectURL(thumbnail)} alt="New Thumbnail" className="thumbnail-preview" />
          )}
        </div>

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
                  className="thumbnail-preview"
                />
              ))}
            </div>
          )}
          {images.length > 0 && (
            <div className="gallery">
              {images.map((img, idx) => (
                <img key={idx} src={URL.createObjectURL(img)} alt={`Preview ${idx}`} className="thumbnail-preview" />
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button onClick={createNews}>{editingId ? "Ažuriraj" : "Napravi"}</button>
          {editingId && <button onClick={resetForm} className="btn cancel">Poništi</button>}
        </div>
      </div>

      <table className="admin-table">
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
                <button className="btn edit" onClick={() => handleEdit(n.id)}>Ažuriraj</button>
                <button className="btn delete" onClick={() => deleteNews(n.id)}>Izbriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}