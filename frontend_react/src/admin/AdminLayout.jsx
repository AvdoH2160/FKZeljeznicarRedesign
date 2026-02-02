import {Outlet, Link} from "react-router-dom";
import "./adminLayout.css"

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>ADMIN</h2>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/users">Korisnici</Link>
                <Link to="/admin/news">Vijesti</Link>
                <Link to="/admin/memberships">Članarine</Link>
                <Link to="/admin/players">Igrači</Link>
                <Link to="/admin/games">Utakmice</Link>
                <Link to="/admin/leagues">Lige</Link>
                <Link to="/admin/teams">Timovi</Link>
                <Link to="/admin/products">Proizvodi</Link>
                <Link to="/admin/sectors">Stadion</Link>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    )
}