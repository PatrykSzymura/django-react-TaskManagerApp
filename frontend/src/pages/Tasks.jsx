import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingTasks, setLoadingTasks] = useState(false);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get/projects');
                setProjects(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingProjects(false);
            }
        };

        fetchProjects();
    }, []);

    const fetchTasks = async (projectId) => {
        setLoadingTasks(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/get/tasks/${projectId}`);
            setTasks(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingTasks(false);
        }
    };

    const handleProjectChange = (e) => {
        const projectId = e.target.value;
        setSelectedProject(projectId);
        if (projectId) {
            fetchTasks(projectId);
        }
    };

    if (loadingProjects) return <p>Loading projects...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="projects" className="block text-sm font-medium text-gray-700">
                    Select Project:
                </label>
                <select
                    id="projects"
                    name="projects"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedProject}
                    onChange={handleProjectChange}
                >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.project_name}
                        </option>
                    ))}
                </select>
            </div>
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
        </div>
    );
};

export default TaskList;
