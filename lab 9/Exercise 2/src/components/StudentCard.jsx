import React from 'react';
import './StudentCard.css';

const StudentCard = ({ name, department, marks }) => {
  return (
    <div className="student-card">
      <div className="card-header">
        <h3>{name}</h3>
      </div>
      <div className="card-body">
        <p><strong>Department:</strong> <span>{department}</span></p>
        <p><strong>Marks:</strong> <span className="marks">{marks}%</span></p>
      </div>
    </div>
  );
};

export default StudentCard;
