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
        <div>
            <p>{todo.todo}</p>
            <button onClick={handleMarkTodoDone}>{!todo.completed ? '⏹️' : '✅'}</button>
            <button onClick={handleMarkTodoImportant}>{!todo.important ? '🐢' : '🦖'}</button>
            <button onClick={handleDeleteTodo}>🗑️</button>
        </div>
    )
}

export default Todo