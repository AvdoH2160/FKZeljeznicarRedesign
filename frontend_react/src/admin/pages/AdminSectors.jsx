import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification";
import "../admin.css";

export default function AdminSectors() {
  const [templates, setTemplates] = useState([]);
  const [code, setCode] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await api.get("/tickets/templates");
      setTemplates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTemplate = async () => {
    if (!code || !capacity || !price) {
      setNotification({ type: "error", message: "Popunite sva polja" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      await api.post("/tickets/templates", {
        code,
        capacity: Number(capacity),
        price: Number(price)
      });
      setNotification({ type: "success", message: "Template dodan" });
      setCode(""); setCapacity(""); setPrice("");
      loadTemplates();
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Neuspješno dodavanje" });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const deleteTemplate = async (id) => {
    if (!window.confirm("Obrisati template?")) return;
    try {
      await api.delete(`/tickets/templates/${id}`);
      setNotification({ type: "success", message: "Template obrisan" });
      loadTemplates();
    } catch {
      setNotification({ type: "error", message: "Neuspješno brisanje" });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="admin-card">
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />
      <h1>Sektori</h1>

      <div className="admin-form">
        <input
          placeholder="Šifra sektora (C1, C2...)"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <input
          placeholder="Kapacitet"
          type="number"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
        />
        <input
          placeholder="Cijena"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <div className="form-actions">
          <button onClick={addTemplate}>Dodaj template</button>
        </div>
      </div>

      <h3>Svi template sektori</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Šifra</th>
            <th>Kapacitet</th>
            <th>Cijena</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {templates.map(t => (
            <tr key={t.id}>
              <td>{t.code}</td>
              <td>{t.capacity}</td>
              <td>{t.price.toFixed(2)} KM</td>
              <td className="actions">
                <button className="btn delete" onClick={() => deleteTemplate(t.id)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
