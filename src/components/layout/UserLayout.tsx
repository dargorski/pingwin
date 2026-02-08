import {Navbar} from "./Navbar.tsx";
import {ReactNode} from "react";

export const UserLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="admin-layout">
            <Navbar title={'Marzec 2026'}/>
            <main>{children}</main>
        </div>
    )
}