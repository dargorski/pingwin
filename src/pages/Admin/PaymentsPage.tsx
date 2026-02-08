export const PaymentsPage = () => {
    return (
        <>
            <header className="admin-header">
                <h1>Rozliczenia</h1>
            </header>

            <table className="admin-table">
                <thead>
                <tr>
                    <th>Zawodnik</th>
                    <th>Kwota</th>
                    <th>Status</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {/* map(payments) */}
                </tbody>
            </table>
        </>
    )
}