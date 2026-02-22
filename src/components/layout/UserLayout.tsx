import { Navbar } from './Navbar.tsx';
import type { ReactNode } from 'react';
import './UserLayout.css';

export const UserLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar showCalendarHeader />
            <main className="UserLayout">{children}</main>
        </div>
    );
};
