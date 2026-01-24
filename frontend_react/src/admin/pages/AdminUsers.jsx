import { useEffect, useState } from "react";
import api from "../../services/api";
import "../admin.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const ban = id => {
    try {
      api.post(`/admin/users/${id}/ban`).then(loadUsers);
      setNotification({
        type: "success",
        message: "Akcija uspješna"
      });
    } catch {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  }

  const unban = id => {
    try {
      api.post(`/admin/users/${id}/unban`).then(loadUsers);
      setNotification({
        type: "success",
        message: "Akcija uspješna"
      });
    } catch {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  }

  const promote = id => {
    try {
       api.post(`/admin/users/${id}/promote`).then(loadUsers);
      setNotification({
        type: "success",
        message: "Akcija uspješna"
      });
    } catch {
      setNotification({
        type: "error",
        message: "Akcija nije uspješna"
      });
    }
    setTimeout(() => setNotification(null), 3000);
  }
  const remove = id => {
    if (confirm("Obrisati korisnika?")) {
      try {
        api.delete(`/admin/users/${id}`).then(loadUsers);
        setNotification({
          type: "success",
          message: "Akcija uspješna"
        });
      } catch {
        setNotification({
          type: "error",
          message: "Akcija nije uspješna"
        });
      }
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="admin-card">
      <h1>Korisnici</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Korisničko ime</th>
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
                    Unaprijedi
                  </button>
                )}

                <button className="btn delete" onClick={() => remove(u.id)}>
                  Izbriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}