import { type ReactNode, useContext, useEffect } from 'react';
import './admin.css';
import { AdminNav } from './AdminNav/AdminNav.tsx';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AppContext } from '../../AppContext.ts';

export const AdminLayout = observer(({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const app = useContext(AppContext);

    useEffect(() => {
        if (!app.userInfo.IsAdmin) {
            app.userInfo.setAdmin().then(() => checkAdmin());
        }
    }, []);

    const checkAdmin = async () => {
        if (!app.userInfo.IsAdmin) navigate('/dashboard');
    };

    if (!app.userInfo.IsAdmin) return null;

    return (
        <div className="admin-layout">
            <AdminNav />
            <main className="admin-content">{children}</main>
        </div>
    );
});
