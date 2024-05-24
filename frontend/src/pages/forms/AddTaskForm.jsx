import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getPriorities, getStatus, getTeams } from '../../utils/dataFeches';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

const AddTaskForm = ({ projectId }) => {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [statusData, setStatusData] = useState([]);
    const [formData, setFormData] = useState({
        task_name: '',
        status: 0,
        worker: '',
        date_start: '',
        date_end: '',
        description: ''
    });

    const handleMinDateChange = (e) => {
        setMinDate(e.target.value);
        formData.date_start = e.target.value;
    };

    const handleMaxDateChange = (e) => {
        setMaxDate(e.target.value);
        formData.date_end = e.target.value;
    };

  const params = useParams()
    
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const statusResponse = await getStatus();
                setStatusData(statusResponse.data);
                
            } catch (error) {
                console.error('Error fetching data', error);
            }

        };
        fetchData()
    }, [params["project_id"]]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/projects/${projectId}/tasks/`, formData);
      console.log('Task created successfully:', res.data);
      // Optionally, you can redirect the user to another page after successful creation
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
        
        
          
          <input type="text" name="status" value={formData.status} onChange={handleChange} className='select select-bordered col-span-3 bg-primary'/>
          <select
              id='priority'
              className='select select-bordered col-span-3 bg-primary'
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option disabled selected>
                Select Priority
              </option>
              {statusData.map((e) => (
                <option key={e['id']} value={e['id']}>
                  {e['status_name']}
                </option>
              ))}
            </select>
        
            <label>Worker:</label>
            <input type="text" name="worker" value={formData.worker} onChange={handleChange} />
        
            <p className='text-right py-3'>Start Date</p>   
            <input 
                type="date" 
                name="date_start"
                max={formData.date_end} 
                value={formData.date_start} 
                onChange={handleMinDateChange} 
                className='input input-bordered col-span-2'
            />

            <p className='text-right py-3'>End date</p>    
            <input 
                type="date"
                name="date_end" 
                min={formData.date_start}
                value={formData.date_end} 
                onChange={handleMaxDateChange}
                className='input input-bordered col-span-2' 
            />
        
          <textarea
              id='description'
              name="description"
              value={formData.description}
              className='textarea textarea-bordered col-span-6'
              placeholder='Description'
              onChange={handleChange}
            />
        
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
