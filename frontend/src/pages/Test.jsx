// src/components/Tester.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export const Tester = () => {
  const { id } = useParams();
  const nav = useNavigate();
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
          nav('/teams');
        })
        .catch(error => console.error('Error updating team:', error));
    } else {
      axios.post('http://localhost:8000/api/teams/', formData)
        .then(response => {
          console.log('Team created:', response.data);
          nav('/teams');
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

export const UserGroups = () => {
  const [userGroups, setUserGroups] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserGroups = async () => {
      console.log(sessionStorage.getItem('access_token'))
      try {
        const response = await axiosInstance.get('user/groups/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setUserGroups(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchUserGroups();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userGroups) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Groups</h1>
      <p>Username: {userGroups.username}</p>
      <ul>
        {userGroups.groups.map((group, index) => (
          <li key={index}>{group}</li>
        ))}
      </ul>
    </div>
  );
};

