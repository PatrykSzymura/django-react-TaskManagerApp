import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { getUserList, getTeams } from '../../utils/dataFeches';

const TeamForm = () => {
    const [userList, setUserList] = useState([]);
    const [licznik, setLicznik] = useState(0);
    const max = 10;
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [teamList, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        member1: null,
        member2: null,
        member3: null,
        member4: null,
        member5: null,
        member6: null,
        member7: null,
        member8: null,
        member9: null,
        member10: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountListResponse = await getUserList();
                setUserList(accountListResponse.data);
                const TeamsResponse = await getTeams();
                setTeams(TeamsResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === "team_id") {
            const intValue = parseInt(value, 10);
            setSelectedTeam(intValue);
        } else {
            if (checked && licznik < max) {
                const intValue = parseInt(value, 10);
                setFormData({
                    ...formData,
                    [`member${licznik + 1}`]: intValue,
                });
                setLicznik(licznik + 1);
            } else if (!checked) {
                setFormData((prevFormData) => {
                    const newFormData = { ...prevFormData };
                    for (let i = 1; i <= max; i++) {
                        if (newFormData[`member${i}`] === value) {
                            newFormData[`member${i}`] = '';
                            break;
                        }
                    }
                    return newFormData;
                });
                setLicznik(licznik - 1);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Exclude 'teamid' from formData
            const { teamid, ...formDataWithoutTeamId } = formData;
            
            //console.log('Data submitted successfully:', formDataWithoutTeamId);
            const response = await axiosInstance.put(`team/members/update/${selectedTeam}/`, formDataWithoutTeamId);
            //.log('Data submitted successfully:', response.data);
            // Optionally, you can handle success here, like displaying a success message
        } catch (error) {
            console.error('Error submitting data:', error);
            // Optionally, you can handle errors here, like displaying an error message
        }
    };

    return (
        <div>
            <CreateTeam2/>
            <hr className='py-2 border-none' />
            <h2 className='text-center font-bold text-lg'>Manage Users in Teams</h2>
          <hr className='py-2 border-none' />
        <form onSubmit={handleSubmit} className='grid grid-cols-5'>
            <select
                id='teamid'
                name="teamid"
                className='select select-bordered col-span-5'
                value={selectedTeam}
                onChange={handleChange}
                required
            >
                <option disabled selected>
                    Select Team
                </option>
                {teamList.map((team) => (
                    <option key={team['team_id']} value={team['team_id']}>
                        {team['team_name']}
                    </option>
                ))}
            </select>
            <hr className='py-2 border-none col-span-5' />
            {userList.map((user) => (
                <React.Fragment key={user['id']}>
                    <div className='col-span-1'>
                        <input
                            name={"member" + user['id']}
                            type="checkbox"
                            className="toggle"
                            id={user['id']}
                            onChange={handleChange}
                            value={user['id']}
                            disabled={licznik >= max && !formData[`member${user['id']}`]}
                        />
                    </div>
                    <div className='col-span-2'>
                        {user['first_name']} "{user['username']}" {user['last_name']}
                    </div>
                    <div className='col-span-2'>
                        {user['id']} Role
                    </div>
                </React.Fragment>
            ))}
             <hr className='py-2 border-none col-span-5' />
            <button type="submit" className='btn btn-primary col-span-5'>Submit</button>
        </form>
        </div>
    );
};

export const CreateTeam2 = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/team/update', {
                name: name,
            });
            console.log(response.data);
            // Handle success
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div className=' '>
            <h2 className='text-center font-bold text-lg'>Edit Team</h2>
            <hr className='py-2 border-none' />
            <form onSubmit={handleSubmit} className='join join-horizontal grid grid-cols-6'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Team Name'
                        className='input input-bordered col-span-5 join-item '
                    />
                <button type="submit" className='btn join-item btn-primary col-span-1'>Create</button>
            </form>
        </div>
    );
};

export default TeamForm;
