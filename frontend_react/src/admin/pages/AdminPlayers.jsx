import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./adminPlayers.css";

export default function AdminPlayers() {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);

  // Form state
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

  // Load players
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

  // Create or Update
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
        await api.put(`/player/${editingPlayer.id}`, formData);
      } else {
        await api.post("/player", formData);
      }
      resetForm();
      loadPlayers();
    } catch (err) {
      console.error(err);
    }
  };

  const editPlayer = (player) => {
    setEditingPlayer(player);
    setName(player.name);
    setSurname(player.surname);
    setDescription(player.description);
    setBirthDate(player.birthDate?.split("T")[0] || "");
    setPlaceOfBirth(player.placeOfBirth || "");
    setNationality(player.nationality || "");
    setNumber(player.number);
    setPosition(player.position);
    setIsFeatured(player.isFeatured);
    setPreviousClubs(player.previousClubs?.join(", ") || "");
  };

  const deletePlayer = async (id) => {
    if (!window.confirm("Delete player?")) return;
    await api.delete(`/player/${id}`);
    loadPlayers();
  };

  return (
    <div className="admin-players">
      <h1>Players</h1>

      {/* Form */}
      <div className="player-form">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

        <input type="date" placeholder="Birth Date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        <input placeholder="Place of Birth" value={placeOfBirth} onChange={e => setPlaceOfBirth(e.target.value)} />
        <input placeholder="Nationality" value={nationality} onChange={e => setNationality(e.target.value)} />

        <input type="number" placeholder="Number" value={number} onChange={e => setNumber(e.target.value)} />
        <input placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
        <input type="text" placeholder="Previous Clubs (comma separated)" value={previousClubs} onChange={e => setPreviousClubs(e.target.value)} />

        <label>
          Thumbnail:
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        </label>
        {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt="Preview" className="thumbnail-preview" />}

        <label>
          Featured:
          <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
        </label>

        <div className="form-actions">
          <button onClick={savePlayer}>{editingPlayer ? "Update" : "Create"}</button>
          <button className="cancel" onClick={resetForm}>Cancel</button>
        </div>
      </div>

      {/* Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(p => (
            <tr key={p.id}>
              <td>{p.name} {p.surname}</td>
              <td>{p.number}</td>
              <td>{p.position}</td>
              <td className="actions">
                <button className="edit" onClick={() => editPlayer(p)}>Edit</button>
                <button className="delete" onClick={() => deletePlayer(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
