import {supabase} from "../lib/supabase.ts";
import type {Class} from "../Models/Class.tsx";

export const getClasses = async () => {
    const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('starts_at', { ascending: true })

    if (error) throw error
    return data as Class[]
}

export const createClass = async (payload: Partial<Class>) => {
    const { error } = await supabase.from('classes').insert(payload)
    if (error) throw error
}

export const updateClass = async (id: string, payload: Partial<Class>) => {
    const { error } = await supabase.from('classes').update(payload).eq('id', id)
    if (error) throw error
}