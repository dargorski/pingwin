type Props = {
    open: boolean
    onClose: () => void
}

export const TrainingTypeModal = ({ open, onClose }: Props) => {
    if (!open) return null

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Nowy rodzaj treningu</h2>

                <input placeholder="Nazwa" />
                <input type="number" placeholder="Cena (opcjonalna)" />
                <label>
                    <input type="checkbox" /> Aktywny
                </label>

                <button>Zapisz</button>
                <button onClick={onClose}>Anuluj</button>
            </div>
        </div>
    )
}