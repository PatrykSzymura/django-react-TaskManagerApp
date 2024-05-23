import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const getGroupsFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    return decodedToken.groups || [];
  } catch (error) {
    console.error('Invalid token:', error);
    return [];
  }
};


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
