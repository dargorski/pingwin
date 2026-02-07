import './MonthCalendar.css'
import type {Class} from "../../Models/Class.tsx";
import {dateWithHackXd} from "./utils.ts";
import {useContext} from "react";
import {AppContext} from "../../AppContext.ts";
import {observer} from "mobx-react";

type MonthCalendarProps = {
    year: number
    month: number // 0-11 (JS Date)
    onDayClick?: (date: string) => void;
}

export const MonthCalendar = observer((props: MonthCalendarProps) => {
    const app = useContext(AppContext);
    const firstDay = new Date(props.year, props.month, 1);
    const lastDay = new Date(props.year, props.month + 1, 0);

    const startWeekday = (firstDay.getDay() + 6) % 7 // poniedziałek = 0
    const totalDays = lastDay.getDate()

    const cells: (Class | null)[] = []

    for (let i = 0; i < startWeekday; i++) {
        cells.push(null)
    }

    for (let d = 1; d <= totalDays; d++) {
        const date = dateWithHackXd(new Date(props.year, props.month, d));
        const classDate = app.classes.classList.find(x => x.starts_at.slice(0, 10) === date);

        cells.push(
            classDate ?? {
                starts_at: date,
                capacity: 0,
                taken_slots: 0,
            }
        )
    }

    return (
        <div className="calendar-wrapper">
            <div className="calendar">
                <div className="calendar-header">
                    {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map((d) => (
                        <div key={d} className="calendar-header-cell">
                            {d}
                        </div>
                    ))}
                </div>

                <div className="calendar-grid">
                    {cells.map((cell, idx) => {
                        if (!cell) {
                            return <div key={idx} className="calendar-cell empty"/>
                        }

                        const isFull =
                            cell.capacity > 0 && cell.taken_slots >= cell.capacity
                        const hasTraining = cell.capacity > 0

                        let className = 'calendar-cell'
                        if (isFull) className += ' full'
                        else if (hasTraining) className += ' active'
                        const signedUp = app.classes.signupList.some(s => s.class_id === cell.id);
                        
                        if (signedUp) className += ' already-signed';

                        return (
                            <div
                                key={cell.starts_at}
                                className={className}
                                onClick={() => props.onDayClick?.(cell?.starts_at.slice(0, 10))}
                            >
              <span className="day-number">
                {new Date(cell.starts_at?.slice(0, 10)).getDate()}
              </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
});