import React, { useEffect, useState } from "react";
import API from "../api";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await API.post("/", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/${id}`);
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await API.patch(`/${id}/status`);
    fetchTasks();
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">To-Do App</h2>
  
      <div className="todo-input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>
  
      <ul className="todo-list">
        {tasks.map((task) => (
          <li className="todo-item" key={task._id}>
            <span
              onClick={() => toggleTask(task._id)}
              className={task.completed ? "completed" : ""}
              style={{ cursor: "pointer" }}
            >
              {task.title}
            </span>
  
            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;