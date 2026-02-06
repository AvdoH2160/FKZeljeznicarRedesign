import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification";
import { getImageUrl } from "../../services/imageService";
import "../admin.css";

export default function AdminLeagues() {
  const [notification, setNotification] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [editingLeague, setEditingLeague] = useState(null);

  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [smallThumbnail, setSmallThumbnail] = useState(null);

  const loadLeagues = () => {
    api.get("/league").then(res => setLeagues(res.data));
  };

  useEffect(() => {
    loadLeagues();
  }, []);

  const resetForm = () => {
    setEditingLeague(null);
    setName("");
    setThumbnail(null);
    setSmallThumbnail(null);
  };

  const saveLeague = async () => {
    const fd = new FormData();
    fd.append("Name", name);
    if (thumbnail) fd.append("Logo", thumbnail);
    if (smallThumbnail) fd.append("SmallLogoUrl", smallThumbnail);

    try {
      if (editingLeague) {
        await api.put(`/league/${editingLeague}`, fd);
        setNotification({
          type: "success",
          message: "Liga uspješno ažurirana"
        });
      } else {
        await api.post("/league", fd);
        setNotification({
          type: "success",
          message: "Liga uspješno dodana"
        });
      }

      resetForm();
      loadLeagues();
    } catch {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }

    setTimeout(() => setNotification(null), 3000);
  };

  const editLeague = async (id) => {
    const res = await api.get(`/league/${id}`);
    const l = res.data;

    setEditingLeague(l.id);
    setName(l.name);
    setThumbnail(null);
    setSmallThumbnail(null);
  };

  const deleteLeague = async (id) => {
    if (!window.confirm("Delete league?")) return;

    try {
      await api.delete(`/league/${id}`);
      setNotification({
        type: "success",
        message: "Liga uspješno obrisana"
      });
      loadLeagues();
    } catch {
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

      <h1>Lige</h1>

      <div className="admin-form">
        <label>Ime lige</label>
        <input
          placeholder="Ime lige"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>
          Thumbnail:
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        </label>

        {editingLeague &&
          leagues.find(l => l.id === editingLeague)?.logoUrl &&
          !thumbnail && (
            <div className="preview-container">
              <span className="preview-label">Current Thumbnail:</span>
              <img
                src={getImageUrl(leagues.find(l => l.id === editingLeague).logoUrl)}
                className="thumbnail-preview"
                alt="Current logo"
              />
            </div>
          )}

        {thumbnail && (
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="Preview"
            className="thumbnail-preview"
          />
        )}

        <label>
          Small Thumbnail:
          <input type="file" onChange={e => setSmallThumbnail(e.target.files[0])} />
        </label>


        {editingLeague &&
          leagues.find(l => l.id === editingLeague)?.smallLogoUrl &&
          !smallThumbnail && (
            <div className="preview-container">
              <span className="preview-label">Current Small Thumbnail:</span>
              <img
                src={getImageUrl(leagues.find(l => l.id === editingLeague).smallLogoUrl)}
                className="thumbnail-preview"
                alt="Current logo"
              />
            </div>
          )}
        {smallThumbnail && (
          <img
            src={URL.createObjectURL(smallThumbnail)}
            alt="Preview"
            className="thumbnail-preview"
          />
        )}

        <div className="form-actions">
          <button className="btn create" onClick={saveLeague}>
            {editingLeague ? "Ažuriraj" : "Napravi"}
          </button>
          {editingLeague && (
            <button className="btn cancel" onClick={resetForm}>
              Poništi
            </button>
          )}
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map(l => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td className="actions">
                <button className="btn edit" onClick={() => editLeague(l.id)}>
                  Ažuriraj
                </button>
                <button className="btn delete" onClick={() => deleteLeague(l.id)}>
                  Izbriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
