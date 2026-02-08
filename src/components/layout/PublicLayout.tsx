import {Navbar} from "./Navbar.tsx";
import type {ReactNode} from "react";

export const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar title={'Marzec 2026'}/>
            <main>{children}</main>
        </div>
    )
}