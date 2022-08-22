
import './App.css';

import { useState, useEffect } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill  } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [tittle, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loanding, setLoanding] = useState(false);

  // Load todos on page load

  useEffect (() =>{

      const loadData = async () => {
        setLoanding(true)
        const res = await fetch(API + "/todos")
        .then ((res) => res.json())
        .then ((data) =>data);
        
          setLoanding(false);

            setTodos(res);
      };

      loadData()
  },[] );



  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = {
      id: Math.random(),
      tittle,
      time,
      done: false,
    };

   
    
    setTodos ((prevState) => [... prevState, todo]);


    setTitle("");
    setTime("");

  };
    
   
  
   return (
    <div className="App">
      <div className="todo-header">
      <h1>Lista de tarefas</h1>
      </div>
        <div className="form-todo">
         <h2>Insira a sua próxima tarefa:</h2>
            <form onSubmit={handleSubmit}>
               <div className="form-control">
             <label htmlFor="tittle"> O que você vai fazer?</label>
               <input
                type="text"
                 name="title"
                 
                 placeholder="Título da tarefa" 
             onChange={(e) => setTitle(e.target.value)} 
         value={tittle }
          required 
         
        />
        
      </div>
      
      <div className="form-control">
             <label htmlFor="time">Duração:</label>
               <input
                type="text"
                 name="time"
                 placeholder="Tempo estimado (em horas)" 
             onChange={(e) => setTime(e.target.value)} 
         value={time}
          required 
        />
         
      </div>
      <input type="submit" value="Criar tarefa"></input>
      
      
     </form>
        </div>
        <div className="list-todo">
            <h2>Lista de tarefas</h2>
          {todos.length === 0 && <p>Não há tarefas!</p>}
          {todos.map((todo) => (
            <div className='todo' key={todo.id}>
              <h3 className={todo.done ? "todo.done": ""}>{todo.tittle}</h3>
              <p>Duração: {todo.time}</p>
              <div className="actions">
                  <span>
                    {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                     </span>
                     <BsTrash onClick={() =>(todo.id) } />
                 </div>
              </div>
            
          ))}
        </div>
      </div>
  );
}

export default App;
