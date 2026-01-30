import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const test = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false)

        if (test.error) {
            setError(test.error?.message)
            return
        }

        navigate('/dashboard')
    }

    return (
        <div>
            <h1>Rejestracja</h1>

            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button disabled={loading}>
                    {loading ? 'Rejestruję…' : 'Zarejestruj się'}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <p>
                Masz konto? <Link to="/login">Zaloguj się</Link>
            </p>
        </div>
    )
}