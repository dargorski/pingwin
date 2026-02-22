import { supabase } from '../lib/supabase.ts';

export const getClassDetails = async (classId: string) => {
    const { data, error } = await supabase
        .from('signups')
        .select(
            `
      id,
      user_id,
      profiles (
        full_name,
        email
      )
    `
        )
        .eq('class_id', classId)
        .eq('status', 'active');

    if (error) throw error;
    console.log(data);
    return data.map((s: any) => ({
        id: s.id,
        user_id: s.user_id,
        full_name: s.profiles.full_name,
        email: s.profiles.email
    }));
};
