import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import RequireAuth from './auth/RequireAuth'
import Home from "./pages/Home.tsx";
import Register from "./auth/Register.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<RequireAuth />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}