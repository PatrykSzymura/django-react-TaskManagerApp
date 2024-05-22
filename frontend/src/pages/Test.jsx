// src/components/TeamForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const TeamForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ teamname: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`http://localhost:8000/api/teams/${id}/`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('Error fetching team data:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:8000/api/teams/${id}/`, formData)
        .then(response => {
          console.log('Team updated:', response.data);
          history.push('/teams');
        })
        .catch(error => console.error('Error updating team:', error));
    } else {
      axios.post('http://localhost:8000/api/teams/', formData)
        .then(response => {
          console.log('Team created:', response.data);
          history.push('/teams');
        })
        .catch(error => console.error('Error creating team:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Team Name:</label>
        <input
          type="text"
          name="teamname"
          value={formData.teamname}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{isEditing ? 'Update' : 'Create'} Team</button>
    </form>
  );
};

export default TeamForm;
