import { useState } from 'react'
import { TrainingTypeModal } from '../../components/admin/TrainingTypeModal'

export const TrainingTypesPage = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <header className="admin-header">
                <h1>Rodzaje treningów</h1>
                <button onClick={() => setOpen(true)}>+ Dodaj</button>
            </header>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Cena</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {/* map(training_types) */}
                </tbody>
            </table>

            <TrainingTypeModal open={open} onClose={() => setOpen(false)} />
        </>
    )
}