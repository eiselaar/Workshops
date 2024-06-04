import React, { useState } from 'react';
import { createCareer } from '../services/careerService';
import { useEffect } from 'react';
import { getAllCareers, deleteCareer } from '../services/careerService';

const CareerForm = () => {
  const [career, setCareer] = useState({ name: '', code: '', description: '' });
  const [careerList, setCareerList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCareer({ ...career, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCareer(career);
    await loadCareers();
    setCareer({ name: '', code: '', description: '' });
  };

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    const response = await getAllCareers();
    setCareerList(response.data);
  };

  const handleDelete = async (id) => {
    await deleteCareer(id);
    loadCareers();
  };

  return (
    <>
     <form onSubmit={handleSubmit}>
        <h1>Crear Carrera</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={career.name} onChange={handleChange} />
      </div>
      <div>
        <label>Code:</label>
        <input type="text" name="code" value={career.code} onChange={handleChange} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={career.description} onChange={handleChange} />
      </div>
      <button type="submit">Create Career</button>
    </form>
     <div>
     <h1>Career List</h1>
     <ul>
       {careerList.map(career => (
         <li key={career._id}>
           {career.name} - {career.description}
           <button onClick={() => handleDelete(career._id)}>Delete</button>
         </li>
       ))}
     </ul>
   </div>
    </>
   
  );
};

export default CareerForm;
