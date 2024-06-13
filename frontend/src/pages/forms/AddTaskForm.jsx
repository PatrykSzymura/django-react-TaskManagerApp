import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getPriorities, getStatus, getTeams, getUserList } from '../../utils/dataFeches';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

const AddTaskForm = ({ projectId }) => {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [statusData, setStatusData] = useState([]);
    const [workerData, setWorkerData] = useState([]);
    
    const [formData, setFormData] = useState({
        project : projectId,
        task_name: '',
        status: 1,
        user_id: '',
        date_start: '',
        date_end: '',
        description: '',
    });

    const params = useParams();

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const workerResponse = await getUserList();
                setWorkerData(workerResponse.data);
                const statusResponse = await getStatus();
                setStatusData(statusResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [params["project_id"]]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'status' ? parseInt(value, 10) : value;
        setFormData({ ...formData, [name]: parsedValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //console.log(formData);
            const res = await axios.post(`http://localhost:8000/api/task/${params["project_id"]}/`, formData);
            //console.log('Task created successfully:', res.data);
            window.location.reload();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <h2 className='text-center font-bold text-lg'>Add New Task</h2>
            <hr className='py-2 border-none' />
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-2'>
                <input 
                    type="text" 
                    name="task_name" 
                    value={formData.task_name} 
                    onChange={handleChange} 
                    placeholder='Task Name'
                    className='input input-bordered col-span-6'
                    required
                />

                <select
                    id="status"
                    name="status"
                    className='select select-bordered col-span-3'
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option disabled>
                        Select Status
                    </option>
                    {statusData.map((e) => (
                        <option key={e['id']} value={e['id']}>
                            {e['status_name']}
                        </option>
                    ))}
                </select>

                <select
                    id="user_id"
                    name="user_id"
                    className='select select-bordered col-span-3'
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                >
                    <option disabled>
                        Select Worker
                    </option>
                    {workerData.map((e) => (
                        <option key={e['id']} value={e['id']}>
                            {e['username']}
                        </option>
                    ))}
                </select>
            
                <p className='text-right py-3'>Start Date</p>   
                <input 
                    type="date" 
                    name="date_start"
                    max={formData.date_end} 
                    value={formData.date_start} 
                    onChange={handleChange} 
                    className='input input-bordered col-span-2'
                />

                <p className='text-right py-3'>End date</p>    
                <input 
                    type="date"
                    name="date_end" 
                    min={formData.date_start}
                    value={formData.date_end} 
                    onChange={handleChange}
                    className='input input-bordered col-span-2'
                    required 
                />
            
                <textarea
                    id='description'
                    name="description"
                    value={formData.description}
                    className='textarea textarea-bordered col-span-6'
                    placeholder='Description'
                    onChange={handleChange}
                    required
                />
            
                <button type="submit" className='btn btn-primary col-span-6'>Create Task</button>
            </form>
        </div>
    );
};

export default AddTaskForm;

