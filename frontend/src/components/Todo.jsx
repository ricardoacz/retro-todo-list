import React from 'react'
import { useTodoStore } from '../global_state/todoStore'

function Todo({todo, updateLocalTodos, setTypingMode, typingMode, editingTodo, setEditingTodo, previousTodo, setPreviousTodo, todoValue, setTodoValue}) {

    const {updateTodo, deleteTodo} = useTodoStore()

    const handleMarkTodoDone = async () => {
       
        const copyTodo = {...todo, completed: !todo.completed}
        updateTodo(copyTodo)
    }

    const handleMarkTodoImportant = async () => {
        const copyTodo = {...todo, important: !todo.important}
        updateTodo(copyTodo)
        
    }

    const handleEditTodoMode = async () => {
        setTodoValue(todo.todo)
        setEditingTodo(true)
        setTypingMode(true)
        setPreviousTodo(todo)
    }

    const handleDeleteTodo = async () => {
        deleteTodo(todo)
    }
    

    return (
        <div className='container-todo' onDoubleClick={handleEditTodoMode}>
            <p>
            
            <span onClick={handleMarkTodoDone}>{!todo.completed ? '[ ] ' : '[✓] '}</span>
                {`${todo.todo} `}
            
            <span onClick={handleMarkTodoImportant}>{!todo.important ? '[^]' : '[!]'}</span>
            <span onClick={handleDeleteTodo}>[X]</span>
            </p>
        </div>
    )
}

export default Todo

{/* <button onClick={handleMarkTodoDone}>{!todo.completed ? '⏹️' : '✅'}</button>
            <button onClick={handleMarkTodoImportant}>{!todo.important ? '🐢' : '🦖'}</button>
            <button onClick={handleDeleteTodo}>🗑️</button> */}