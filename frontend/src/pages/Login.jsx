import React, { useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../global_state/authStore'

const Login = () => {
    const { user, checkUserStatus, loginUser, loading } = useAuth()
    const navigate = useNavigate()
    const loginForm = useRef(null)

    useEffect(() => {
            const userCheck = async () => {
                // try {
                //     checkUserStatus()
                //     console.log('user check:', await user)
                //     navigate('/')
                // } catch (error) {
                //     console.error(error)
                //     navigate('/login')
                // }
                if (await checkUserStatus()) {
                    navigate('/')
                } 
            }
            userCheck()
        }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = loginForm.current.email.value
        const password = loginForm.current.password.value
        const userInfo = { email, password }

        const loggedInUser = await loginUser(userInfo)
        if (loggedInUser) {
        navigate('/')
        }
    }

    return (
        <div>
            {!user && !loading && (
                <div className="container-main-login">
                    <div className="login-register-container">
                        <form onSubmit={handleSubmit} ref={loginForm}>
                            <div className="form-field-wrapper">
                                <label>Email:</label>
                                <input
                                required
                                type="email"
                                name="email"
                                placeholder="Enter email..."
                                />
                            </div>
    
                            <div className="form-field-wrapper">
                                <label>Password:</label>
                                <input
                                type="password"
                                name="password"
                                placeholder="Enter password..."
                                autoComplete="password"
                                />
                            </div>
    
                            <div className="form-field-wrapper">
                                <input type="submit" value="Login" className="btn" />
                            </div>
                        </form>
                    </div>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            )}
        </div>
    )
}

export default Login