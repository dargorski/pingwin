import { Navbar } from './Navbar.tsx';
import type { ReactNode } from 'react';

export const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
};
