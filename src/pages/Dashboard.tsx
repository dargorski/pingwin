import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Class = {
    id: string
    title: string
    starts_at: string
    capacity: number
}

export default function Dashboard() {
    const [classes, setClasses] = useState<Class[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('dashboard')
        loadClasses()
    }, [])

    const loadClasses = async () => {
        console.log('load classes')
        const { data, error } = await supabase
            .from('classes')
            .select('*')
            .order('starts_at', { ascending: true })

        if (!error && data) {
            setClasses(data)
        }
        setLoading(false)
    }

    const signUp = async (classId: string) => {
        // docelowo: supabase.rpc('book_class', { p_class_id: classId })
        const { error } = await supabase
            .from('signups')
            .insert({ class_id: classId })

        if (error) {
            alert(error.message)
        } else {
            alert('Zapisano na zajęcia')
        }
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
        </div>
    )
}