import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { getPriorities, getTeams } from '../../utils/dataFeches';

const EditProjectForm = () => {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const [teamsData, setTeamsData] = useState([]);
    const [priorityData, setPriData] = useState([]);
    const [project, setProject] = useState({
        project_name: '',
        team_id: '',
        priority: '',
        status: '',
        date_start: '',
        date_end: '',
        description: ''
    });

    const handleMinDateChange = (e) => {
        setMinDate(e.target.value);
        project.date_start = e.target.value;
    };
    
    const handleMaxDateChange = (e) => {
        setMaxDate(e.target.value);
        project.date_end = e.target.value;
    };

    const params = useParams()
    
    useEffect(() => {
        axiosInstance.get(`projects/${params["project_id"]}/`)
            .then(response => {
                setProject(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the project!", error);
            });
        const priorityResponse = getPriorities();
        setPriData(priorityResponse.data);
        const TeamsResponse = getTeams();
        setTeamsData(TeamsResponse.data);
        
    }, [params["project_id"]]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.put(`projects/${params["project_id"]}/`, project)
            .then(response => {
                alert('Project updated successfully!');
            })
            .catch(error => {
                console.error("There was an error updating the project!", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-2'>
            
            
            <input 
                type="text" 
                name="project_name" 
                value={project.project_name} 
                className='input input-bordered col-span-6'
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="team_id" 
                value={project.team_id} 
                onChange={handleChange} 
                className='select select-bordered col-span-2'
            />
            
            
            <input 
                type="text" 
                name="priority" 
                value={project.priority} 
                onChange={handleChange} 
                className='select select-bordered col-span-2'
            />
            <select
              id='priority'
              className='select select-bordered col-span-3'
              value={selectedPriority}
              onChange={handleChange}
              required
            >
              <option disabled selected>
                Select Priority
              </option>
              {priorityData.map((e) => (
                <option key={e['id']} value={e['id']}>
                  {e['priority_name']}
                </option>
              ))}
            </select>
            

            <input 
                type="text" 
                name="status" 
                value={project.status} 
                onChange={handleChange} 
                className='select select-bordered col-span-2'
            />
            <textarea 
                type="textarea" 
                name="description"
                value={project.description} 
                onChange={handleChange}
                className='textarea textarea-bordered col-span-6' 
            />
            <p className='text-right py-3'>Start Date</p>   
            <input 
                type="date" 
                name="date_start"
                max={project.date_end} 
                value={project.date_start} 
                onChange={handleMinDateChange} 
                className='input input-bordered col-span-2'
            />
            
            <p className='text-right py-3'>End date</p>    
            <input 
                type="date"
                name="date_end" 
                min={project.date_start}
                value={project.date_end} 
                onChange={handleMaxDateChange}
                className='input input-bordered col-span-2' 
            />
            
            
            <button type="submit" className='btn btn-primary col-span-6'>Save</button>
        </form>
    );
};

export default EditProjectForm;
