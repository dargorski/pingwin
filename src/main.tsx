import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "./components/layout/Navbar.tsx";
import Login from "./auth/Login.tsx";
import Register from "./auth/Register.tsx";
import RequireAuth from "./auth/RequireAuth.tsx";
import {App} from "./App.ts";

import { AppContext } from './AppContext.ts';
import {Home} from "./pages/Home.tsx";
import {AdminPage} from "./pages/Admin/AdminPage.tsx";
import {UserPage} from "./pages/User/UserPage.tsx";
import {PublicPage} from "./pages/Public/PublicPage.tsx";

const app = new App();

app.initialize().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <AppContext.Provider value={app}>
            <BrowserRouter basename={'/pingwin'}>
                <Routes>
                    <Route element={<PublicPage />}>
                        <Route index element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<RequireAuth />}>
                        <Route path="/admin/*" element={<AdminPage />} />
                        <Route path="/dashboard" element={<UserPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </AppContext.Provider>
        </StrictMode>,
    )
})


