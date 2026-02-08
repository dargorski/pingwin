import { useEffect } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import { supabase } from '../lib/supabase'

export const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                navigate('/login')
            }
        })
    })
    return <Navigate to={'/dashboard'}/>

}