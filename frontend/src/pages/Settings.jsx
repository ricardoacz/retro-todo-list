import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../global_state/authStore'
import { account } from '../appwriteConfig'
import { useTodoStore } from '../global_state/todoStore'

function Settings() {

    const navigate = useNavigate()

    const [user, setUser] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [nickname, setNickname] = useState("")

    const handleUpdateNickname = async () => {
        if (nickname.length > 16) {
            return setMessage("Nickname can't be longer than 16 characters.")
        }
        const updatedUser = {}
        updatedUser.nickname = nickname

        try {
            await updateUser(updatedUser)
        } catch (error) {
            console.error(error)
        }
    }

    // Password input states
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const [error, setError] = useState('')
    // const [success, setSuccess] = useState('')
    const [message, setMessage] = useState('')

    async function handleUpdatePassword () {
        // setError('')
        // setSuccess('')
        setMessage("")

        console.log(oldPassword, newPassword, confirmPassword)

        if (newPassword !== confirmPassword) {
            return setMessage("New password and confirmation do not match.")
        }

        if (newPassword.length < 8) {
            return setMessage("New password must be at least 8 characters.")
        }

        if (oldPassword === newPassword) {
            return setMessage("New password must be different from old password.")
        }

        console.log(newPassword, oldPassword)

        try {
            await updatePassword(newPassword, oldPassword)
            setMessage("Password updated successfully.")
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (error) {
            console.error(err)
            setMessage("Failed to update password. Please check your current password.")
        }
    }

    useEffect(() => {
            const checkUserSession = async () => {
                let session = null
                try {
                    session = await account.get()
                    console.log(session)
                    setUser(session.name)
                    
                } catch (error) {
                    navigate('/login')
                }  
            }
            checkUserSession()
        }, [])
    
    const {documentUser, getUser, updatePassword, updateUser, loading} = useAuth()
    const {getTodos, todos} = useTodoStore()

    useEffect(() => {
        getTodos()
        getUser()
    }, [])

    return (
        <div>
            {!loading && (

            <div>
                <button onClick={() => navigate('/')}>Todos</button>
                <div>
                    <h3>{documentUser?.name}</h3>
                    {/* <input onChange={(e) => setName(e.target.value)} value={documentUser?.name}/>
                    <button>Update</button> */}
                    {/* <h5>{documentUser?.name}</h5> */}
                    <h3>{documentUser?.email}</h3>
                    {/* <input onChange={(e) => setEmail(e.target.value)} value={documentUser?.email} />
                    <button>Update</button> */}

                    <h3>Nickname</h3>
                    <input onChange={(e) => setNickname(e.target.value)} defaultValue={documentUser?.nickname} />
                    <button onClick={handleUpdateNickname}>Update</button>

                    <h3>Todos Completed</h3>
                    <span>{
                        todos.filter((todo) => todo.completed).length
                    }</span>

                    <h3>Change your password</h3>
                        <input 
                            placeholder='Old password' 
                            type='password'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            />
                        <input 
                            placeholder='New password' 
                            type='password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}    
                            />
                        <input 
                            placeholder='Confirm password' 
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}    
                            />
                    <button onClick={handleUpdatePassword}>Update</button>
                    <p>{message}</p>
                </div>
            </div>

            )}


        </div>
    )
}

export default Settings