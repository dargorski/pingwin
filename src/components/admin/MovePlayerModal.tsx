export const MovePlayerModal = ({ open }: { open: boolean }) => {
    if (!open) return null

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Przenieś zawodnika</h2>

                <select>
                    <option>20 Mar 19:00 – Grupowy</option>
                </select>

                <button>Przenieś i wyślij email</button>
            </div>
        </div>
    )
}