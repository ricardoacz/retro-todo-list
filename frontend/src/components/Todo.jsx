import React from 'react'
import { useTodoStore } from '../global_state/todoStore'

function Todo({todo}) {

    const {updateTodo} = useTodoStore()

    const handleMarkTodoDone = async () => {
        const copyTodo = todo
        copyTodo.completed = !copyTodo.completed
        updateTodo(copyTodo)
    }
    

    return (
        <div>
            <p>{todo.todo}</p>
            <button onClick={handleMarkTodoDone}>✅</button>
            <button>⭐</button>
            <button>🗑️</button>
        </div>
    )
}

export default Todo