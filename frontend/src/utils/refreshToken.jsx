import axios from 'axios';
import axiosInstance from './axiosInstance';

const refreshToken = async (refreshToken) => {
    try {
        const response = await axiosInstance.post(
            'token/refresh/',
            { refresh: refreshToken }
        );
        const { access } = response.data;
        // Update the JWT token in localStorage or sessionStorage
        localStorage.setItem('jwtToken', access);
        return access;
    } catch (error) {
        // Handle refresh token error, e.g., redirect to login page
        console.error('Error refreshing token:', error);
        throw error;
    }
};

export default refreshToken;