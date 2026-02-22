import type { Signup } from './Signup.tsx';

export type Class = {
    id?: string;
    title?: string | null;
    training_type_id?: string | null;
    starts_at: string;
    capacity: number;
    price_override?: number | null;
    cancelled?: boolean;
};

export type ExtendedClass = Class & {
    signups?: Signup[];
    taken_slots?: number;
};
