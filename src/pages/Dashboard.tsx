import {useContext, useEffect, useState} from 'react'
import {supabase} from '../lib/supabase'
import type {Class} from "../Models/Class.tsx";
import type {Signup} from "../Models/Signup.tsx";
import {MonthCalendar} from "../components/calendar/MonthCalendar.tsx";
import {SignupModal} from "../components/signupmodal/SignupModal.tsx";
import {SignupItem} from "./SignupItem.tsx";
import {AppContext} from "../AppContext.ts";
import { observer } from 'mobx-react';

export const Dashboard = observer(()=> {
    const app = useContext(AppContext);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        app.classes.initializeData().then(() => {
            setLoading(false);
        })
        
    }, [])
    const handleSignup = async (classId: string) => {
        await supabase.rpc('book_class', {p_class_id: classId}).then((result) => {
            app.classes.signupList.push({id: '', class_id: classId} as Signup);
        })
    }

    const handleDayClick = (date: string) => {
        const classItem = app.classes.classList.find(
            (c) => c.starts_at.slice(0, 10) === date
        )

        if (!classItem) return

        setSelectedClass(classItem)
        setModalOpen(true)
    }

    return (
        <>
        {
            loading ? (<div>Loading</div>) : (
                <>
                    <MonthCalendar year={2026} month={2} classes={app.classes.classList} onDayClick={handleDayClick}/>
                    <SignupModal
                        open={modalOpen}
                        classItem={selectedClass}
                        onClose={() => setModalOpen(false)}
                        onSignup={handleSignup}
                        signups={app.classes.signupList}
                    />

                    <div>
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

                        <h1>Zajęcia na ktore jestem zapisany</h1>
                        {app.classes.signupList.length === 0 && <p>Nie jestes zapisany na zadne zajecia</p>}

                        <ul>
                            {app.classes.signupList.map(signup => <SignupItem signup={signup}
                                                                              classList={app.classes.classList}/>)}
                        </ul>
                    </div>
                </>)
        }
        </>
    )
});