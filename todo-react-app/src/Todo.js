import React from 'react'

export default function Todo({todo, removeTodo}) {
    return (
        <div className="todo">
            <p>{todo}</p>
            <button className="remove" onClick={(e) => {
                removeTodo(todo)//remove button componets
            }}>X</button>
        </div>
    
    );
}
