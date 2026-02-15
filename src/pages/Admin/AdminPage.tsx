import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { TrainingTypesPage } from './TrainingTypesPage'
import { ClassesPage } from './ClassesPage'
import { PaymentsPage } from './PaymentsPage'
import {Admin} from "./Admin.ts";
import {useEffect, useState} from "react";
import {AppLoader} from "../../components/ui/AppLoader.tsx";
import {AdminContext} from "./AdminContext.ts";

export const AdminPage = () => {
    const admin = new Admin();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        admin.initialize().then(() => setLoading(false));
    })
    return (
        <>
        {loading ? (<AppLoader/>) : 
            <AdminContext.Provider value={admin}>
            <AdminLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="classes" />} />
                    <Route path="training-types" element={<TrainingTypesPage />} />
                    <Route path="classes" element={<ClassesPage />} />
                    <Route path="payments" element={<PaymentsPage />} />
                </Routes>
            </AdminLayout>  
            </AdminContext.Provider>}
        </>
    )
}