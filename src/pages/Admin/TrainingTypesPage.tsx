import { useEffect, useState } from 'react'
import {
    getTrainingTypes,
    createTrainingType,
    updateTrainingType,
} from '../../services/trainingTypes'
import { TrainingTypeModal } from '../../components/admin/TrainingTypeModal'
import type {TrainingType} from "../../Models/TrainingType.tsx";

export const TrainingTypesPage = () => {
    const [types, setTypes] = useState<TrainingType[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<TrainingType | null>(null)

    const load = async () => {
        setLoading(true)
        setTypes(await getTrainingTypes())
        setLoading(false)
    }

    useEffect(() => {
        load()
    }, [])

    const handleSave = async (data: {
        name: string
        default_price?: number | null
        active: boolean
    }) => {
        if (editing) {
            await updateTrainingType(editing.id, data)
        } else {
            await createTrainingType(data)
        }
        setModalOpen(false)
        setEditing(null)
        load()
    }

    return (
        <>
            <header className="admin-header">
                <h1>Rodzaje treningów</h1>
                <button onClick={() => setModalOpen(true)}>+ Dodaj</button>
            </header>

            {loading ? (
                <p>Ładowanie…</p>
            ) : (
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Cena</th>
                        <th>Status</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {types.map((t) => (
                        <tr key={t.id}>
                            <td>{t.name}</td>
                            <td>{t.default_price ? `${t.default_price} zł` : '—'}</td>
                            <td>{t.active ? 'Aktywny' : 'Nieaktywny'}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditing(t)
                                        setModalOpen(true)
                                    }}
                                >
                                    Edytuj
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <TrainingTypeModal
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