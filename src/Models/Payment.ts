export type Payment = {
    id: string;
    total_amount: number;
    paid: boolean;
    paid_at: string | null;
    profiles: {
        full_name: string;
        email: string;
    };
};
