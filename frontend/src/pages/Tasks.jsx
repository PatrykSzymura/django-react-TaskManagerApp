import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = ({ project }) => {
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = async (projectId) => {
        setLoadingTasks(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/task/${projectId}`);
            console.log("Fetched tasks:", response.data); // Dodane logowanie
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error); // Dodane logowanie
            setError(error.message);
        } finally {
            setLoadingTasks(false);
        }
    };

    useEffect(() => {
        if (project) {
            console.log("Fetching tasks for project ID:", project.id); // Dodane logowanie
            fetchTasks(project.id);
        }
    }, [project]);

    if (!project) return <p>No project selected</p>;
    return (
        <div>
            <div className="overflow-x-auto">
                {loadingTasks ? (
                    <p>Loading tasks...</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {tasks.map((task) => (
                            <div key={task.id} className='h-auto'>
                                <Link to={`/EditTask/${task.id}`}>
                                    <div className='p-1 h-full'>
                                        <div className='card w-full bg-base-300 shadow-xl'>
                                            <div className='card-body'>
                                                <h2 className='card-title'>{task.task_name}</h2>
                                                <p>{task.description}</p>
                                                <div className='card-actions'>
                                                    <span
                                                        className={`badge badge-lg bg-${task.status.color_nr} text-white`}
                                                    >
                                                        {task.status.status_name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && <p className="error">{error}</p>} {/* Dodane wyświetlanie błędów */}
        </div>
    );
};

export default TaskList;
