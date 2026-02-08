import './ClassDetailsDrawer.css'
import type {Signup} from "../../../Models/Signup.tsx";
import type {Class} from "../../../Models/Class.tsx";

type Props = {
    open: boolean
    classItem: Class | null
    signups: Signup[]
    onClose: () => void
    onMove: (signup: Signup) => void
    onRemove: (signup: Signup) => void
}

export const ClassDetailsDrawer = ({
                                       open,
                                       classItem,
                                       signups,
                                       onClose,
                                       onMove,
                                       onRemove,
                                   }: Props) => {
    if (!open || !classItem) return null

    return (
        <>
            <div className="drawer-backdrop" onClick={onClose} />

            <aside className="drawer">
                <header className="drawer-header">
                    <div>
                        <h2>{classItem.title ?? 'Trening'}</h2>
                        <p>
                            {new Date(classItem.starts_at).toLocaleString('pl-PL', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>

                    <button onClick={onClose}>✕</button>
                </header>

                <div className="drawer-body">
                    <h3>
                        Zapisani ({signups.length} / {classItem.capacity})
                    </h3>

                    {signups.length === 0 && (
                        <p className="empty">Brak zapisanych</p>
                    )}

                    <ul className="signup-list">
                        {signups.map((s) => (
                            <li key={s.id} className="signup-row">
                                <div>
                                    <strong>{s.full_name}</strong>
                                    <div className="email">{s.email}</div>
                                </div>

                                <div className="actions">
                                    <button onClick={() => onMove(s)}>
                                        Przenieś
                                    </button>
                                    <button
                                        className="danger"
                                        onClick={() => onRemove(s)}
                                    >
                                        Usuń
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    )
}