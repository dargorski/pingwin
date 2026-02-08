import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './AdminNav.css'

export const AdminNav = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Mobile top bar */}
            <div className="admin-topbar">
                <button className="burger" onClick={() => setOpen(true)}>
                    ☰
                </button>
                <span className="topbar-title">Admin Panel</span>
                <img
                    src="/pingwin/pingwin.jpg"
                    alt="PingWin"
                    className="admin-navbar-logo"
                />
            </div>

            {/* Backdrop */}
            {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}

            {/* Sidebar */}
            <aside className={`admin-nav ${open ? 'open' : ''}`}>
                <div className="admin-nav-header">
                    <img
                        src="/pingwin/pingwin.jpg"
                        alt="PingWin"
                        className="admin-navbar-logo"
                    />
                    <div>
                        <div className="title">Admin Panel</div>
                    </div>
                </div>

                <nav className="admin-nav-links">
                    <NavLink to="/admin/training-types" onClick={() => setOpen(false)}>
                        🏷️ Rodzaje treningów
                    </NavLink>

                    <NavLink to="/admin/classes" onClick={() => setOpen(false)}>
                        📅 Treningi
                    </NavLink>

                    <NavLink to="/admin/payments" onClick={() => setOpen(false)}>
                        💳 Rozliczenia
                    </NavLink>
                </nav>

                <div className="admin-nav-footer">
                    <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                        ← Dashboard
                    </NavLink>
                </div>
            </aside>
        </>
    )
}
