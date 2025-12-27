import { useEffect, useState } from "react";
import api from "../../services/api";
import "../admin.css";

export default function AdminLeagues() {
  const [leagues, setLeagues] = useState([]);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

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

    await api.post("/league", fd);
    setName("");
    setThumbnail(null);
    loadLeagues();
  };

  const deleteLeague = async (id) => {
    if (!window.confirm("Delete league?")) return;
    await api.delete(`/league/${id}`);
    loadLeagues();
  };

  return (
    <div className="admin-card">
      <h1>Leagues</h1>

      <div className="admin-form">
        <input placeholder="League name" value={name} onChange={e => setName(e.target.value)} />
        <label>
          Thumbnail:
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        </label>
        {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Preview" className="thumbnail-preview" />}
        <div className="form-actions">
          <button className="btn create"onClick={createLeague}>Create</button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leagues.map(l => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>
                <button className="btn delete" onClick={() => deleteLeague(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}