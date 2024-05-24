import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ project }) => {
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = async (projectId) => {
        setLoadingTasks(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/get/tasks/${projectId}`);
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
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Zadanie</th>
                                <th>Opis</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{task.task_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {error && <p className="error">{error}</p>} {/* Dodane wyświetlanie błędów */}
        </div>
    );
};

export default TaskList;
