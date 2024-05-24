import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const EditUser = ({ user, onSuccess }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/edit/user/${user.id}`, formData);
            onSuccess(); // Wywołanie callbacka po udanej edycji
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default EditUser;
