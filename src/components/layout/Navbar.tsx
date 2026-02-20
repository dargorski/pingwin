import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './Navbar.css';
import { CalendarHeader } from './CalendarHeader.tsx';
import { useContext } from 'react';
import { AppContext } from '../../AppContext.ts';

interface NavbarProps {
    showCalendarHeader?: boolean;
}

export const Navbar = (props: NavbarProps) => {
    const navigate = useNavigate();
    const app = useContext(AppContext);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        app.userInfo.reset();
        navigate('/login');
    };

    const handleAdmin = () => {
        navigate('/admin');
    };

    return (
        <header className="navbar">
            <div className="navbar-left" onClick={() => navigate('/')}>
                <img src="/pingwin/pingwin.jpg" alt="PingWin" className="navbar-logo" />
            </div>

            {props.showCalendarHeader && <CalendarHeader />}
            {app.userInfo.IsAdmin && (
                <div className="navbar-right">
                    <button onClick={handleAdmin} className="logout-btn">
                        Admin
                    </button>
                </div>
            )}
            {app.userInfo.IsAuthenticated && (
                <div className="navbar-right">
                    <button onClick={handleLogout} className="logout-btn">
                        Wyloguj
                    </button>
                </div>
            )}
        </header>
    );
};
