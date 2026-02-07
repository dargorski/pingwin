import './SignupModal.css'
import type {Class} from "../../Models/Class.tsx";
import type {Signup} from "../../Models/Signup.tsx";
import {useState} from "react";

type Props = {
    open: boolean
    onClose: () => void
    classItem: Class | null
    onSignup: (classId: string) => Promise<void>
    signups: Signup[];
}

export const SignupModal = ({
                                open,
                                onClose,
                                classItem,
                                onSignup,
                                signups
                            }: Props) => {
    
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    if (!open || !classItem) return null

    const isFull = classItem.taken_slots >= classItem.capacity

    const date = new Date(classItem.starts_at)
    const formattedDate = date.toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    //const alreadySigned = signups.find(s => s.class_id === classItem.id);

    const handleSignup = async () => {
        setStatus('loading')
        await onSignup(classItem.id!)
        setStatus('success')

        setTimeout(() => {
            setStatus('idle')
            onClose()
        }, 1200)
    }


    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{formattedDate}</h2>

                {status === 'idle' && (
                    <>
                        <p>
                            Miejsca: {classItem.taken_slots} / {classItem.capacity}
                        </p>

                        <button
                            className="signup-btn"
                            disabled={isFull}
                            onClick={handleSignup}
                        >
                            {isFull ? 'Brak miejsc' : 'Zapisz się'}
                        </button>
                    </>
                )}

                {status === 'loading' && (
                    <div className="loader" />
                )}

                {status === 'success' && (
                    <div className="success">
                        <div className="checkmark">✓</div>
                        <p>Zapisano!</p>
                    </div>
                )}
            </div>
        </div>
    )
}