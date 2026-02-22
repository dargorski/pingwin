import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const login = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!email || !password) {
                setError('Uzupełnij email i hasło');
                return;
            }

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h1 className="login-title">PingWin</h1>
                <p className="login-subtitle">Zaloguj się do systemu</p>

                {error && <div className="login-error">{error}</div>}

                <input className="login-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input className="login-input" type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="login-button" onKeyDown={(e) => e.key === 'Enter' && login()} onClick={login} disabled={loading}>
                    {loading ? 'Logowanie...' : 'Zaloguj'}
                </button>

                <p className="login-footer">
                    Nie masz konta? <Link to="/register">Zarejestruj się</Link>
                </p>
            </div>
        </div>
    );
}
