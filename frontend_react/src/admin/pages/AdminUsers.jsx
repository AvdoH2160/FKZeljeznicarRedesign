import { useEffect, useState } from "react";
import api from "../../services/api";
import "./adminUsers.css"

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const ban = id => api.post(`/admin/users/${id}/ban`).then(loadUsers);
  const unban = id => api.post(`/admin/users/${id}/unban`).then(loadUsers);
  const promote = id => api.post(`/admin/users/${id}/promote`).then(loadUsers);
  const remove = id => {
    if (confirm("Obrisati korisnika?")) {
      api.delete(`/admin/users/${id}`).then(loadUsers);
    }
  };

  return (
    <div className="admin-card">
      <h1>Korisnici</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Rola</th>
            <th>Status</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className={u.isBanned ? "badge banned" : "badge active"}>
                  {u.isBanned ? "BANNED" : "ACTIVE"}
                </span>
              </td>
              <td className="actions">
                {!u.isBanned ? (
                  <button className="btn ban" onClick={() => ban(u.id)}>Ban</button>
                ) : (
                  <button className="btn unban" onClick={() => unban(u.id)}>Unban</button>
                )}

                {u.role !== "Admin" && (
                  <button className="btn promote" onClick={() => promote(u.id)}>
                    Promote
                  </button>
                )}

                <button className="btn delete" onClick={() => remove(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}