import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Admin() {

    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(false)

    const [title, setTitle] = useState('')
    const [startsAt, setStartsAt] = useState('')
    const [capacity, setCapacity] = useState(8)

    useEffect(() => {
        console.log('odapala sie to w ogole?')
        checkAdmin()
    }, [])

    const checkAdmin = async () => {
        const { data } = await supabase
            .from('profiles')
            .select('role')
            .single()
        
        console.log(data);
        if (data?.role !== 'admin') {
             navigate('/dashboard')
        } else {
            setIsAdmin(true)
        }
    }

    const createClass = async () => {
        const { error } = await supabase.from('classes').insert({
            title,
            starts_at: startsAt,
            capacity,
        })

        if (error) {
            alert(error.message)
        } else {
            alert('Zajęcia dodane')
            setTitle('')
            setStartsAt('')
            setCapacity(8)
        }
    }

    if (!isAdmin) return null

    return (
        <div>
            <h1>Panel admina</h1>

            <h2>Dodaj zajęcia</h2>

            <input
                placeholder="Nazwa zajęć"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <input
                type="datetime-local"
                value={startsAt}
                onChange={e => setStartsAt(e.target.value)}
            />

            <input
                type="number"
                min={1}
                value={capacity}
                onChange={e => setCapacity(Number(e.target.value))}
            />

            <button onClick={createClass}>
                Dodaj
            </button>

            <hr />

            <h2>Raporty</h2>
            <p>(tu podepniemy SQL VIEW z rozliczeniami)</p>
        </div>
    )
}