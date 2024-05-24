import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import { getPriorities, getStatus, getTeams } from '../../utils/dataFeches';

const EditProjectForm = () => {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [teamsData, setTeamsData] = useState([]);
    const [priorityData, setPriData] = useState([]);
    const [statusData, setStatusData] = useState([]);
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
        const fetchData = async () =>{
            try {
                axiosInstance.get(`projects/${params["project_id"]}/`)
                .then(response => {
                    setProject(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the project!", error);
                });
                const priorityResponse = await getPriorities();
                setPriData(priorityResponse.data);
                const TeamsResponse = await getTeams();
                setTeamsData(TeamsResponse.data);
                const statusResponse = await getStatus();
                setStatusData(statusResponse.data);
                
            } catch (error) {
                console.error('Error fetching data', error);
            }

        };
        fetchData()
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
        <div className='main'>
            <h2 className='text-center font-bold text-lg'>Edit Project</h2>
            <hr className='py-2 border-none' />
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-2'>
                
                
                <input 
                    type="text" 
                    name="project_name" 
                    value={project.project_name} 
                    className='input input-bordered col-span-6'
                    onChange={handleChange} 
                />

                <select
                id='team_id'
                name="team_id" 
                className='select select-bordered col-span-2'
                value={project.team_id}
                onChange={handleChange}
                required
                >
                <option disabled selected>
                    Select Team
                </option>
                {teamsData.map((team) => (
                    <option key={team['teamid']} value={team['teamid']}>
                        {team['teamname']}
                    </option>
                ))}
                </select>
                
                
                <select
                id='priority'
                name="priority" 
                className='select select-bordered col-span-2 '
                value={project.priority}
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

                <select
                id='team_id'
                name="status" 
                className='select select-bordered col-span-2'
                value={project.status} 
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
        </div>
    );
};

export default EditProjectForm;
