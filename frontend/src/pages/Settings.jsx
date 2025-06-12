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
    
    const {documentUser, getUser, loading} = useAuth()
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
                    <h4>Name</h4>
                    <input onChange={(e) => setName(e.target.value)} value={documentUser?.name}/>
                    <button>Update</button>
                    <h3>Email</h3>
                    <input onChange={(e) => setEmail(e.target.value)} value={documentUser?.email} />
                    <button>Update</button>
                    <h3>Nickname</h3>
                    <input onChange={(e) => setNickname(e.target.value)} value={documentUser?.nickname} />
                    <button>Update</button>
                    <h3>Todos Completed</h3>
                    <span>{
                        todos.filter((todo) => todo.completed).length
                    }</span>
                    <h3>Change your password</h3>
                    <input placeholder='Old password' />
                    <input placeholder='New password' />
                    <input placeholder='Confirm password' />
                    <button>Update</button>
                </div>
            </div>

            )}


        </div>
    )
}

export default Settings