import {useEffect, useState} from 'react'
import {supabase} from '../lib/supabase'
import type {Class} from "../Models/Class.tsx";
import type {Signup} from "../Models/Signup.tsx";
import {SignupItem} from "./SignupItem.tsx";
import {Navbar} from "../components/layout/Navbar.tsx";
import {MonthCalendar} from "../components/calendar/MonthCalendar.tsx";
import {SignupModal} from "../components/signupmodal/SignupModal.tsx";

export default function Dashboard() {
    const [classes, setClasses] = useState<Class[]>([])
    const [signups, setSignups] = useState<Signup[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedClass, setSelectedClass] = useState<Class | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        initializeData();
    }, [])

    const initializeData = async () => {
        await loadClasses();
        await loadSignups();
        setLoading(false);
    }
    const loadClasses = async () => {
        const {data, error} = await supabase
            .from('classes')
            .select('*')
            .order('starts_at', {ascending: true})

        if (!error && data) {
            setClasses(data)
        }
    }

    const loadSignups = async () => {
        const {data, error} = await supabase
            .from('signups')
            .select('*');

        if (!error && data) {
            console.log(data);
            setSignups(data)
        }
    }

    const handleSignup = async (classId: string) => {
        await supabase.rpc('book_class', {p_class_id: classId}).then((result) => {
            console.log(result)
        })
    }

    const handleDayClick = (date: string) => {
        const classItem = classes.find(
            (c) => c.starts_at.slice(0, 10) === date
        )

        if (!classItem) return

        setSelectedClass(classItem)
        console.log(signups);
        setModalOpen(true)
    }

    if (loading) return <p>Ładowanie…</p>

    return (
        <><Navbar title="Marzec 2026"/>
            <MonthCalendar year={2026} month={2} classes={classes} onDayClick={handleDayClick} />
            <SignupModal
                open={modalOpen}
                classItem={selectedClass}
                onClose={() => setModalOpen(false)}
                onSignup={handleSignup}
                signups={signups}
            />
        
            {/*<div>*/}
            {/*    <h1>Zajęcia</h1>*/}
            
            {/*    {classes.length === 0 && <p>Brak zajęć</p>}*/}
            
            {/*    <ul>*/}
            {/*        {classes.map(c => (*/}
            {/*            <li key={c.id}>*/}
            {/*                <strong>{c.title}</strong><br/>*/}
            {/*                {new Date(c.starts_at).toLocaleString()}<br/>*/}
            {/*                Limit: {c.capacity}<br/>*/}
            {/*                <button onClick={() => handleSignup(c.id!)}>*/}
            {/*                    Zapisz się*/}
            {/*                </button>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            
            {/*    <h1>Zajęcia na ktore jestem zapisany</h1>*/}
            {/*    {signups.length === 0 && <p>Nie jestes zapisany na zadne zajecia</p>}*/}
            
            {/*    <ul>*/}
            {/*        {signups.map(signup => <SignupItem signup={signup} classList={classes}/>)}*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </>
    )
}