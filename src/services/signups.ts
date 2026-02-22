import { supabase } from '../lib/supabase.ts';
import type { Signup } from '../Models/Signup.tsx';

export const getSignups = async () => {
    const { data, error } = await supabase.from('signups').select('*');

    if (error) throw error;
    return data as Signup[];
};
