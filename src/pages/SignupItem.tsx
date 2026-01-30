import type {Signup} from "../Models/Signup.tsx";
import type {Class} from "../Models/Class.tsx";

interface SignupItemProps {
    signup: Signup;
    classList: Class[];
}

export const SignupItem = (props: SignupItemProps) => {
    const correspondingClassItem = props.classList.find(c => c.id === props.signup.class_id);
    if (!correspondingClassItem) return null;

    return (
        <li key={props.signup.id}>
            <strong>{correspondingClassItem.title}</strong><br/>
            {new Date(correspondingClassItem.starts_at).toLocaleString()}<br/>
        </li>
    );

}