import React, { useState, useEffect } from 'react';
import { createCourse } from '../services/courseService';
import { getAllTeachers } from '../services/teacherService';
import { getAllCourses, deleteCourse } from '../services/courseService';


const CourseForm = () => {
  const [course, setCourse] = useState({ name: '', credits: '', teacher: '' });
  const [teachers, setTeachers] = useState([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    loadTeachers();
    loadCourses();
  }, []);

  const loadTeachers = async () => {
    const response = await getAllTeachers();
    setTeachers(response.data);
  };

  const loadCourses = async () => {
    const response = await getAllCourses();
    setCourseList(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCourse(course);
    await loadCourses();
    setCourse({ name: '', credits: '', teacher: '' });
  };

  /* const handleDelete = async (id) => {
    await deleteCourse(id);
    loadCourses();
  };*/


  return (
    <>  <form onSubmit={handleSubmit}>
       <h1>Crear Curso</h1>
    <div>
      <label>Name:</label>
      <input type="text" name="name" value={course.name} onChange={handleChange} />
    </div>
    <div>
      <label>Credits:</label>
      <input type="number" name="credits" value={course.credits} onChange={handleChange} />
    </div>
    <div>
      <label>Teacher:</label>
      <select name="teacher" value={course.teacher} onChange={handleChange}>
        <option value="">Select a teacher</option>
        {teachers.map(teacher => (
          <option key={teacher._id} value={teacher._id}>
            {teacher.first_name} {teacher.last_name}
          </option>
        ))}
      </select>
    </div>
    <button type="submit">Create Course</button>
  </form>
  <div>
  <h1>Course List</h1>
  <ul>
     {courseList.map(course => (
      <li key={course._id}>
        {course.name} - {course.credits} credits
      </li>
    ))}
  </ul>
</div></>
   
  );
};

export default CourseForm;
