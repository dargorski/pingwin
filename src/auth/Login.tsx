import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        await supabase.auth.signInWithPassword({
            email,
            password,
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <input placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
        </div>
    )
}