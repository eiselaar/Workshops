import axios from 'axios';

const API_URL = 'http://localhost:3001/api/courses';

export const getAllCourses = () => axios.get(API_URL);
export const getCourseById = (id) => axios.get(`${API_URL}?id=${id}`);
export const createCourse = (course) => axios.post(API_URL, course);
export const deleteCourse = (id) => axios.delete(`${API_URL}?id=${id}`); // Asegúrate de tener esta línea
