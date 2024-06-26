import React, { useState, useEffect } from 'react';
import { getAllCareers, deleteCareer } from '../services/careerService';
//
const CareerList = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    const response = await getAllCareers();
    setCareers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteCareer(id);
    loadCareers();
  };

  return (
    <div>
      <h1>Career List</h1>
      <ul>
        {careers.map(career => (
          <li key={career._id}>
            {career.name} - {career.description}
            <button onClick={() => handleDelete(career._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareerList;
