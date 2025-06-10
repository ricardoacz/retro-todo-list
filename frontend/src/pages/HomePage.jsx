import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../global_state/authStore'

function HomePage() {

    const {logoutUser, checkUserStatus, loading, user} = useAuth()

    const navigate = useNavigate()

    // Trigger check user logged in
    useEffect(() => {
        const check = async () => {
        await checkUserStatus()
        }
        check()
    }, [])

    // Comfirm user is logged in and redirect
    useEffect(() => {
        if (!loading && !user) {
        navigate('/login')
        }
    }, [loading, user])

    return (
        <div>
            <button onClick={logoutUser}>Logout</button>
            <h1>Welcome Nickname</h1>
        </div>
    )
}

export default HomePage