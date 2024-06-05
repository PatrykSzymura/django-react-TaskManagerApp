import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const EditUser = ({ user, onSuccess }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/user/update/${user.id}/`, formData);
            onSuccess();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input input-bordered"
                />
            </div>
            <div className="form-control">
                <label className="label">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered"
                />
            </div>
            <div className="form-control">
                <label className="label">First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="input input-bordered"
                />
            </div>
            <div className="form-control">
                <label className="label">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="input input-bordered"
                />
            </div>
            <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
        </form>
    );
};

export default EditUser;
