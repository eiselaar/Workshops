import axios from 'axios';

const API_URL = 'http://localhost:3001/api/teachers';

export const getAllTeachers = () => axios.get(API_URL);
export const getTeacherById = (id) => axios.get(`${API_URL}?id=${id}`);
export const createTeacher = (teacher) => axios.post(API_URL, teacher);
export const updateTeacher = (id, teacher) => axios.patch(`${API_URL}?id=${id}`, teacher);
export const deleteTeacher = (id) => axios.delete(`${API_URL}/${id}`);
//