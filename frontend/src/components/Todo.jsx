import React from 'react'

function Todo({todo}) {

    

    return (
        <div>
            <p>{todo.todo}</p>
            <button>✅</button>
            <button>⭐</button>
        </div>
    )
}

export default Todo