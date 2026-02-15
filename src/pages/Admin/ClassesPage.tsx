import {useContext, useState} from 'react'
import { updateClass } from '../../services/classes'
import type {Class} from "../../Models/Class.tsx";
import {ClassModal} from "../../components/admin/ClassModal.tsx";
import type {Signup} from "../../Models/Signup.tsx";
import {getClassDetails} from "../../services/classDetails.ts";
import {ClassDetailsDrawer} from "../../components/admin/ClassDetailsDrawer/ClassDetailsDrawer.tsx";
import {observer} from "mobx-react";
import {AdminContext} from "./AdminContext.ts";

export const ClassesPage = observer(() => {
    const admin = useContext(AdminContext);
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<Class | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedClass, setSelectedClass] = useState<Class | null>(null)
    const [signups, setSignups] = useState<Signup[]>([])

    const handleSave = async (data: Class) => {
        if (editing) {
            await updateClass(editing.id!, data)
        } else {
            await admin.adminClasses.createClass(data);
            
        }
        setModalOpen(false)
        setEditing(null)
    }
    const openDetails = async (c: Class) => {
        setSelectedClass(c)
        setDrawerOpen(true)
        setSignups(await getClassDetails(c.id!))
    }
    return (
        <>
            <header className="admin-header">
                <h1>Treningi</h1>
                <button onClick={() => setModalOpen(true)}>+ Dodaj trening</button>
            </header>

                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Tytuł</th>
                        <th>Miejsca</th>
                        <th>Status</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {admin.adminClasses.classes.map((c) => (
                        <tr key={c.id}>
                            <td>
                                {new Date(c.starts_at).toLocaleString('pl-PL', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </td>
                            <td>{c.title ?? '—'}</td>
                            <td>{c.capacity}</td>
                            <td>{c.cancelled ? 'Anulowany' : 'Aktywny'}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditing(c)
                                        setModalOpen(true)
                                    }}
                                >
                                    Edytuj
                                </button>

                                {!c.cancelled && (
                                    <button
                                        onClick={async () => {
                                            await updateClass(c.id!, { cancelled: true })
                                        }}
                                    >
                                        Anuluj
                                    </button>
                                )}
                                <button onClick={() => openDetails(c)}>
                                    Szczegóły
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>


            <ClassModal
                open={modalOpen}
                initial={editing}
                onClose={() => {
                    setModalOpen(false)
                    setEditing(null)
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
    )
});