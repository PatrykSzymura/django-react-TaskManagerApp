import { getTeams, getPriorities } from "../../utils/dataFeches";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";



export const AddProjectForm = () => {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [teamsData, setTeamsData] = useState([]);
    const [priorityData, setPriData] = useState([]);
    const [formData, setFormData] = useState({
        project_name: "",
        date_start: "",
        date_end: "",
        description: "",
        team: "",
        priority: "",
        status: 1,
        
    });

    const handleMinDateChange = (e) => {
        setMinDate(e.target.value);
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
    };
    
    const handleMaxDateChange = (e) => {
        setMaxDate(e.target.value);
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
    };
    
    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "team") {
            const intValue = parseInt(value, 10);
            setSelectedTeam(intValue);
            setFormData({
              ...formData,
              [id]: intValue,
            });
        } else if (id === "priority") {
            const intValue = parseInt(value, 10);
            setSelectedPriority(intValue);
            setFormData({
              ...formData,
              [id]: intValue,
            });
        } else {
            setFormData({
              ...formData,
              [id]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(formData);
            const response = await axiosInstance.post('/project/', formData); //create projeckt
            console.log('Project created successfully', response.data);
            // Handle successful project creation (e.g., clear form, show success message, etc.)
        } catch (error) {
            console.error('Error creating project', error);
            setError('Error creating project');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const PriorityResponse = await getPriorities();
            const TeamsResponse = await getTeams();
            setPriData(PriorityResponse.data);
            setTeamsData(TeamsResponse.data);
          } catch (error) {
            console.error('Error fetching data', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div className='main'>
          <h2 className='text-center font-bold text-lg'>Add New Project</h2>
          <hr className='py-2 border-none' />
    
          {/* Form-Main */}
          <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-2'>
            {/* Project-Name */}
            <input
              type='text'
              id='project_name'
              placeholder='ProjectName'
              className='input input-bordered col-span-6'
              required
              onChange={handleChange}
            />
    
            {/* Project-Team-Select */}
            <select
              id='team'
              className='select select-bordered col-span-3'
              value={selectedTeam}
              onChange={handleChange}
              required
            >
              <option disabled selected>
                Select Team
              </option>
              {teamsData.map((team) => (
                <option key={team['team_id']} value={team['team_id']}>
                    {team['team_name']}
                </option>
              ))}
            </select>
    
            {/* Project-Priority-Select */}
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
    
            {/* Project-Text-Area */}
            <textarea
              id='description'
              className='textarea textarea-bordered col-span-6'
              placeholder='Description'
              onChange={handleChange}
            />
    
            {/* Project-Date-Start */}
            <p className='text-right py-3'>Start Date</p>
            <input
              id='date_start'
              type='date'
              className='input input-bordered col-span-2'
              max={maxDate}
              value={minDate}
              placeholder='Start Date'
              required
              onChange={handleMinDateChange}
            />
    
            {/* Project-Date-End */}
            <p className='text-right py-3'>End date</p>
            <input
              id='date_end'
              className='input input-bordered col-span-2'
              type='date'
              placeholder='End Date'
              min={minDate}
              value={maxDate}
              required
              onChange={handleMaxDateChange}
            />
    
            {/* Project-Submit */}
            <button type='submit' className='btn btn-primary col-span-6'>
              {loading ? "Loading..." : "Dodaj Projekt"}
            </button>
          </form>
        </div>
    );
};
export default AddProjectForm;