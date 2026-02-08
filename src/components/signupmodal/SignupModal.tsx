import './SignupModal.css'
import type {Class} from "../../Models/Class.tsx";
import {SignupClassModalItem} from "./SignupClassModalItem.tsx";

type Props = {
    isVisible: boolean
    onClose: () => void
    classes: Class[];
    onSignup: (classId: string) => Promise<void>
    onUnsignup: (classId: string) => Promise<void>
}

export const SignupModal = (props: Props) => {
    
    if (!props.isVisible || props.classes.length === 0) return null    

    const date = new Date(props.classes[0].starts_at)
    const formattedDate = date.toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    return (
        <div className="modal-backdrop" onClick={props.onClose}>
            <div className="modal info" onClick={(e) => e.stopPropagation()}>
                <h2>{formattedDate}</h2>
                <div className="classes-wrapper">{props.classes.map((item) => <SignupClassModalItem selectedClass={item} onSignup={props.onSignup} onUnsignup={props.onUnsignup} />)}</div>
                <button className="close-btn" onClick={props.onClose}>
                    Zamknij
                </button>
            </div>
            
        </div>
    )
}