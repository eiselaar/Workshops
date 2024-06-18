import React, { useState, useEffect } from 'react';
import { getAllCourses, deleteCourse } from '../services/courseService';
//
const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const response = await getAllCourses();
    setCourses(response.data);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    loadCourses();
  };

  return (
    <div>
      <h1>Course List</h1>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            {course.name} - {course.credits} credits
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;

