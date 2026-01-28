import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification";
import "../admin.css";

export default function AdminGames() {
  const [games, setGames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);

  const [editingGame, setEditingGame] = useState(null);
  const [goals, setGoals] = useState([]);

  const [homeTeamId, setHomeTeamId] = useState("");
  const [awayTeamId, setAwayTeamId] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [kickOffTime, setKickOffTime] = useState("");
  const [status, setStatus] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const [news, setNews] = useState([]);
  const [newsId, setNewsId] = useState("");

  const [goalTeamId, setGoalTeamId] = useState("");
  const [goalPlayer, setGoalPlayer] = useState("");
  const [goalMinute, setGoalMinute] = useState("");

  const [stadium, setStadium] = useState("");
  const [season, setSeason] = useState("");
  const [isHomeGame, setIsHomeGame] = useState(true);
  const [ticketsAvailable, setTicketsAvailable] = useState(true);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const g = await api.get("/games");
    const t = await api.get("/team");
    const l = await api.get("/league");
    const n = await api.get("/news");

    setGames(g.data);
    setTeams(t.data);
    setLeagues(l.data);
    setNews(n.data);
  };

  const resetForm = () => {
    setEditingGame(null);
    setHomeTeamId("");
    setAwayTeamId("");
    setLeagueId("");
    setKickOffTime("");
    setStatus("Scheduled");
    setHomeScore(0);
    setAwayScore(0);
    setStadium("");
    setSeason("");
    setIsHomeGame(true);
    setTicketsAvailable(true);
    setGoals([]);
    setNewsId("");
  };

  const saveGame = async () => {
    const payload = {
      homeTeamId: Number(homeTeamId),
      awayTeamId: Number(awayTeamId),
      leagueId: Number(leagueId),
      kickOffTime,
      status,
      homeScore,
      awayScore,
      stadium,
      season,
      isHomeGame,
      ticketsAvailable,
      newsId: newsId ? Number(newsId) : null
    };

    try {
      if (editingGame) {
        await api.put(`/games/${editingGame}`, payload);
        resetForm();
        loadAll();
        setNotification({ 
          type:"success",
          message: "Utakmica uspješno ažurirana"
        });
      } else {
        const res = await api.post("/games", payload);
        setEditingGame(res.data.id);
        setNotification({ 
          type:"success",
          message: "Utakmica uspješno dodana"
        });
      }
    } catch(err) {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const editGame = async (game) => {
    const res = await api.get(`/games/${game.id}`);
    const g = res.data;

    setEditingGame(g.id);
    setHomeTeamId(String(g.homeTeamId));
    setAwayTeamId(String(g.awayTeamId));
    setLeagueId(String(g.leagueId));
    setKickOffTime(g.kickOffTime.slice(0, 16));
    setStatus(g.status);
    setHomeScore(g.homeScore);
    setAwayScore(g.awayScore);
    setStadium(g.stadium);
    setSeason(g.season);
    setIsHomeGame(g.isHomeGame);
    setTicketsAvailable(g.ticketsAvailable);
    setNewsId(String(g.newsId));


    setGoals(g.goals ?? []);
  };

  const deleteGame = async (id) => {
    if (!window.confirm("Delete game?")) return;
    try {
      await api.delete(`/games/${id}`);
      setNotification({
        type: "success",
        message: "Utakmica uspješno obrisan"
      });
      loadAll();
    } catch {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const addGoal = async () => {
    const g = await api.post(`/games/${editingGame}/goals`, {
      gameId: editingGame,
      scorerName: goalPlayer,
      minute: goalMinute,
      isHomeTeam: Number(goalTeamId) === Number(homeTeamId),
      isOwnGoal: false,
      isPenalty: false
    });

    setGoals(prev => [...prev, g.data]);

    setGoalPlayer("");
    setGoalMinute("");
    setGoalTeamId("");
  };

  const deleteGoal = async (id) => {
    await api.delete(`/games/goals/${id}`);
    const g = await api.get(`/games/${editingGame}`);
    setGoals(g.data.goals);
  };

  return (
    <div className="admin-card">
      <Notification
        notification={notification}  
        onClose={() => setNotification(null)}
      />
      <h1>Utakmice</h1>

      <div className="admin-form">
        <select value={leagueId} onChange={e => setLeagueId(e.target.value)}>
          <option value="">Liga</option>
          {leagues.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        <select value={homeTeamId} onChange={e => setHomeTeamId(e.target.value)}>
          <option value="">Domaća ekipa</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <select value={awayTeamId} onChange={e => setAwayTeamId(e.target.value)}>
          <option value="">Gostujuća ekipa</option>
          {teams
            .filter(t => t.id !== Number(homeTeamId))
            .map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
        </select>

        <select value={newsId} onChange={e => setNewsId(e.target.value)}>
          <option value="">Izvještaj</option>
          {news.map(n => (
            <option key={n.id} value={n.id}>
              {n.title}
            </option>
          ))}
        </select>

        <label>Datum i vrijeme početka</label>
        <input
          type="datetime-local"
          value={kickOffTime}
          onChange={e => setKickOffTime(e.target.value)}
        />
        <label>Stadion</label>
        <input
          placeholder="Stadion"
          value={stadium}
          onChange={e => setStadium(e.target.value)}
        />
        <label>Sezona</label>
        <input
          placeholder="Sezona (e.g. 2024/25)"
          value={season}
          onChange={e => setSeason(e.target.value)}
        />

        <label>Status</label>
        <select value={status} onChange={e => setStatus(Number(e.target.value))}>
          <option value={0}>Upcoming</option>
          <option value={1}>Live</option>
          <option value={2}>Finished</option>
          <option value={3}>Postponed</option>
        </select>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={isHomeGame}
            onChange={e => setIsHomeGame(e.target.checked)}
          />
          Domaća utakmica
        </label>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={ticketsAvailable}
            onChange={e => setTicketsAvailable(e.target.checked)}
          />
          Karte dostupne
        </label>
        
        <label>Rezultat</label>
        <div className="score-row">
          <input type="number" value={homeScore} onChange={e => setHomeScore(e.target.value)} />
          <span>:</span>
          <input type="number" value={awayScore} onChange={e => setAwayScore(e.target.value)} />
        </div>

        <div className="form-actions">
          <button onClick={saveGame}>{editingGame ? "Ažuriraj" : "Napravi"}</button>
          <button className="btn cancel" onClick={resetForm}>Poništi</button>
        </div>

        {/* {editingGame && (
          <button className="btn cancel" onClick={resetForm}>Exit edit</button>
        )} */}
      </div>

      {editingGame && (
        <>
          <h3>Golovi</h3>

          <div className="admin-form">
            <select value={goalTeamId} onChange={e => setGoalTeamId(e.target.value)}>
              <option value="">Team</option>
              {teams
                .filter(t => t.id === Number(homeTeamId) || t.id === Number(awayTeamId))
                .map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </select>

            <input
              placeholder="Igrač"
              value={goalPlayer}
              onChange={e => setGoalPlayer(e.target.value)}
            />

            <input
              placeholder="Minuta"
              value={goalMinute}
              onChange={e => setGoalMinute(e.target.value)}
            />

            <button onClick={addGoal}>Dodaj gol</button>
          </div>

          {goals.map(g => (
            <div key={g.id} className="goal-row">
              {g.minute}' – {g.scorerName}
              <button onClick={() => deleteGoal(g.id)}>❌</button>
            </div>
          ))}
        </>
      )}

      <h3>Sve utakmice</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Utakmica</th>
            <th>Rezultat</th>
            <th>Početak</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {games.map(g => (
            <tr key={g.id}>
              <td>{g.homeTeamName} vs {g.awayTeamName}</td>
              <td>{g.homeScore}:{g.awayScore}</td>
              <td>{new Date(g.kickOffTime).toLocaleString()}</td>
              <td className="actions">
                <button className="btn edit" onClick={() => editGame(g)}>Ažuriraj</button>
                <button className="btn delete" onClick={() => deleteGame(g.id)}>Izbriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}