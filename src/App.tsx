import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import RequireAuth from './auth/RequireAuth'

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/admin" element={<Admin />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}