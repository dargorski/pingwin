import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                navigate('/login')
            }
        })
    })

    return <div>Strona glowna</div>

}

export default Home;