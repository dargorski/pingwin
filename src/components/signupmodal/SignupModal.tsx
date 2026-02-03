import './SignupModal.css'
import type {Class} from "../../Models/Class.tsx";
import type {Signup} from "../../Models/Signup.tsx";

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
    if (!open || !classItem) return null
    console.log(signups);

    const isFull = classItem.taken_slots >= classItem.capacity

    const date = new Date(classItem.starts_at)
    const formattedDate = date.toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })
    
    const alreadySigned = signups.find(s => s.class_id === classItem.id);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{formattedDate}</h2>

                {classItem.capacity > 0 ? (
                    <>
                        <p>
                            Miejsca: {classItem.taken_slots} / {classItem.capacity}
                        </p>

                        {alreadySigned ? (<p>Miejsce już dla Ciebie zarezerwowane :)</p>) : (<button
                            className="signup-btn"
                            disabled={isFull}
                            onClick={() => onSignup(classItem.id!)}
                        >
                            {isFull ? 'Brak miejsc' : 'Zapisz się'}
                        </button>)}
                        
                    </>
                ) : (
                    <p>Brak zajęć w tym dniu</p>
                )}

                <button className="close-btn" onClick={onClose}>
                    Zamknij
                </button>
            </div>
        </div>
    )
}