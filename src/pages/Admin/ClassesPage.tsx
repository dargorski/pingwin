import { useContext, useState } from 'react';
import { updateClass } from '../../services/classes';
import type { Class } from '../../Models/Class.tsx';
import { ClassModal } from '../../components/admin/ClassModal.tsx';
import type { Signup } from '../../Models/Signup.tsx';
import { getClassDetails } from '../../services/classDetails.ts';
import { ClassDetailsDrawer } from '../../components/admin/ClassDetailsDrawer/ClassDetailsDrawer.tsx';
import { observer } from 'mobx-react';
import { AdminContext } from './AdminContext.ts';
import { AppLoader } from '../../components/ui/AppLoader.tsx';
import './ClassesPage.css';

export const ClassesPage = observer(() => {
    const admin = useContext(AdminContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Class | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);
    const [signups, setSignups] = useState<Signup[]>([]);
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const classes = admin.adminClasses?.classes.filter(
        (c) => new Date(c.starts_at) < new Date(year, month + 1, 0) && new Date(c.starts_at) > new Date(year, month, 1)
    );

    const handleSave = async (data: Class) => {
        if (editing) {
            await updateClass(editing.id!, data);
        } else {
            await admin.adminClasses.createClass(data);
        }
        setModalOpen(false);
        setEditing(null);
    };
    const openDetails = async (c: Class) => {
        setSelectedClass(c);
        setDrawerOpen(true);
        setSignups(await getClassDetails(c.id!));
    };

    return (
        <div>
            {admin.loading ? (
                <AppLoader />
            ) : (
                <>
                    <header className="admin-header">
                        <h1>Treningi</h1>
                        <button className="add-class-button" onClick={() => setModalOpen(true)}>
                            + Dodaj trening
                        </button>
                    </header>
                    <div className="classes-controls">
                        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <option key={i} value={i}>
                                    {new Date(0, i).toLocaleString('pl-PL', { month: 'long' })}
                                </option>
                            ))}
                        </select>

                        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                            {[2025, 2026, 2027].map((y) => (
                                <option key={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <div className="classes-grid">
                        {classes.map((c) => {
                            const percent = c.taken_slots === undefined ? 0 : c.capacity > 0 ? Math.round((c.taken_slots / c.capacity) * 100) : 0;

                            return (
                                <div key={c.id} className="class-card">
                                    <div className="class-header">
                                        <div>
                                            <div className="class-date">{new Date(c.starts_at).toLocaleString('pl-PL')}</div>

                                            <div className="class-title">{c.title || 'Trening'}</div>
                                        </div>

                                        {c.cancelled ? (
                                            <span className="status-badge cancelled">Anulowany</span>
                                        ) : (
                                            <span className="status-badge active">Aktywny</span>
                                        )}
                                    </div>

                                    <div className="class-capacity">
                                        <div className="capacity-text" title={`${c.taken_slots} zapisanych zawodników`}>
                                            👥 {c.taken_slots} / {c.capacity}
                                        </div>

                                        <div className="progress-bar">
                                            <div className={`progress-fill ${percent >= 100 ? 'full' : ''}`} style={{ width: `${percent}%` }} />
                                        </div>
                                    </div>

                                    {c.price_override && <div className="price-info">💰 Cena: {c.price_override} zł</div>}

                                    <div className="class-actions">
                                        <button
                                            onClick={() => {
                                                setEditing(c);
                                                setModalOpen(true);
                                            }}
                                        >
                                            Edytuj
                                        </button>
                                        <button onClick={() => openDetails(c)}>Szczegóły</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ClassModal
                        open={modalOpen}
                        initial={editing}
                        onClose={() => {
                            setModalOpen(false);
                            setEditing(null);
                        }}
                        onSave={handleSave}
                    />
                    <ClassDetailsDrawer
                        open={drawerOpen}
                        classItem={selectedClass}
                        signups={signups}
                        onClose={() => setDrawerOpen(false)}
                        onMove={() => console.log('move')}
                        onRemove={(s) => console.log('remove', s)}
                    />
                </>
            )}
        </div>
    );
});
