import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get/teams');
                setTeams(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading teams: {error.message}</p>;

    return (
        <div className="teams-list">
            <h1>Teams</h1>
            <ol>
                {teams.map(team => (
                    <li key={team.id}>
                        {team.name}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Teams;
