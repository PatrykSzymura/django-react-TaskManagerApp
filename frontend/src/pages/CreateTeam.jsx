import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get/accountlist');
                setUsers(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/teams');
                setTeams(response.data.teams);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchUsers();
        fetchTeams();
    }, []);

    const handleTeamChange = (e) => {
        setSelectedTeam(e.target.value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="teams" className="block text-sm font-medium text-gray-700">
                    Select Team:
                </label>
                <select
                    id="teams"
                    name="teams"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedTeam}
                    onChange={handleTeamChange}
                >
                    <option value="">Select a team</option>
                    {teams.map((team, index) => (
                        <option key={index} value={team}>
                            {index === teams.length - 1 ? `New Team ${team}` : `Team ${team}`}
                        </option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Checkbox</th>
                            <th>Pracownik</th>
                            <th>Stanowisko</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((person) => (
                            <tr key={person.Id}>
                                <td>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{person.username} {person.Nazwisko}</div>
                                            <div className="text-sm opacity-50">{person.Stanowisko}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {person.Stanowisko}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
