import {Outlet, Link} from "react-router-dom";
import "./adminLayout.css"

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>ADMIN</h2>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/news">News</Link>
                <Link to="/admin/memberships">Memberships</Link>
                <Link to="/admin/players">Players</Link>
                <Link to="/admin/games">Games</Link>
                <Link to="/admin/leagues">Leagues</Link>
                <Link to="/admin/teams">Teams</Link>
                <Link to="/admin/products">Products</Link>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    )
}