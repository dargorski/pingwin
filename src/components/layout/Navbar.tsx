import {useNavigate} from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import './Navbar.css'

type NavbarProps = {
    title: string;
}

export const Navbar = ({ title }: NavbarProps) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }
    
    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <header className="navbar">
            <div className="navbar-left" onClick={() => navigate('/')}>
                <img
                    src="/pingwin/pingwin.jpg"
                    alt="PingWin"
                    className="navbar-logo"
                />
            </div>

            <div className="navbar-center">
                <h1>{title}</h1>
            </div>
            <div className="navbar-right">
                <button onClick={handleAdmin} className="logout-btn">
                    Admin
                </button>
            </div>

            <div className="navbar-right">
                <button onClick={handleLogout} className="logout-btn">
                    Wyloguj
                </button>
            </div>
        </header>
    )
}