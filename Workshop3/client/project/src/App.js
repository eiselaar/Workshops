import React from 'react';
import CareerList from './components/CareerList';
import CareerForm from './components/CareerForm';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import TeacherList from './components/TeacherList';
import TeacherForm from './components/TeacherForm';

function App() {
  return (
    <div className="App">
      <h1>University Management System</h1>
      <TeacherForm />
      <CareerForm />
      <CourseForm />

    
    </div>
  );
}

export default App;
