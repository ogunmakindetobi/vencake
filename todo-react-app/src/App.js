import { useState } from "react";
import './App.css';
import Todo from "./Todo";


// inital value
const initalState = ["clean Kitchen", "Wipe Floor", "Code"]
function App() {

  const [todos, setTodos] = useState(initalState);
  const [inputeValue, setInputValue] = useState("")
  return (
    <div>
      <h1>  Todo List</h1>
      <div>
        <input value={inputeValue} onChange={(event) => {
          setInputValue(event.target.value)
        }}></input>
        <button onClick={(e) => {setTodos([...todos, inputeValue])// add todo
        // clean up the field
        setInputValue("");
        }}>Add Todo</button>
      </div>
      {todos.map(todo => <Todo todo={todo} />)}
    </div>
  );
}

export default App;
