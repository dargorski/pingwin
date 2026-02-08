import type {ReactNode} from 'react'
import './admin.css'
import {AdminNav} from "./AdminNav/AdminNav.tsx";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="admin-layout">
            <AdminNav />
            <main className="admin-content">{children}</main>
        </div>
    )
}