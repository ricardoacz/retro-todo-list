import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../global_state/authStore'
import { account } from '../appwriteConfig'

import Todo from '../components/Todo'

function HomePage() {
    
    const {logoutUser, checkUserStatus} = useAuth()
    const [user, setUser] = useState("")
    const [todoValue, setTodoValue] = useState("")
    
    const navigate = useNavigate()

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

    const [todos, setTodos] = useState([
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
    ])

    const handleAddTodo = async (e) => {
        e.preventDefault()
        const todoTemplate = {
            todo: '',
            user: 'John',
            important: false,
            completed: false
        }
        const copyTodos = todos.slice()
        setTodos([...copyTodos, {...todoTemplate, todo: todoValue}])
    }

    return (
        <div>
            {user && (

            <div>
                
                <button onClick={logoutUser}>Logout</button>
                <button>Light Mode</button>
                <button>Settings</button>
                <button>Type</button>
                <h1>{`Welcome ${user}`}</h1>
                <div>
                    {todos.map((todo, index) => (
                        <Todo key={index} todo={todo} />
                    ))}
                </div>

                <div>
                    <p>Typing interface</p>
                    <div>
                        <form onSubmit={handleAddTodo}>
                            <input className='todo-input' onChange={(e) => setTodoValue(e.target.value)} placeholder='todo' />
                            <button>Submit</button>
                        </form>
                    </div>
                </div>

            </div>

            )}
        </div>
    )
}

export default HomePage