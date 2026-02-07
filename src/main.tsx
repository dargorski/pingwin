import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "./components/layout/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Login from "./auth/Login.tsx";
import Register from "./auth/Register.tsx";
import RequireAuth from "./auth/RequireAuth.tsx";
import Admin from "./pages/Admin.tsx";
import {App} from "./App.ts";
import {Dashboard} from "./pages/Dashboard.tsx";
import { AppContext } from './AppContext.ts';

const app = new App();

app.initialize().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <AppContext.Provider value={app}>
            <BrowserRouter>
                <Navbar title='Marzec 2026'/>
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
            </AppContext.Provider>
        </StrictMode>,
    )
})


