import {observer} from "mobx-react";
import type {Class} from "../../Models/Class.tsx";
import {useContext, useState} from "react";
import {AppContext} from "../../AppContext.ts";

interface SignupClassModalItemProps {
    selectedClass: Class;
    onSignup: (classId: string) => Promise<void>
    onUnsignup: (classId: string) => Promise<void>
}

export const SignupClassModalItem = observer((props: SignupClassModalItemProps) => {
    const app = useContext(AppContext);

    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
    const isSignedUp = app.classes.signupList.some(s => s.class_id === props.selectedClass.id);

    const date = new Date(props.selectedClass.starts_at)
    const time = date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
    })
    const handleAction = async () => {
        setStatus('loading')

        if (isSignedUp) {
            await props.onUnsignup(props.selectedClass.id!)
        } else {
            await props.onSignup(props.selectedClass.id!)
        }

        setStatus('success')

        setTimeout(() => {
            setStatus('idle')
        }, 1200)
    }
    
    const title = () => {
        return props.selectedClass.title !== '' ? `${props.selectedClass.title} - ${time}` : time;
    }

    return (<div className='signup-item'>
            {status === 'idle' && (
            <>
                <div className="title-info-box">
                    <p>{title()}</p>
                </div>
                {isSignedUp && (
                    <div className="info-box">
                        <p>
                            Jesteś zapisany na te zajęcia 🏓
                        </p>
                    </div>
                )}

                <button
                    className={isSignedUp ? 'danger-btn' : 'signup-btn'}
                    onClick={handleAction}
                >
                    {isSignedUp ? 'Wypisz się' : 'Zapisz się'}
                </button>
            </>
        )}

            {status === 'loading' && <div className="loader"/>}

            {status === 'success' && (
                <div className="success">
                    <div className="checkmark">✓</div>
                    <p>{isSignedUp ? 'Zapisano' : 'Wypisano'}</p>
                </div>
            )}
        </div>
    )
});