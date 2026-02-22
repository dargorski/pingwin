import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!fullName || !email || !password) {
                setError('Uzupełnij wszystkie pola');
                return;
            }

            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) throw error;
            if (!data.user) throw new Error('Nie udało się utworzyć użytkownika');

            // 🔥 TYLKO UPDATE (bo trigger już zrobił insert)
            const { error: updateError } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', data.user.id);

            if (updateError) {
                console.log(updateError);
                throw updateError;
            }

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
                <p className="login-subtitle">Utwórz konto</p>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <input className="login-input" type="text" placeholder="Imię i nazwisko" value={fullName} onChange={(e) => setFullName(e.target.value)} />

                    <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input className="login-input" type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button className="login-button" disabled={loading}>
                        {loading ? 'Rejestruję...' : 'Zarejestruj się'}
                    </button>
                </form>

                <p className="login-footer">
                    Masz konto? <Link to="/login">Zaloguj się</Link>
                </p>
            </div>
        </div>
    );
}
