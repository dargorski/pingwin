import { NavLink } from 'react-router-dom'

export const AdminNav = () => {
    return (
        <aside className="admin-nav">
            <h2>Admin</h2>

            <NavLink to="/admin/training-types">Rodzaje treningów</NavLink>
            <NavLink to="/admin/classes">Treningi</NavLink>
            <NavLink to="/admin/payments">Rozliczenia</NavLink>
        </aside>
    )
}