import { useEffect, useState } from "react";
import api from "../../services/api";
import "../admin.css";

export default function AdminTeams() {
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

    await api.post("/team", fd);
    setName("");
    setLeagueId("");
    loadTeams();
  };

  const deleteTeam = async (id) => {
    if (!window.confirm("Delete team?")) return;
    await api.delete(`/team/${id}`);
    loadTeams();
  };

const loadTeams = () => {
    api.get("/team").then(res => setTeams(res.data));
  };

  return (
    <div className="admin-card">
      <h1>Teams</h1>

      <div className="admin-form">
        <input placeholder="Team name" value={name} onChange={e => setName(e.target.value)} />

        <select value={leagueId} onChange={e => setLeagueId(e.target.value)}>
          <option value="">Select league</option>
          {leagues.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        <input type="file" onChange={e => setLogo(e.target.files[0])} />
        <div className="form-actions">
          <button className="btn create"onClick={createTeam}>Create</button>
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
          {teams.map(l => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td>
                <button className="btn delete" onClick={() => deleteTeam(l.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}