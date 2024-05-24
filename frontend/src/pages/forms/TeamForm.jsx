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
        if (name === "teamid") {
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
            
            console.log('Data submitted successfully:', formDataWithoutTeamId);
            const response = await axiosInstance.put(`teamslist/${selectedTeam}/`, formDataWithoutTeamId);
            console.log('Data submitted successfully:', response.data);
            // Optionally, you can handle success here, like displaying a success message
        } catch (error) {
            console.error('Error submitting data:', error);
            // Optionally, you can handle errors here, like displaying an error message
        }
    };

    return (
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
                    <option key={team['teamid']} value={team['teamid']}>
                        {team['teamname']}
                    </option>
                ))}
            </select>

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
            <button type="submit" className='btn btn-primary col-span-5'>Submit</button>
        </form>
    );
};

export default TeamForm;
