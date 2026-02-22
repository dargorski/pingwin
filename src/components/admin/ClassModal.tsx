import { useEffect, useState } from 'react';
import type { Class } from '../../Models/Class.tsx';
import type { TrainingType } from '../../Models/TrainingType.tsx';
import './ClassModal.css';

type Props = {
    open: boolean;
    initial?: Class | null;
    onClose: () => void;
    onSave: (data: Class) => void;
    trainingTypes?: TrainingType[];
};

export const ClassModal = ({ open, initial, trainingTypes, onClose, onSave }: Props) => {
    const [title, setTitle] = useState('');
    const [startsAt, setStartsAt] = useState('');
    const [capacity, setCapacity] = useState(8);
    const [price, setPrice] = useState('');
    const [trainingTypeId, setTrainingTypeId] = useState<string | null>(null);

    useEffect(() => {
        if (initial) {
            setTitle(initial.title ?? '');
            setStartsAt(initial.starts_at.slice(0, 16));
            setCapacity(initial.capacity);
            setPrice(initial.price_override?.toString() ?? '');
            setTrainingTypeId(initial.training_type_id ?? null);
        } else {
            setTitle('');
            setStartsAt('');
            setCapacity(8);
            setPrice('');
            setTrainingTypeId(null);
        }
    }, [initial, open]);

    if (!open) return null;

    const selectedType = trainingTypes?.find((t: TrainingType) => t.id === trainingTypeId);

    return (
        <div className="modal-backdrop">
            <div className="modal-card">
                <h2>{initial ? 'Edytuj trening' : 'Nowy trening'}</h2>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Tytuł (opcjonalny)</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Typ treningu</label>
                        <select value={trainingTypeId ?? ''} onChange={(e) => setTrainingTypeId(e.target.value || null)}>
                            <option value="">Brak typu</option>
                            {trainingTypes?.map((t: TrainingType) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>

                        {selectedType?.default_price && <div className="hint">Domyślna cena: {selectedType.default_price} zł</div>}
                    </div>

                    <div className="form-group">
                        <label>Data i godzina</label>
                        <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Pojemność</label>
                        <input type="number" min={1} value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
                    </div>

                    <div className="form-group">
                        <label>Cena (nadpisanie, opcjonalne)</label>
                        <input type="number" placeholder="np. 80" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <div className="hint">Jeśli ustawisz, nadpisze cenę typu</div>
                    </div>
                </div>

                <div className="modal-actions">
                    <button
                        className="primary"
                        onClick={() =>
                            onSave({
                                title: title || null,
                                starts_at: startsAt,
                                capacity,
                                price_override: price ? Number(price) : null,
                                training_type_id: trainingTypeId
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
    );
};
