import React from 'react';
import './App.css';
import StudentCard from './components/StudentCard';

function App() {
  const students = [
    { name: 'John Doe', department: 'Computer Science', marks: 85 },
    { name: 'Jane Smith', department: 'Electrical Engineering', marks: 92 },
    { name: 'Alice Brown', department: 'Mechanical Engineering', marks: 78 },
    { name: 'Bob Wilson', department: 'Information Technology', marks: 88 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Details</h1>
      </header>
      <main className="student-container">
        {students.map((student, index) => (
          <StudentCard 
            key={index} 
            name={student.name} 
            department={student.department} 
            marks={student.marks} 
          />
        ))}
      </main>
    </div>
  );
}

export default App;
