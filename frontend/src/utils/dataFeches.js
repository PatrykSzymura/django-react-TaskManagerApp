import axiosInstance from "./axiosInstance";
import axios from 'axios';

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

export const getTeam = async () => {
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
