import { useEffect, useState } from "react";
import api from "../../services/api"; 
import "./adminDashboard.css"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    news: 0,
    games: 0,
    players: 0
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
      </div>
    </div>
  );
};

export default AdminDashboard;