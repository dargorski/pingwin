import { useEffect, useState } from 'react';
import './PaymentsPage.css';
import { supabase } from '../../lib/supabase.ts';
import { dateWithHackXd } from '../../components/calendar/utils.ts';
import type { Payment } from '../../Models/Payment.ts';

export const PaymentsPage = () => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);

    const periodStart = new Date(year, month, 1);
    const periodEnd = new Date(year, month + 1, 0);

    const load = async () => {
        setLoading(true);

        const { data } = await supabase
            .from('payments')
            .select(
                `
        id,
        total_amount,
        paid,
        paid_at,
        profiles (full_name, email )
      `
            )
            .eq('period_start', dateWithHackXd(periodStart))
            .eq('period_end', dateWithHackXd(periodEnd))
            .order('paid', { ascending: true });

        setPayments((data ?? []) as unknown as Payment[]);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, [year, month]);

    const generate = async () => {
        setLoading(true);
        await supabase.rpc('generate_payments_for_period', {
            p_start: dateWithHackXd(periodStart),
            p_end: dateWithHackXd(periodEnd)
        });
        await load();
    };

    const markPaid = async (id: string) => {
        await supabase
            .from('payments')
            .update({
                paid: true,
                paid_at: new Date().toISOString()
            })
            .eq('id', id);

        await load();
    };

    return (
        <div className="payments-page">
            <header className="payments-header">
                <h1>Rozliczenia</h1>

                <div className="period-controls">
                    <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <option key={i} value={i}>
                                {new Date(0, i).toLocaleString('pl-PL', { month: 'long' })}
                            </option>
                        ))}
                    </select>

                    <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                        {[2025, 2026, 2027].map((y) => (
                            <option key={y}>{y}</option>
                        ))}
                    </select>

                    <button onClick={generate}>Przelicz</button>
                </div>
            </header>

            {loading ? (
                <p>Ładowanie…</p>
            ) : (
                <div className="payments-list">
                    {payments.map((p) => (
                        <div key={p.id} className="payment-card">
                            <div className="payment-top">
                                <div className="payment-name">{p.profiles?.full_name ?? p.profiles?.email}</div>

                                <div className={`payment-status ${p.paid ? 'paid' : 'unpaid'}`}>{p.paid ? 'Zapłacone' : 'Do zapłaty'}</div>
                            </div>

                            <div className="payment-amount">{p.total_amount} zł</div>

                            {!p.paid && (
                                <button className="mark-paid" onClick={() => markPaid(p.id)}>
                                    Oznacz jako zapłacone
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
