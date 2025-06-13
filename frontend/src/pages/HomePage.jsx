import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../global_state/authStore'
import { useTodoStore } from '../global_state/todoStore'
import { account } from '../appwriteConfig'

import Todo from '../components/Todo'

function HomePage() {
    
    const navigate = useNavigate()

    const [view, setView] = useState(false)
    const [typingMode, setTypingMode] = useState(false)
    const [todoValue, setTodoValue] = useState("")

    // states for toggle btns
    const [todoViewName, setTodoViewName] = useState('Todo View')
    const [colorModeName, setColorModeName] = useState('')

    // Color Mode Settings ->
    const [colorMode, setColorMode] = useState(() => {
        const saved = localStorage.getItem('colorMode')
        // return saved ? JSON.parse(saved) : false
        if (saved) {
            setColorModeName('Dark Mode')
            return JSON.parse(saved)
        } else {
            setColorModeName('Light Mode')
            return false
        }
    })

    useEffect(() => {
        
        if (colorMode) {
            document.documentElement.style.setProperty('--dark-mode-color', '#242424')
            document.documentElement.style.setProperty('--dark-mode-bg-color', 'rgb(215, 255, 215)')
            setColorModeName('Dark Mode')
        } else {
            document.documentElement.style.setProperty('--dark-mode-color', 'rgba(255, 255, 255, 0.87)')
            document.documentElement.style.setProperty('--dark-mode-bg-color', '#242424')
            setColorModeName('Light Mode')
        }
        localStorage.setItem('colorMode', JSON.stringify(colorMode))
    }, [colorMode])

    const toggleColorMode = () => {
        setColorMode((prev) => !prev);
    };
    // <- Color Mode Settings

    // Todos ->
    const {todos, getTodos, createTodo, updateTodo} = useTodoStore()

    async function updateLocalTodos () {
        try {
            await todos
            setLocalTodos(todos)
        } catch (error) {
            console.error(error)
        }
    }
    const textareaRef = useRef(null)

    const handleAddTodo = async (e) => {
        e.preventDefault()
        const newTodo = {
            todo: todoValue
        }
        createTodo(newTodo)
        setTodoValue("")
    }
    // <- Todos

    // Auth -> 
    const {documentUser, getUser, loading, logoutUser, checkUserStatus, user} = useAuth()
    
    useEffect(() => {
        const userCheck = async () => {
            if (!await checkUserStatus()) {
                navigate('/login')
            } 
        }
        userCheck()
    }, [])

    useEffect(() => {
        getTodos()
        getUser()
    }, [])

    const handleLogout = async () => {
        await logoutUser()
        navigate('/login')
    }
    // <- Auth


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '`') {
                e.preventDefault() 
                console.log(`you pressed ${e.key}`)
                setTypingMode((prev) => !prev)
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

    function handleTodoView () {
        if (!view) {
            setTodoViewName('Completed')
        } else {
            setTodoViewName('Todo View')
        }
        setView((prev) => !prev)
    }

    return (
        <div className='container-master'>
            {user && !loading && (

            <div className='container-main'>
                
                <button onClick={handleLogout}>Logout</button>
                <button onClick={toggleColorMode}>{colorModeName}</button>
                <button onClick={() => navigate('/settings')}>Settings</button>
                <button onClick={() => setTypingMode(!typingMode)}>Type|Todo</button>
                <h1>{`Welcome ${documentUser?.nickname}`}</h1>
                <button onClick={handleTodoView}>{todoViewName}</button>

                {!typingMode && (

                <div className='container-todos'>
                    {!view ? 
                        (
                        <div> 
                            {todos.filter((todo) => !todo.completed).map((todo, index) => (
                                <Todo key={index} todo={todo} updateLocalTodos={updateLocalTodos} />
                            ))}
                        </div>
                        )
                        :
                        (
                        <div> 
                            {todos.filter((todo) => todo.completed).map((todo, index) => (
                                <Todo key={index} todo={todo} />
                            ))}
                        </div>
                        )}
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