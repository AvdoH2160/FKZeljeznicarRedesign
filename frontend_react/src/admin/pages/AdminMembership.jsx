import { useEffect, useState } from "react";
import api from "../../services/api";
import "../admin.css";

export default function AdminMemberships() {
  const [pending, setPending] = useState([]);
  const [active, setActive] = useState([]);

  const loadPending = () => api.get("/membership/pending").then(res => setPending(res.data));
  const loadActive = () => api.get("/membership/active").then(res => setActive(res.data));

  useEffect(() => {
    loadPending();
    loadActive();
  }, []);

  const approveMembership = async (id) => {
    if (!window.confirm("Potvrditi članstvo?")) return;
    await api.post(`/membership/approve/${id}`);
    loadPending();
    loadActive();
  };

  const rejectMembership = async (id) => {
    if (!window.confirm("Odbiti članstvo?")) return;
    await api.post(`/membership/reject/${id}`);
    loadPending();
  };

  const getStatusLabel = (status) => {
    switch(status){
      case 0: return "Na čekanju";
      case 1: return "Odobreno";
      case 2: return "Odbijeno";
      default: return "Nepoznato";
    }
  };

  return (
    <div className="admin-card">
      <h1>Članstva na čekanju</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ime i Prezime</th>
            <th>Email</th>
            <th>Grad</th>
            <th>Godina</th>
            <th>Status</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {pending.length === 0 ? (
            <tr><td colSpan={6}>Nema članstva na čekanju</td></tr>
          ) : pending.map(m => (
            <tr key={m.id}>
              <td>{m.firstName} {m.lastName}</td>
              <td>{m.email}</td>
              <td>{m.city}</td>
              <td>{m.year}</td>
              <td>{getStatusLabel(m.status)}</td>
              <td className="actions">
                <button className="btn approve" onClick={() => approveMembership(m.id)}>Potvrdi</button>
                <button className="btn reject" onClick={() => rejectMembership(m.id)}>Odbij</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 style={{marginTop: "40px"}}>Aktivne članarine</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ime i Prezime</th>
            <th>Email</th>
            <th>Grad</th>
            <th>Godina</th>
            <th>Broj kartice</th>
            <th>QR / CodeValue</th>
          </tr>
        </thead>
        <tbody>
          {active.length === 0 ? (
            <tr><td colSpan={6}>Nema aktivnih članarina</td></tr>
          ) : active.map(m => (
            <tr key={m.id}>
              <td>{m.firstName} {m.lastName}</td>
              <td>{m.email}</td>
              <td>{m.city}</td>
              <td>{m.year}</td>
              <td>{m.membershipNumber}</td>
              <td>{m.codeValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}