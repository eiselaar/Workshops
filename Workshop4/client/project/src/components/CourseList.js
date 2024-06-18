/*import React, { useState, useEffect } from 'react';
import { getAllCourses, deleteCourse } from '../services/courseService';

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

export default CourseList;*/

import React, { useState, useEffect } from 'react';
import { getAllCourses, deleteCourse } from '../services/courseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    loadCourses();
  }, [filter, sortOrder]);

  const loadCourses = async () => {
    const response = await getAllCourses(filter, sortOrder);
    setCourses(response.data);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    loadCourses();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      <h1>Course List</h1>
      <div>
        <label>Filter by name:</label>
        <input type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Sort by name:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
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


