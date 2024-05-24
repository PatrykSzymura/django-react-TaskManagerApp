import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import { getStatus, getUserList } from '../../utils/dataFeches'; 

const CreateTask = () => {
    const [task, setTask] = useState({
        task_name: '',
        description: '',
        status: '',
        date_start: '',
        date_end: '',
        assigned_to: '', 
    });

    const [statusData, setStatusData] = useState([]);
    const [userList, setUserList] = useState([]); // Stan przechowujący listę użytkowników
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statusResponse = await getStatus();
                setStatusData(statusResponse.data);
                
                const userListResponse = await getUserList();
                setUserList(userListResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`create/task`, { ...task, project_id: params.project_id });
            alert('Task created successfully!');
        } catch (error) {
            console.error("There was an error creating the task!", error);
        }
    };

    return (
        <div className='main'>
            <h2 className='text-center font-bold text-lg'>Create Task</h2>
            <hr className='py-2 border-none' />
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-2'>

                <input 
                    type="text" 
                    name="task_name" 
                    value={task.task_name} 
                    className='input input-bordered col-span-6'
                    onChange={handleChange} 
                    placeholder="Task Name"
                    required
                />

                <textarea 
                    type="textarea" 
                    name="description"
                    value={task.description} 
                    onChange={handleChange}
                    className='textarea textarea-bordered col-span-6' 
                    placeholder="Description"
                />

                <select
                    id='status'
                    name="status" 
                    className='select select-bordered col-span-6'
                    value={task.status} 
                    onChange={handleChange}
                    required
                >
                    <option disabled selected>
                        Select Status
                    </option>
                    {statusData.map((status) => (
                        <option key={status['id']} value={status['id']}>
                            {status['status_name']}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="date_start"
                    value={task.date_start}
                    onChange={handleChange}
                    className='input input-bordered col-span-3' 
                    placeholder="Start Date"
                    required
                />

                <input
                    type="date"
                    name="date_end"
                    value={task.date_end}
                    onChange={handleChange}
                    className='input input-bordered col-span-3'
                    placeholder="End Date"
                    required
                />

                <select
                    id='assigned_to'
                    name="assigned_to" 
                    className='select select-bordered col-span-6'
                    value={task.assigned_to} 
                    onChange={handleChange}
                    required
                >
                    <option disabled selected>
                        Select Assigned User
                    </option>
                    {userList.map((user) => (
                    <option key={user['id']} value={user['id']}>
                    {user['username']} {user['first_name']} {user['last_name']}
                    </option>
                ))}
                </select>

                <button type="submit" className='btn btn-primary col-span-6'>Save</button>
            </form>
        </div>
    );
};

export default CreateTask;
