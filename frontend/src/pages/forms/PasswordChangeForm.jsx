// ChangePasswordForm.js
import React, { useEffect, useState } from 'react';
import refreshToken from '../../utils/refreshToken'
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { getAccessLevel } from '../../utils/dataFeches';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useState(()=>{
        refreshToken(localStorage.getItem('refresh_token'))
        
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'old_password') setOldPassword(value);
        if (name === 'new_password') setNewPassword(value);
        if (name === 'confirm_password') setConfirmPassword(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //console.log(oldPassword)
            const response = await axiosInstance.post(
                '/change-password/',
                { old_password: oldPassword, new_password: newPassword },
                { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }}
            );
            setMessage(response.data.success);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    }

    return (
        <div className='p-2'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-1 w-full'>
                
                <input type="password" name="old_password" value={oldPassword} onChange={handleChange} placeholder="Old Password" className="input input-bordered w-full max-w-xs "  required />
                
                
                <input type="password" name="new_password" value={newPassword} onChange={handleChange} placeholder="New Password" className="input input-bordered w-full max-w-xs"  required />
                
                
                <input type="password" name="confirm_password" value={confirmPassword} onChange={handleChange} placeholder="Confirm New Password" className="input input-bordered w-full max-w-xs"  required />
                
                <button type="submit" className='btn btn-primary '>Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ChangePasswordForm;
