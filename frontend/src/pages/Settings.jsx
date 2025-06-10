import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../global_state/authStore'
import { account } from '../appwriteConfig'

function Settings() {

    const navigate = useNavigate()

    const [user, setUser] = useState("")

    const [name, setName] = useState("Jose")

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


    return (
        <div>
            {user && (

            <div>
                <button onClick={() => navigate('/')}>Todos</button>
                <div>
                    <h4>Name</h4>
                    <input onChange={(e) => setName(e.target.value)} value={name}/>
                    <button>Update</button>
                    <h3>Email</h3>
                    <input defaultValue={'jose@gmail.com'} />
                    <button>Update</button>
                    <h3>Nickname</h3>
                    <input defaultValue={'Jay'} />
                    <button>Update</button>
                    <h3>Todos Completed</h3>
                    <span>0</span>
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