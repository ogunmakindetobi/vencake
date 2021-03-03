import { useState, useEffect } from "react";
import './App.css';
import Todo from "./Todo";




function getTodoFromLocalStorage() {
  let todosString = localStorage.getItem('todos')
  if (todosString && todosString.length > 0) {
    return todosString.split(",")
  } else {
    return []
  }

}

function App() {

  const [todos, setTodos] = useState(getTodoFromLocalStorage());
  const [inputValue, setInputValue] = useState("");

  function removeTodo(todo) {
    setTodos(todos.filter((td) => (td !== todo)))
  }


  useEffect(() => {
    localStorage.setItem('todos', todos)
  }, [todos])

  return (
    <div>
      <h1>  Todo List</h1>
      <div>
        <input value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}></input>
        <button onClick={(e) => {
          // add todo
          setTodos([...todos, inputValue])
          // clean up the field
          setInputValue("");
        }}>Add Todo</button>
      </div>
      {todos.map(todo => <Todo todo={todo} removeTodo={removeTodo} />)}
    </div>
  );
}

export default App;
