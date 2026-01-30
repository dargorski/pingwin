import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function RequireAuth() {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            setAuthenticated(!!data.session)
            setLoading(false)
        })
    }, [])

    if (loading) return null
    if (!authenticated) return <Navigate to="/login"/>

    return <Outlet/>
}