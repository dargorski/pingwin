import { useEffect, useState } from 'react'
import type {Class} from "../../Models/Class.tsx";

type Props = {
    open: boolean
    initial?: Class | null
    onClose: () => void
    onSave: (data: Partial<Class>) => void
}

export const ClassModal = ({ open, initial, onClose, onSave }: Props) => {
    const [title, setTitle] = useState('')
    const [startsAt, setStartsAt] = useState('')
    const [capacity, setCapacity] = useState(8)
    const [price, setPrice] = useState('')

    useEffect(() => {
        if (initial) {
            setTitle(initial.title ?? '')
            setStartsAt(initial.starts_at.slice(0, 16))
            setCapacity(initial.capacity)
            setPrice(initial.price_override?.toString() ?? '')
        } else {
            setTitle('')
            setStartsAt('')
            setCapacity(8)
            setPrice('')
        }
    }, [initial, open])

    if (!open) return null

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{initial ? 'Edytuj' : 'Nowy'} trening</h2>

                <input
                    placeholder="Tytuł (opcjonalny)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="datetime-local"
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Pojemność"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                />

                <input
                    type="number"
                    placeholder="Cena (opcjonalna)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <div className="modal-actions">
                    <button
                        onClick={() =>
                            onSave({
                                title: title || null,
                                starts_at: startsAt,
                                capacity,
                                price_override: price ? Number(price) : null,
                            })
                        }
                        disabled={!startsAt || capacity <= 0}
                    >
                        Zapisz
                    </button>
                    <button onClick={onClose}>Anuluj</button>
                </div>
            </div>
        </div>
    )
}