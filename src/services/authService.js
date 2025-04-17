import axios from 'axios';

const API = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
  return axios.post(`${API}/register`, userData);
};

export const loginUser = async (credentials) => {
  return axios.post(`${API}/login`, credentials);
};
