import { Navigate, Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

export default function RequireAuth() {
    const app = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        app.userInfo.initialize().then(() => setLoading(false));
    }, []);

    if (loading) return null;
    if (!app.userInfo.IsAuthenticated) return <Navigate to="/login" />;

    return <Outlet />;
}
