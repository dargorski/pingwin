import { Navbar } from './Navbar.tsx';
import type { ReactNode } from 'react';

export const UserLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar showCalendarHeader />
            <main>{children}</main>
        </div>
    );
};
