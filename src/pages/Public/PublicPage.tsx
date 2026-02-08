import {Route, Routes} from "react-router-dom"
import {PublicLayout} from "../../components/layout/PublicLayout.tsx";
import {Home} from "../Home.tsx";
import Login from "../../auth/Login.tsx";
import Register from "../../auth/Register.tsx";

export const PublicPage = () => {
    return (
        <PublicLayout>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </PublicLayout>
    )
}