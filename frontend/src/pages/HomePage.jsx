import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../global_state/authStore'

import Todo from '../components/Todo'

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

    const testData = [
        {
            todo: 'buy oreos',
            user: 'John',
            important: false,
            completed: false
        },
        {
            todo: 'sell old phone',
            user: 'John',
            important: true,
            completed: false
        },
        {
            todo: 'go out with friends',
            user: 'John',
            important: false,
            completed: true
        }
    ]

    return (
        <div>
            <button onClick={logoutUser}>Logout</button>
            <button>Light Mode</button>
            <h1>Welcome Nickname</h1>
            <div>
                {testData.map((todo) => (
                    <Todo todo={todo} />
                ))}
            </div>
        </div>
    )
}

export default HomePage