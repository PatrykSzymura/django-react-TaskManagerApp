import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStatus } from '../../utils/dataFeches';

const EditTaskForm = ({ projectId, taskId }) => {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [statusData, setStatus] = useState([])
  const [taskData, setTaskData] = useState({
    project: '',
    task_name: '',
    status: '',
    worker: '',
    date_start: '',
    date_end: '',
    description: '',
  });

  const handleMinDateChange = (e) => {
    setMinDate(e.target.value);
    taskData.date_start = e.target.value;
};

const handleMaxDateChange = (e) => {
    setMaxDate(e.target.value);
    taskData.date_end = e.target.value;
};

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const statusResponse = await getStatus();
        setStatus(statusResponse.data)
        //const response = await axios.get(`/api/projects/${projectId}/tasks/${taskId}`);
       // setTaskData(response.data);

      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        //console.log(taskData);
        const res = await axios.put(`http://localhost:8000/api/task/update/${taskId}`, taskData);
        //console.log('Task created successfully:', res.data);
    } catch (error) {
        console.error('Error creating task:', error);
    }

  };

  return (
    <div>
      <h2 className='text-center font-bold text-lg'>Edit Task</h2>
            <hr className='py-2 border-none' />
      <form onSubmit={handleSubmit} className='grid grid-cols-6'>

          <input 
            type="text" 
            name="task_name"
            value={taskData.task_name}
            className='input input-bordered col-span-6'
            onChange={handleChange} 
            placeholder='Task Name'
          />

          <select
                id='team_id'
                name="status" 
                className='select select-bordered col-span-2'
                value={taskData.status} 
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


          <label>Worker:</label>
          <input type="text" name="worker" value={taskData.worker} onChange={handleChange} />
          <textarea 
                    type="textarea" 
                    name="description"
                    value={taskData.description} 
                    onChange={handleChange}
                    placeholder='Description'
                    className='textarea textarea-bordered col-span-6' 
                />

                <p className='text-right py-3'>Start Date</p>   
                <input 
                    type="date" 
                    name="date_start"
                    max={taskData.date_end} 
                    value={taskData.date_start} 
                    onChange={handleMinDateChange} 
                    className='input input-bordered col-span-2'
                />
                
                <p className='text-right py-3'>End date</p>    
                <input 
                    type="date"
                    name="date_end" 
                    min={taskData.date_start}
                    value={taskData.date_end} 
                    onChange={handleMaxDateChange}
                    className='input input-bordered col-span-2' 
                />

          

        <button type="submit" className='btn btn-primary col-span-6'>Update Task</button>
      </form>
    </div>
  );
};

export default EditTaskForm;
