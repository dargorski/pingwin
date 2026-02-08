import './Dashboard.css';
import {useContext, useEffect, useState} from 'react'
import { observer } from 'mobx-react';
import {AppContext} from "../../AppContext.ts";
import { supabase } from '../../lib/supabase.ts';
import { MonthCalendar } from '../../components/calendar/MonthCalendar.tsx';
import {UserStatusCards} from "../../components/UserStatusCards/UserStatusCards.tsx";
import {SignupModal} from "../../components/signupmodal/SignupModal.tsx";
import type {Class} from "../../Models/Class.tsx";

export const Dashboard = observer(()=> {
    const app = useContext(AppContext);
    const [selectedClasses, setSelectedClasses] = useState<Class[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        app.classes.initializeData().then(() => {
            setLoading(false);
        })
        
    }, [])
    const handleSignup = async (classId: string) => {
        await supabase.rpc('book_class', {p_class_id: classId}).then(() => {
            app.classes.addToSignupList(classId);
        })
    }
    
    const handleUnsignup = async (classId: string) => {
        await supabase.rpc('unbook_class', {p_class_id: classId}).then(() => {
            app.classes.removeFromSignupList(classId);
        })
    }

    const handleDayClick = (date: string) => {
        const classItem = app.classes.classList.filter(
            (c) => c.starts_at.slice(0, 10) === date
        )

        if (!classItem) return

        setSelectedClasses(classItem)
        setModalOpen(true)
    }
    
    return (
        <>
        {
            loading ? (<div>Loading</div>) : (
                <div className="dashboard-wrapper">
                    <MonthCalendar year={2026} month={2} onDayClick={handleDayClick}/>
                    <UserStatusCards amountDue={300} isPaid={true}/>
                    <SignupModal
                        isVisible={modalOpen}
                        classes={selectedClasses}
                        onClose={() => setModalOpen(false)}
                        onSignup={handleSignup}
                        onUnsignup={handleUnsignup}
                    />
                </div>)
        }
        </>
    )
});