import axios from 'axios';

const API_URL = 'http://localhost:3001/api/careers';

export const getAllCareers = () => axios.get(API_URL);
export const getCareerById = (id) => axios.get(`${API_URL}?id=${id}`);
export const createCareer = (career) => axios.post(API_URL, career);
export const updateCareer = (id, career) => axios.put(`${API_URL}?id=${id}`, career);
export const deleteCareer = (id) => axios.delete(`${API_URL}/${id}`);
