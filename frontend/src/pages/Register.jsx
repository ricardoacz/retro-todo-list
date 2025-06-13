import React, {useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../global_state/authStore'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const {registerUser, checkUserStatus, loading, user} = useAuth()
    
    const registerForm = useRef(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const name = registerForm.current.name.value
        const email = registerForm.current.email.value
        const nickname = registerForm.current.nickname.value
        const password1 = registerForm.current.password1.value
        const password2 = registerForm.current.password2.value

        if(password1 !== password2){
            alert('Passwords did not match!')
            return 
        }
        
        const userInfo = {name, email, nickname, password1, password2}

        const session = await registerUser(userInfo)
        if (session) {
            navigate('/')
        } else {
            console.log('Registration error')
        }
    }

    useEffect(() => {
            const userCheck = async () => {
                if (await checkUserStatus()) {
                    navigate('/')
                } 
            }
            userCheck()
        }, [])

    return (
      <div>
        {!user && !loading && (

          <div className="container-main-register">
            <div className="login-register-container">
              <form ref={registerForm} onSubmit={handleSubmit}>

              <div className="form-field-wrapper">
                    <label>Name:</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      placeholder="Enter name..."
                      />
                </div>

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
                    <label>Nickname:</label>
                    <input 
                      required
                      type="text" 
                      name="nickname"
                      placeholder="Enter nickname..."
                      />
                </div>

                <div className="form-field-wrapper">
                    <label>Password:</label>
                    <input 
                      type="password"
                      name="password1" 
                      placeholder="Enter password..."
                      autoComplete="password1"
                      />
                </div>

                <div className="form-field-wrapper">
                    <label>Confirm Password:</label>
                    <input 
                      type="password"
                      name="password2" 
                      placeholder="Confirm password..."
                      autoComplete="password2"
                      />
                </div>


                <div className="form-field-wrapper">

                    <input 
                      type="submit" 
                      value="Register"
                      className="btn"
                      />

                </div>

              </form>

              <p>Already have an account? <Link to="/login">Login</Link></p>

            </div>
        </div>
        )}
      </div>
    )
}

export default Register