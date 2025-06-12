import React from 'react'
import { useTodoStore } from '../global_state/todoStore'

function Todo({todo}) {

    const {updateTodo, deleteTodo} = useTodoStore()

    const handleMarkTodoDone = async () => {
        const copyTodo = todo
        copyTodo.completed = !copyTodo.completed
        updateTodo(copyTodo)
    }

    const handleMarkTodoImportant = async () => {
        const copyTodo = todo
        copyTodo.important = !copyTodo.important
        updateTodo(copyTodo)
    }

    const handleDeleteTodo = async () => {
        deleteTodo(todo)
    }
    

    return (
        <div className='container-todo'>
            <p>
            
            <span onClick={handleMarkTodoDone}>{!todo.completed ? '[ ] ' : '[✓] '}</span>
                {`${todo.todo} `}
            
            {/* <span onClick={handleMarkTodoImportant}>{!todo.important ? '[^]' : '[!]'}</span> */}
            <span onClick={handleDeleteTodo}>[X]</span>
            </p>
        </div>
    )
}

export default Todo

{/* <button onClick={handleMarkTodoDone}>{!todo.completed ? '⏹️' : '✅'}</button>
            <button onClick={handleMarkTodoImportant}>{!todo.important ? '🐢' : '🦖'}</button>
            <button onClick={handleDeleteTodo}>🗑️</button> */}