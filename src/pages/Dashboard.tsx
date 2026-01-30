import {useEffect, useState} from 'react'
import {supabase} from '../lib/supabase'
import type {Class} from "../Models/Class.tsx";
import type {Signup} from "../Models/Signup.tsx";
import {SignupItem} from "./SignupItem.tsx";

export default function Dashboard() {
    const [classes, setClasses] = useState<Class[]>([])
    const [signups, setSignups] = useState<Signup[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('dashboard')
        initializeData();
    }, [])

    const initializeData = async () => {
        await loadClasses();
        await loadSignups();
        setLoading(false);
    }
    const loadClasses = async () => {
        console.log('load classes')
        const { data, error } = await supabase
            .from('classes')
            .select('*')
            .order('starts_at', { ascending: true })

        if (!error && data) {
            setClasses(data)
        }
    }
    
    const loadSignups = async () => {
        const { data, error } = await supabase
            .from('signups')
            .select('*');

        if (!error && data) {
            setSignups(data)
        }
    }

    const signUp = async (classId: string) => {
        await supabase.rpc('book_class', { p_class_id: classId }).then((result) => {
            console.log(result)
        })
    }

    if (loading) return <p>Ładowanie…</p>

    return (
        <div>
            <h1>Zajęcia</h1>

            {classes.length === 0 && <p>Brak zajęć</p>}

            <ul>
                {classes.map(c => (
                    <li key={c.id}>
                        <strong>{c.title}</strong><br />
                        {new Date(c.starts_at).toLocaleString()}<br />
                        Limit: {c.capacity}<br />
                        <button onClick={() => signUp(c.id)}>
                            Zapisz się
                        </button>
                    </li>
                ))}
            </ul>

            <h1>Zajęcia na ktore jestem zapisany</h1>
            {signups.length === 0 && <p>Nie jestes zapisany na zadne zajecia</p>}
            
            <ul>
                {signups.map(signup => <SignupItem signup={signup} classList={classes} />)}
            </ul>
        </div>
    )
}