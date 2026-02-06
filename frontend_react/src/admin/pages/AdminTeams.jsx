import { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification";
import { getImageUrl } from "../../services/imageService";
import "../admin.css";

export default function AdminTeams() {
  const [notification, setNotification] = useState(null);
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  const [name, setName] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    api.get("/league").then(r => setLeagues(r.data));
    loadTeams();
  }, []);

  const loadTeams = () => {
    api.get("/team").then(res => setTeams(res.data));
  };

  const resetForm = () => {
    setEditingTeam(null);
    setName("");
    setLeagueId("");
    setLogo(null);
  };

  const saveTeam = async () => {
    const fd = new FormData();
    fd.append("Name", name);
    fd.append("LeagueId", leagueId);
    if (logo) fd.append("Logo", logo);

    try {
      if (editingTeam) {
        await api.put(`/team/${editingTeam}`, fd);
        setNotification({
          type: "success",
          message: "Tim uspješno ažuriran"
        });
      } else {
        await api.post("/team", fd);
        setNotification({
          type: "success",
          message: "Tim uspješno dodan"
        });
      }

      resetForm();
      loadTeams();
    } catch (err) {
      console.log(err.response);
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }

    setTimeout(() => setNotification(null), 3000);
  };

  const editTeam = (id) => {
    const t = teams.find(x => x.id === id);
    if (!t) return;

    setEditingTeam(t.id);
    setName(t.name);
    setLeagueId(t.leagueId.toString());
    setLogo(null);
  };

  const deleteTeam = async (id) => {
    if (!window.confirm("Delete team?")) return;

    try {
      await api.delete(`/team/${id}`);
      loadTeams();
      setNotification({
        type: "success",
        message: "Tim uspješno obrisan"
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

      <h1>{editingTeam ? "Uredi tim" : "Timovi"}</h1>

      <div className="admin-form">
        <label>Ime tima</label>
        <input
          placeholder="Ime tima"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Liga</label>
        <select value={leagueId} onChange={e => setLeagueId(e.target.value)}>
          <option value="">Odaberi ligu</option>
          {leagues.map(l => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>

        <label>
          Logo:
          <input type="file" onChange={e => setLogo(e.target.files[0])} />
        </label>

        {editingTeam &&
          teams.find(t => t.id === editingTeam)?.logoUrl &&
          !logo && (
            <div className="preview-container">
              <span className="preview-label">Current Logo:</span>
              <img
                src={getImageUrl(teams.find(t => t.id === editingTeam).logoUrl)}
                className="thumbnail-preview"
                alt="Current logo"
              />
            </div>
          )}

        {logo && (
          <img
            src={URL.createObjectURL(logo)}
            alt="Preview"
            className="thumbnail-preview"
          />
        )}

        <div className="form-actions">
          <button className="btn create" onClick={saveTeam}>
            {editingTeam ? "Ažuriraj" : "Napravi"}
          </button>
          {editingTeam && (
            <button className="btn cancel" onClick={resetForm}>
              Poništi
            </button>
          )}
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Ime tima</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td className="actions">
                <button className="btn edit" onClick={() => editTeam(t.id)}>
                  Ažuriraj
                </button>
                <button className="btn delete" onClick={() => deleteTeam(t.id)}>
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
