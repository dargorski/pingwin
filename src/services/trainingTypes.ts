import {supabase} from "../lib/supabase.ts";
import type {TrainingType} from "../Models/TrainingType.tsx";

export const getTrainingTypes = async () => {
    const { data, error } = await supabase
        .from('training_types')
        .select('*')
        .order('created_at')

    if (error) throw error
    return data as TrainingType[]
}

export const createTrainingType = async (payload: {
    name: string
    default_price?: number | null
    active: boolean
}) => {
    const { error } = await supabase
        .from('training_types')
        .insert(payload)

    if (error) throw error
}

export const updateTrainingType = async (
    id: string,
    payload: Partial<TrainingType>
) => {
    const { error } = await supabase
        .from('training_types')
        .update(payload)
        .eq('id', id)

    if (error) throw error
}