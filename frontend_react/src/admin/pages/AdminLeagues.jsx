import { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification";
import "../admin.css";

export default function AdminLeagues() {
  const [notification, setNotification] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [smallThumbnail, setSmallThumbnail] = useState(null);

  const loadLeagues = () => {
    api.get("/league").then(res => setLeagues(res.data));
  };

  useEffect(() => {
    loadLeagues();
  }, []);


  const createLeague = async () => {
    const fd = new FormData();
    fd.append("name", name);
    if (thumbnail) fd.append("logo", thumbnail);
    if (smallThumbnail) fd.append("smallLogoUrl", smallThumbnail);

    try {
      await api.post("/league", fd);
      setNotification({
        type: "success",
        message: "Liga uspješno dodana"
      });
      setName("");
      setThumbnail(null);
      setSmallThumbnail(null);
      loadLeagues();
    }
    catch (err) {
      setNotification({
        type:"error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const deleteLeague = async (id) => {
    if (!window.confirm("Delete league?")) return;
    try {
      await api.delete(`/League/${id}`);
      setNotification({
        type: "success",
        message: "Liga uspješno obrisana"
      });
      loadLeagues();
    }
    catch (err) {
      console.error(err);
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
        <input placeholder="Ime lige" value={name} onChange={e => setName(e.target.value)} />
        <label>
          Thumbnail:
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        </label>
        {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Preview" className="thumbnail-preview" />}
        <label>
          Small Thumbnail:
          <input type="file" onChange={e => setSmallThumbnail(e.target.files[0])} />
        </label>
        {smallThumbnail && <img src={URL.createObjectURL(smallThumbnail)} alt="Preview" className="thumbnail-preview" />}
        <div className="form-actions">
          <button className="btn create"onClick={createLeague}>Napravi</button>
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
              <td>
                <button className="btn delete" onClick={() => deleteLeague(l.id)}>Izbriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}