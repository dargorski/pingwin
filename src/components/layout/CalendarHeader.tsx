import './CalendarHeader.css';
import { AppContext } from '../../AppContext.ts';
import { useContext } from 'react';
import { observer } from 'mobx-react';

export const CalendarHeader = observer(() => {
    const app = useContext(AppContext);
    return (
        <div className="nav-calendar-header">
            <button className="nav-calendar-button" onClick={() => app.setCurrentDate(new Date(app.currentDate.setMonth(app.currentDate.getMonth() - 1)))}>
                ←
            </button>

            <h2 className="nav-calendar-title">
                {app.currentDate.toLocaleString('pl-PL', { month: 'long' })} {app.currentYear}
            </h2>

            <button className="nav-calendar-button" onClick={() => app.setCurrentDate(new Date(app.currentDate.setMonth(app.currentDate.getMonth() + 1)))}>
                →
            </button>
        </div>
    );
});
