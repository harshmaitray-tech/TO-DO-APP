// import React, { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [tasks, setTasks] = useState(() => {
//     const saved = localStorage.getItem("tasks");
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [input, setInput] = useState("");
//   const [priority, setPriority] = useState("Medium");
//   const [dueDate, setDueDate] = useState("");
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = () => {
//     if (!input.trim()) return;
//     const newTask = {
//       id: Date.now(),
//       text: input,
//       completed: false,
//       priority,
//       dueDate,
//     };
//     setTasks([...tasks, newTask]);
//     setInput("");
//     setPriority("Medium");
//     setDueDate("");
//   };

//   const toggleTask = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index].completed = !newTasks[index].completed;
//     setTasks(newTasks);
//   };

//   const deleteTask = (index) => {
//     const newTasks = [...tasks];
//     newTasks.splice(index, 1);
//     setTasks(newTasks);
//   };

//   const editTask = (index) => {
//     const newText = prompt("Edit task:", tasks[index].text);
//     if (newText !== null && newText.trim() !== "") {
//       const newTasks = [...tasks];
//       newTasks[index].text = newText;
//       setTasks(newTasks);
//     }
//   };

//   const isOverdue = (date, completed) => {
//     if (!date) return false;
//     return new Date(date) < new Date() && !completed;
//   };

//   const sortedTasks = [...tasks].sort((a, b) => {
//     const order = { High: 1, Medium: 2, Low: 3 };
//     return order[a.priority] - order[b.priority];
//   });

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <h1>To-Do App</h1>

//       <div className="controls">
//         <input
//           type="text"
//           placeholder="Enter task..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />

//         <select value={priority} onChange={(e) => setPriority(e.target.value)}>
//           <option>High</option>
//           <option>Medium</option>
//           <option>Low</option>
//         </select>

//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//         />

//         <button onClick={addTask}>Add</button>
//         <button onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? "Light Mode" : "Dark Mode"}
//         </button>
//       </div>

//       <ul>
//         {sortedTasks.map((task, index) => (
//           <li
//             key={task.id}
//             className={`task-card ${task.completed ? "completed" : ""} ${
//               isOverdue(task.dueDate, task.completed) ? "overdue" : ""
//             }`}
//           >
//             <span onClick={() => toggleTask(index)}>{task.text}</span>
//             <div className="task-info">
//               <span className={`priority ${task.priority.toLowerCase()}`}>
//                 {task.priority}
//               </span>
//               {task.dueDate && <span className="due">{task.dueDate}</span>}
//             </div>
//             <div className="buttons">
//               <button onClick={() => editTask(index)}>✏️</button>
//               <button onClick={() => deleteTask(index)}>❌</button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <footer className="footer">
//         Created by <span className="author">Harsh Maitray</span> ✨
//       </footer>
//     </div>
//   );
// }

// export default App;















import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      priority,
      dueDate,
    };
    setTasks([...tasks, newTask]);
    setInput("");
    setPriority("Medium");
    setDueDate("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
      const newTasks = [...tasks];
      newTasks[index].text = newText;
      setTasks(newTasks);
    }
  };

  const isOverdue = (date, completed) => {
    if (!date) return false;
    return new Date(date) < new Date() && !completed;
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  });

  // Priority icons
  const getPriorityIcon = (priority) => {
    if (priority === "High") return "🔥";
    if (priority === "Medium") return "⚡";
    if (priority === "Low") return "✅";
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <h1>TO-DO APP</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <ul>
        {sortedTasks.map((task, index) => (
          <li
            key={task.id}
            className={`task-card ${task.completed ? "completed" : ""} ${
              isOverdue(task.dueDate, task.completed) ? "overdue" : ""
            }`}
          >
            <span onClick={() => toggleTask(index)}>
              {getPriorityIcon(task.priority)} {task.text}
            </span>
            <div className="task-info">
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              {task.dueDate && <span className="due">{task.dueDate}</span>}
            </div>
            <div className="buttons">
              <button onClick={() => editTask(index)}>✏️</button>
              <button onClick={() => deleteTask(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>

      <footer className="footer">
        Created by <span className="author">Harsh Maitray</span> ✨
      </footer>
    </div>
  );
}

export default App;
