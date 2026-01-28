import { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification"
import "../admin.css";

export default function AdminTeams() {
  const [notification, setNotification] = useState(null);
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [name, setName] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    api.get("/league").then(r => setLeagues(r.data));
    loadTeams();
  }, []);

  const createTeam = async () => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("leagueId", leagueId);
    if (logo) fd.append("logo", logo);

    try {
      await api.post("/team", fd);
      setName("");
      setLeagueId("");
      setLogo(null);
      loadTeams();
      setNotification({
          type: "success",
          message: "Tim uspjesno dodan"
        });
    } catch(err) {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
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
    } catch(err) {
      console.log(err.response);
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

const loadTeams = () => {
    api.get("/team").then(res => setTeams(res.data));
  };

  return (
    <div className="admin-card">
      <Notification
        notification={notification}  
        onClose={() => setNotification(null)}
      />
      <h1>Timovi</h1>

      <div className="admin-form">
        <label>Ime tima</label>
        <input placeholder="Ime tima" value={name} onChange={e => setName(e.target.value)} />

        <select value={leagueId} onChange={e => setLeagueId(e.target.value)}>
          <option value="">Odaberi ligu</option>
          {leagues.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        <input type="file" onChange={e => setLogo(e.target.files[0])} />
        <div className="form-actions">
          <button className="btn create"onClick={createTeam}>Napravi</button>
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
          {teams.map(l => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>
                <button className="btn delete" onClick={() => deleteTeam(l.id)}>Izbriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}