import React, { useState, useEffect } from 'react';
import { createCourse, getAllCourses, getAllCoursesSort } from '../services/courseService';
import { getAllTeachers } from '../services/teacherService';
//
const CourseForm = () => {
  const [course, setCourse] = useState({ name: '', credits: '', teacher: '' });
  const [teachers, setTeachers] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState({ name: '', sort: '' });

  useEffect(() => {
    loadTeachers();
    loadCourses();
  }, []);

  const loadTeachers = async () => {
    const response = await getAllTeachers();
    setTeachers(response.data);
  };

  const loadCourses = async (name = '', sort = '') => {
    const response = await getAllCoursesSort(name, sort);
    setCourseList(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCourse(course);
    await loadCourses();
    setCourse({ name: '', credits: '', teacher: '' });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await loadCourses(search.name, search.sort);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create Course</h1>
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

      <form onSubmit={handleSearch}>
        <h1>Search Courses</h1>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={search.name} onChange={handleSearchChange} />
        </div>
        <div>
          <label>Sort:</label>
          <select name="sort" value={search.sort} onChange={handleSearchChange}>
            <option value="">Select sort order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button type="submit">Search</button>
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
      </div>
    </>
  );
};

export default CourseForm;

