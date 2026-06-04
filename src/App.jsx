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

  const toggleTask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    const newText = prompt("Edit task:", taskToEdit.text);
    if (newText !== null && newText.trim() !== "") {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      );
      setTasks(newTasks);
    }
  };

  const isOverdue = (date, completed) => {
    if (!date) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // current date only

    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0); // task date only

    return taskDate < today && !completed;
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  });

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
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`task-card ${task.completed ? "completed" : ""} ${
              isOverdue(task.dueDate, task.completed) ? "overdue" : ""
            }`}
          >
            <span onClick={() => toggleTask(task.id)}>
              {getPriorityIcon(task.priority)} {task.text}
            </span>
            <div className="task-info">
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              {task.dueDate && <span className="due">{task.dueDate}</span>}
            </div>
            <div className="buttons">
              <button onClick={() => editTask(task.id)}>✏️</button>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>

      <footer className="footer">
        Created by <span className="author">Harsh Maitray Ji</span> ✨
      </footer>
    </div>
  );
}

export default App;
