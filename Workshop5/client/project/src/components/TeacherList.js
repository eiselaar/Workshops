import React, { useState, useEffect } from 'react';
import { getAllTeachers, deleteTeacher } from '../services/teacherService';
//
const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const response = await getAllTeachers();
    setTeachers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteTeacher(id);
    loadTeachers();
  };

  return (
    <div>
      <h1>Teacher List</h1>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher._id}>
            {teacher.first_name} {teacher.last_name}
            <button onClick={() => handleDelete(teacher._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
