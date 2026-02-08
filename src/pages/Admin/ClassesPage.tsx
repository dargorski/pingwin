import { useEffect, useState } from 'react'
import { getClasses, createClass, updateClass } from '../../services/classes'
import type {Class} from "../../Models/Class.tsx";
import {ClassModal} from "../../components/admin/ClassModal.tsx";

export const ClassesPage = () => {
    const [classes, setClasses] = useState<Class[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<Class | null>(null)

    const load = async () => {
        setLoading(true)
        setClasses(await getClasses())
        setLoading(false)
    }

    useEffect(() => {
        load()
    }, [])

    const handleSave = async (data: Partial<Class>) => {
        if (editing) {
            await updateClass(editing.id!, data)
        } else {
            await createClass(data)
        }
        setModalOpen(false)
        setEditing(null)
        load()
    }

    return (
        <>
            <header className="admin-header">
                <h1>Treningi</h1>
                <button onClick={() => setModalOpen(true)}>+ Dodaj trening</button>
            </header>

            {loading ? (
                <p>Ładowanie…</p>
            ) : (
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
                    {classes.map((c) => (
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
                                            load()
                                        }}
                                    >
                                        Anuluj
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <ClassModal
                open={modalOpen}
                initial={editing}
                onClose={() => {
                    setModalOpen(false)
                    setEditing(null)
                }}
                onSave={handleSave}
            />
        </>
    )
}