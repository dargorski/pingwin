import {Route, Routes} from "react-router-dom"
import { UserLayout } from "../../components/layout/UserLayout"
import {Dashboard} from "../Dashboard/Dashboard.tsx";

export const UserPage = () => {
    return (
        <UserLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </UserLayout>
    )
}