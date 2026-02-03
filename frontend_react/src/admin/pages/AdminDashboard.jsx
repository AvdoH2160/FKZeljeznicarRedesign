import { useEffect, useState } from "react";
import api from "../../services/api"; 
import "./adminDashboard.css"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    memberships: 0,
    news: 0,
    games: 0,
    players: 0,
    leagues: 0,
    teams: 0,
    products: 0,
    sectors: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Korisnici</h3>
          <p>{stats.users}</p>
        </div>

        <div className="stat-card">
          <h3>Članarine</h3>
          <p>{stats.memberships}</p>
        </div>

        <div className="stat-card">
          <h3>Vijesti</h3>
          <p>{stats.news}</p>
        </div>

        <div className="stat-card">
          <h3>Utakmice</h3>
          <p>{stats.games}</p>
        </div>

        <div className="stat-card">
          <h3>Igrači</h3>
          <p>{stats.players}</p>
        </div>

        <div className="stat-card">
          <h3>Lige</h3>
          <p>{stats.leagues}</p>
        </div>

        <div className="stat-card">
          <h3>Timovi</h3>
          <p>{stats.teams}</p>
        </div>

        <div className="stat-card">
          <h3>Proizvodi</h3>
          <p>{stats.products}</p>
        </div>

        <div className="stat-card">
          <h3>Sektori</h3>
          <p>{stats.sectors}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;