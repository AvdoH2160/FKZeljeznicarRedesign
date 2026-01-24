import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification"
import "../admin.css";

export default function AdminPlayers() {
  const [notification, setNotification] = useState(null);
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [description, setDescription] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [number, setNumber] = useState(0);
  const [position, setPosition] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [previousClubs, setPreviousClubs] = useState("");

  const loadPlayers = () => {
    api.get("/player").then(res => setPlayers(res.data));
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const resetForm = () => {
    setEditingPlayer(null);
    setName("");
    setSurname("");
    setDescription("");
    setBirthDate("");
    setPlaceOfBirth("");
    setNationality("");
    setNumber(0);
    setPosition("");
    setThumbnail(null);
    setIsFeatured(false);
    setPreviousClubs("");
  };

  const savePlayer = async () => {
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Surname", surname);
    formData.append("Description", description);
    formData.append("BirthDate", birthDate);
    formData.append("PlaceOfBirth", placeOfBirth);
    formData.append("Nationality", nationality);
    formData.append("Number", number);
    formData.append("Position", position);
    formData.append("IsFeatured", isFeatured);
    formData.append("PreviousClubs", previousClubs);

    if (thumbnail) formData.append("ThumbnailUrl", thumbnail);

    try {
      if (editingPlayer) {
        await api.put(`/player/${editingPlayer}`, formData);
        setNotification({
          type: "success",
          message: "Igrač uspjesno ažuriran"
        });
      } else {
        await api.post("/player", formData);
        setNotification({
          type: "success",
          message: "Igrač uspješno dodan"
        });
      }
      resetForm();
      loadPlayers();
    } catch (err) {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const editPlayer = async (id) => {
    const res = await api.get(`/player/${id}`);
    const n = res.data;
    console.log("EDIT PLAYER ID:", id);
    console.log("EDIT PLAYER ID:", n.id);
    setEditingPlayer(n.id);
    setName(n.name);
    setSurname(n.surname);
    setDescription(n.description);
    setBirthDate(n.birthDate?.split("T")[0] || "");
    setPlaceOfBirth(n.placeOfBirth || "");
    setNationality(n.nationality || "");
    setNumber(n.number);
    setPosition(n.position);
    setIsFeatured(n.isFeatured);
    setPreviousClubs(n.previousClubs?.join(", ") || "");
  };

  const deletePlayer = async (id) => {
    if (!window.confirm("Delete player?")) return;
    try {
      await api.delete(`/player/${id}`);
      loadPlayers();

      setNotification({
        type: "success",
        message: "Igrač uspješno obrisan"
      });
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
      <h1>Igrači</h1>

      <div className="admin-form">
        <label>Ime</label>
        <input placeholder="Ime" value={name} onChange={e => setName(e.target.value)} />
        <label>Prezime</label>
        <input placeholder="Prezime" value={surname} onChange={e => setSurname(e.target.value)} />
        <label>Biografija</label>
        <textarea placeholder="Biografija" value={description} onChange={e => setDescription(e.target.value)} />

        <label>Datum rođenja</label>
        <input type="date" placeholder="Birth Date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        <label>Mjesto rođenja</label>
        <input placeholder="Mjesto rođenja" value={placeOfBirth} onChange={e => setPlaceOfBirth(e.target.value)} />
        <label>Nacionalnost</label>
        <input placeholder="Nacionalnost" value={nationality} onChange={e => setNationality(e.target.value)} />

        <label>Broj dresa</label>
        <input type="number" placeholder="Number" value={number} onChange={e => setNumber(e.target.value)} />
        <label>Pozicija</label>
        <input placeholder="Pozicija" value={position} onChange={e => setPosition(e.target.value)} />
        <label>Bivši klubovi</label>
        <input type="text" placeholder="Bivši klubovi (odvojeno zarezom)" value={previousClubs} onChange={e => setPreviousClubs(e.target.value)} />

        <label>
          Thumbnail:
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        </label>
        {editingPlayer && players.find(n => n.id === editingPlayer)?.thumbnailUrl && !thumbnail && (
            <div className="preview-container">
              <span className="preview-label">Current Thumbnail:</span>
              <img
                src={`https://localhost:7010${players.find(n => n.id === editingPlayer).thumbnailUrl}`}
                alt="Current Thumbnail"
                className="thumbnail-preview"
              />
            </div>
          )}
        {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Preview" className="thumbnail-preview" />}

        <label>
          Featured:
          <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
        </label>

        <div className="form-actions">
          <button onClick={savePlayer}>{editingPlayer ? "Ažuriraj" : "Napravi"}</button>
          <button className="btn cancel" onClick={resetForm}>Poništi</button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Puno ime</th>
            <th>Broj dresa</th>
            <th>Pozicija</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {players.map(p => (
            <tr key={p.id}>
              <td>{p.name} {p.surname}</td>
              <td>{p.number}</td>
              <td>{p.position}</td>
              <td className="actions">
                <button className="btn edit" onClick={() => editPlayer(p.id)}>Ažuriraj</button>
                <button className="btn delete" onClick={() => deletePlayer(p.id)}>Izbriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
