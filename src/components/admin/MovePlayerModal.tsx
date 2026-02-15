import { useEffect, useState } from 'react'
import {supabase} from "../../lib/supabase.ts";

type Props = {
    open: boolean
    signupId: string | null
    currentDate: string
    userEmail: string
    onClose: () => void
    reload: () => void
}

export const MovePlayerModal = ({
                                    open,
                                    signupId,
                                    currentDate,
                                    userEmail,
                                    onClose,
                                    reload,
                                }: Props) => {
    const [classes, setClasses] = useState<any[]>([])
    const [selected, setSelected] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!open) return

        supabase
            .from('classes')
            .select('*')
            .gt('starts_at', new Date().toISOString())
            .then(({ data }) => setClasses(data ?? []))
    }, [open])

    if (!open) return null

    const handleMove = async () => {
        if (!signupId || !selected) return

        setLoading(true)

        await supabase.rpc('move_signup', {
            p_signup_id: signupId,
            p_new_class_id: selected,
        })

        const newClass = classes.find(c => c.id === selected)

        await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-move-email`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                    email: userEmail,
                    oldDate: new Date(currentDate).toLocaleString(),
                    newDate: new Date(newClass.starts_at).toLocaleString(),
                }),
            }
        )

        setLoading(false)
        reload()
        onClose()
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Przenieś zawodnika</h2>

                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    <option value="">Wybierz trening</option>
                    {classes.map((c) => (
                        <option key={c.id} value={c.id}>
                            {new Date(c.starts_at).toLocaleString()}
                        </option>
                    ))}
                </select>

                <button onClick={handleMove} disabled={!selected || loading}>
                    {loading ? 'Przenoszenie...' : 'Przenieś i wyślij email'}
                </button>

                <button onClick={onClose}>Anuluj</button>
            </div>
        </div>
    )
}