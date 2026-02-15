import {type ReactNode, useEffect, useState} from 'react'
import './admin.css'
import {AdminNav} from "./AdminNav/AdminNav.tsx";
import {supabase} from "../../lib/supabase.ts";
import { useNavigate } from 'react-router-dom';
import {observer} from "mobx-react";

export const AdminLayout = observer(({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false)
    
    useEffect(() => {
        checkAdmin();
    }, []);

    const checkAdmin = async () => {
        const { data } = await supabase
            .from('profiles')
            .select('role')
            .single()

        if (data?.role !== 'admin') {
            navigate('/dashboard')
        } else {
            setIsAdmin(true)
        }
    }
    
    if (!isAdmin) return null;
    
    return (
        <div className="admin-layout">
            <AdminNav />
                <main className="admin-content">{children}</main>
            
        </div>
    )
});