import { ReactNode } from 'react'
import { AdminNav } from './AdminNav'
import './admin.css'

export const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="admin-layout">
            <AdminNav />
            <main className="admin-content">{children}</main>
        </div>
    )
}