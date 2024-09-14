import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
const ToDoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get('http://localhost:5001/tasks');
            setTasks(res.data);
        };
        fetchTasks();
    }, []);

    const addTask = async () => {
        const res = await axios.post('http://localhost:5001/tasks', { content });
        setTasks([...tasks, res.data]);
        setContent('');
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5001/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div>
            <h1>To-Do App</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.content}
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
    
};

export default ToDoApp;
