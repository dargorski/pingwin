import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout } from '../../components/admin/AdminLayout'
import { TrainingTypesPage } from './TrainingTypesPage'
import { ClassesPage } from './ClassesPage'
import { PaymentsPage } from './PaymentsPage'

export const AdminPage = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route path="/" element={<Navigate to="training-types" />} />
                <Route path="training-types" element={<TrainingTypesPage />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="payments" element={<PaymentsPage />} />
            </Routes>
        </AdminLayout>
    )
}