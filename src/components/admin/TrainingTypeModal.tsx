import { useEffect, useState } from 'react'
import type {TrainingType} from "../../Models/TrainingType.tsx";

type Props = {
    open: boolean
    onClose: () => void
    onSave: (data: {
        name: string
        default_price?: number | null
        active: boolean
    }) => void
    initial?: TrainingType | null
}

export const TrainingTypeModal = ({
                                      open,
                                      onClose,
                                      onSave,
                                      initial,
                                  }: Props) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState<string>('')
    const [active, setActive] = useState(true)

    useEffect(() => {
        if (initial) {
            setName(initial.name)
            setPrice(initial.default_price?.toString() ?? '')
            setActive(initial.active)
        } else {
            setName('')
            setPrice('')
            setActive(true)
        }
    }, [initial, open])

    if (!open) return null

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{initial ? 'Edytuj' : 'Nowy'} rodzaj treningu</h2>

                <input
                    placeholder="Nazwa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Cena (opcjonalna)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label>
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                    />
                    Aktywny
                </label>

                <div className="modal-actions">
                    <button
                        onClick={() =>
                            onSave({
                                name,
                                default_price: price ? Number(price) : null,
                                active,
                            })
                        }
                        disabled={!name}
                    >
                        Zapisz
                    </button>
                    <button onClick={onClose}>Anuluj</button>
                </div>
            </div>
        </div>
    )
}