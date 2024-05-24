import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTaskForm = ({ projectId, taskId }) => {
  const [taskData, setTaskData] = useState({
    project: '',
    task_name: '',
    status: '',
    worker: '',
    date_start: '',
    date_end: '',
    description: '',
  });

  useEffect(() => {
    // Fetch task data when component mounts
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/tasks/${taskId}`);
      setTaskData(response.data);
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

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
      const response = await axios.put(`/api/projects/${projectId}/tasks/${taskId}/`, taskData);
      console.log('Task updated:', response.data);
      // Redirect or show success message after successful update
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input type="text" name="task_name" value={formData.task_name} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </div>
        <div>
          <label>Worker:</label>
          <input type="text" name="worker" value={formData.worker} onChange={handleChange} />
        </div>
        <div>
          <label>Date Start:</label>
          <input type="date" name="date_start" value={formData.date_start} onChange={handleChange} />
        </div>
        <div>
          <label>Date End:</label>
          <input type="date" name="date_end" value={formData.date_end} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTaskForm;
