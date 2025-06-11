import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../global_state/authStore'
import { useTodoStore } from '../global_state/todoStore'
import { account } from '../appwriteConfig'

import Todo from '../components/Todo'

function HomePage() {
    
    const {logoutUser} = useAuth()
    const [user, setUser] = useState({})
    const [typingMode, setTypingMode] = useState(false)
    const [todoValue, setTodoValue] = useState("")

    const {todos, getTodos, createTodo} = useTodoStore()

    useEffect(() => {
        getTodos()
    }, [])

    console.log(todos)

    
    const navigate = useNavigate()

    const textareaRef = useRef(null)

    useEffect(() => {
        const checkUserSession = async () => {
            let session = null
            try {
                session = await account.get()
                console.log(session)
                setUser(session)
                
                
            } catch (error) {
                navigate('/login')
            }  
        }
        checkUserSession()
    }, [])


    const handleAddTodo = async (e) => {
        e.preventDefault()
        const newTodo = {
            todo: todoValue
        }
        createTodo(newTodo)
        setTodoValue("")
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '`') {
                e.preventDefault() 
                console.log(`you pressed ${e.key}`)
                setTypingMode((prev) => !prev)
                // window.removeEventListener('keydown', handleKeyDown)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        if (typingMode && textareaRef.current) {
            textareaRef.current.focus()
        }
    }, [typingMode])

    return (
        <div>
            {user && (

            <div>
                
                <button onClick={logoutUser}>Logout</button>
                <button>Light Mode</button>
                <button onClick={() => navigate('/settings')}>Settings</button>
                <button onClick={() => setTypingMode(!typingMode)}>Type|Todo</button>
                <h1>{`Welcome ${user.name}`}</h1>

                {!typingMode && (

                <div>
                   
                    {todos.map((todo, index) => (
                        <Todo key={index} todo={todo} />
                    ))}
                </div>

                )}

                {typingMode && (

                <div>
                    <p>Typing interface</p>
                    <div>
                        <form onSubmit={handleAddTodo}>
                            <textarea 
                                ref={textareaRef}
                                maxLength={60} 
                                className='text-box' 
                                onChange={(e) => setTodoValue(e.target.value)}
                                value={todoValue}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleAddTodo(e)
                                    }
                                }}
                            ></textarea>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>

                )}


            </div>

            )}
        </div>
    )
}

export default HomePage