import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Notification from "../components/Notification";
import "../admin.css";

export default function AdminSectors() {
  const [templates, setTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);

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

  const resetForm = () => {
    setEditingTemplate(null);
    setCode("");
    setCapacity("");
    setPrice("");
  };

  const saveTemplate = async () => {
    if (!code || !capacity || !price) {
      setNotification({ type: "error", message: "Popunite sva polja" });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const payload = {
      code,
      capacity: Number(capacity),
      price: Number(price)
    };

    try {
      if (editingTemplate) {
        await api.put(`/tickets/templates/${editingTemplate}`, payload);
        setNotification({
          type: "success",
          message: "Template uspješno ažuriran"
        });
      } else {
        await api.post("/tickets/templates", payload);
        setNotification({
          type: "success",
          message: "Template uspješno dodan"
        });
      }

      resetForm();
      loadTemplates();
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }

    setTimeout(() => setNotification(null), 3000);
  };

  const editTemplate = (id) => {
    const t = templates.find(x => x.id === id);
    if (!t) return;

    setEditingTemplate(t.id);
    setCode(t.code);
    setCapacity(t.capacity.toString());
    setPrice(t.price.toString());
  };

  const deleteTemplate = async (id) => {
    if (!window.confirm("Obrisati template?")) return;

    try {
      await api.delete(`/tickets/templates/${id}`);
      setNotification({
        type: "success",
        message: "Template obrisan"
      });
      loadTemplates();
    } catch {
      setNotification({
        type: "error",
        message: "Neuspješno brisanje"
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

      <h1>{editingTemplate ? "Uredi sektor" : "Sektori"}</h1>

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
          <button className="btn create" onClick={saveTemplate}>
            {editingTemplate ? "Ažuriraj" : "Dodaj"}
          </button>

          {editingTemplate && (
            <button className="btn cancel" onClick={resetForm}>
              Poništi
            </button>
          )}
        </div>
      </div>

      <h3>Svi sektori</h3>
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
                <button className="btn edit" onClick={() => editTemplate(t.id)}>
                  Ažuriraj
                </button>
                <button className="btn delete" onClick={() => deleteTemplate(t.id)}>
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
