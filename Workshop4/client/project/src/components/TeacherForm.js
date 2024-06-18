import React, { useState } from 'react';
import { createTeacher } from '../services/teacherService';
import { getAllTeachers, deleteTeacher } from '../services/teacherService';
import { useEffect } from 'react';

const TeacherForm = () => {
  const [teacher, setTeacher] = useState({
    first_name: '',
    last_name: '',
    cedula: '',
    age: ''
  }
);
const [teacherList, setTeacherList] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTeacher(teacher);
    await loadTeachers();
    setTeacher({ first_name: '', last_name: '', cedula: '', age: '' });
  };

  
  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    const response = await getAllTeachers();
    setTeacherList(response.data);
  };

  const handleDelete = async (id) => {
    await deleteTeacher(id);
    loadTeachers();
  };


  return (
    <>
     <form onSubmit={handleSubmit}>
       <h1>Crear Profesor</h1>
      <div>
        <label>First Name:</label>
        <input type="text" name="first_name" value={teacher.first_name} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="last_name" value={teacher.last_name} onChange={handleChange} />
      </div>
      <div>
        <label>Cedula:</label>
        <input type="text" name="cedula" value={teacher.cedula} onChange={handleChange} />
      </div>
      <div>
        <label>Age:</label>
        <input type="number" name="age" value={teacher.age} onChange={handleChange} />
      </div>
      <button type="submit">Create Teacher</button>
    </form>
     <div>
      <h1>Teacher List</h1>
      <ul>
        {teacherList.map(teacher => (
          <li key={teacher._id}>
            {teacher.first_name} {teacher.last_name}
            <button onClick={() => handleDelete(teacher._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
   
  );
};

export default TeacherForm;

