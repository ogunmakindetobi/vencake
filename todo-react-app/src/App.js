import { useState, useEffect } from "react";// import hook with useStates and useEffect hook
import './App.css';
import Todo from "./Todo";




function getTodoFromLocalStorage() {
  let todosString = localStorage.getItem('todos')// store in local storage
  if (todosString.length > 0) {
    return todosString.split(",")
  } else {
    return []
  }

}
function App() {

  const [todos, setTodos] = useState(getTodoFromLocalStorage());// Using state hook todos to modify data with dynamic data struture and componet memory
  const [inputValue, setInputValue] = useState(""); // secound state storage controling when user type until they click add todo button

  function removeTodo(todo) {
    setTodos(todos.filter((td) => (td !== todo)))
  }

  // effect update for local storage/when certain todo  or state is being triggered
  useEffect(() => {
    localStorage.setItem('todos', todos)
  }, [todos])


  return (
    <div>
      <h1>  Todo List</h1>
      <div>
        <input value={inputValue}// initiate inputValue,everytime input field change its call onChange function
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
      <div className="todo-container">
      {todos.map((todo) => <Todo todo={todo} removeTodo={removeTodo} />)}
    </div>
    <p> You have <strong> {todos.length}</strong> task in progress</p>
    </div>
  );
}

export default App;
