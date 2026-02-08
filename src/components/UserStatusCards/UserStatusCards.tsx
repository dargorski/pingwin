import './UserStatusCards.css';
import {useContext} from "react";
import {AppContext} from "../../AppContext.ts";

interface UserStatusCardsProps {
    amountDue: number
    isPaid: boolean
}

export const UserStatusCards = (props: UserStatusCardsProps) => {
    const app = useContext(AppContext);
    const nextTraining = app.classes.getNextClass();
    
    return (
        <div className="status-grid">
            {/* 🏓 Next training */}
            <div className="status-card">
                <div className="status-title">🏓 Mój następny trening</div>

                {nextTraining ? (
                    <>
                        <div className="training-title">
                            {nextTraining.title}
                        </div>
                        <div className="training-date">
                            {new Date(nextTraining.starts_at).toLocaleString('pl-PL', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </>
                ) : (
                    <div className="no-training">
                        Brak zapisów
                    </div>
                )}
            </div>
            {/* 💳 Payments */}
            <div className="status-card">
                <div className="status-title">💳 Rozliczenia</div>

                <div className="amount">
                    {props.amountDue.toFixed(2)} zł
                </div>

                <div className={`payment-status ${props.isPaid ? 'paid' : 'due'}`}>
                    {props.isPaid ? 'Opłacone' : 'Do zapłaty'}
                </div>

                <div className="status-sub">
                    za bieżący miesiąc
                </div>
            </div>

            
        </div>
    )
}