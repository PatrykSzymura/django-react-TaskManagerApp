import axiosInstance ,{ getGroupsFromToken } from "./axiosInstance";
import axios from 'axios';
import refreshToken from "./refreshToken";

export const getProjectsApi = async () => {
    const response = await axiosInstance('get/projects');
    return response
}

export const getUserList = async () => {
    const response =  await axiosInstance('get/accountlist');
    return response
}

export const getPriorities = async () => {
    const response = await axiosInstance('get/priorities');
    return response
}

export const getTeams = async () => {
    const response = await axiosInstance('teams/');
    return response
}

export const getStatus = async () => {
    const response = await axiosInstance('get/statuses');
    return response
}

export const getProject = async (id) => {
    const response = await axiosInstance.get(`get/projects/${id}`);
    return response;
}

export const getAccountList = async () => {
    try {
        const response = await axios.get('/api/get/accountlist');
        return response.data;
    } catch (error) {
        console.error('Error fetching account list:', error);
        throw error; 
    }
};

export const getIq = async () => {
    try {
        refreshToken(localStorage.get['refresh_token'])
        const token = await getGroupsFromToken(localStorage.get['jwtToken'])
        console.log(token)
        //const response = await axiosInstance(`user-groups/${userId}/`);
        //console.log(response.data)
        
    } catch (error) {
        console.error('Error fetching account list:', error);
        throw error; 
    }
}