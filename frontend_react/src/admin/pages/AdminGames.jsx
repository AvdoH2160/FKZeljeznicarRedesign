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
  const [status, setStatus] = useState("Scheduled");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const [goalTeamId, setGoalTeamId] = useState("");
  const [goalPlayer, setGoalPlayer] = useState("");
  const [goalMinute, setGoalMinute] = useState("");

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    const g = await api.get("/games");
    const t = await api.get("/team");
    const l = await api.get("/league");

    setGames(g.data);
    setTeams(t.data);
    setLeagues(l.data);
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
    setGoals([]);
  };

  const saveGame = async () => {
    const payload = {
      homeTeamId,
      awayTeamId,
      leagueId,
      kickOffTime,
      status,
      homeScore,
      awayScore
    };

    if (editingGame) {
      await api.put(`/games/${editingGame}`, payload);
      setNotification("Game updated successfully");
    } else {
      const res = await api.post("/games", payload);
      setEditingGame(res.data.id);
      setNotification("Game created – now you can add goals");
    }

    loadAll();
  };

  const editGame = async (game) => {
    setEditingGame(game.id);
    setHomeTeamId(game.homeTeamId);
    setAwayTeamId(game.awayTeamId);
    setLeagueId(game.leagueId);
    setKickOffTime(game.kickOffTime.slice(0, 16));
    setStatus(game.status);
    setHomeScore(game.homeScore);
    setAwayScore(game.awayScore);

    const g = await api.get(`/games/${game.id}`);
    setGoals(g.data.goals);
  };

  const addGoal = async () => {
    await api.post(`/games/${editingGame}/goals`, {
      teamId: goalTeamId,
      playerName: goalPlayer,
      minute: goalMinute
    });

    const g = await api.get(`/games/${editingGame}`);
    setGoals(g.data.goals);

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
      <h1>Games</h1>

      {notification && (
        <Notification text={notification} onClose={() => setNotification(null)} />
      )}

      <div className="admin-form">
        <select value={leagueId} onChange={e => setLeagueId(e.target.value)}>
          <option value="">League</option>
          {leagues.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        <select value={homeTeamId} onChange={e => setHomeTeamId(e.target.value)}>
          <option value="">Home team</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <select value={awayTeamId} onChange={e => setAwayTeamId(e.target.value)}>
          <option value="">Away team</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={kickOffTime}
          onChange={e => setKickOffTime(e.target.value)}
        />

        <div className="score-row">
          <input type="number" value={homeScore} onChange={e => setHomeScore(e.target.value)} />
          <span>:</span>
          <input type="number" value={awayScore} onChange={e => setAwayScore(e.target.value)} />
        </div>

        <button onClick={saveGame}>
          {editingGame ? "Update game" : "Create game"}
        </button>

        {editingGame && (
          <button className="btn cancel" onClick={resetForm}>Exit edit</button>
        )}
      </div>

      {editingGame && (
        <>
          <h3>Goals</h3>

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
              placeholder="Player"
              value={goalPlayer}
              onChange={e => setGoalPlayer(e.target.value)}
            />

            <input
              type="number"
              placeholder="Minute"
              value={goalMinute}
              onChange={e => setGoalMinute(e.target.value)}
            />

            <button onClick={addGoal}>Add goal</button>
          </div>

          {goals.map(g => (
            <div key={g.id} className="goal-row">
              {g.minute}' – {g.playerName}
              <button onClick={() => deleteGoal(g.id)}>❌</button>
            </div>
          ))}
        </>
      )}

      <h3>All games</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Match</th>
            <th>Result</th>
            <th>Kick off</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map(g => (
            <tr key={g.id}>
              <td>{g.homeTeam.name} vs {g.awayTeam.name}</td>
              <td>{g.homeScore}:{g.awayScore}</td>
              <td>{new Date(g.kickOffTime).toLocaleString()}</td>
              <td>
                <button className="edit" onClick={() => editGame(g)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}