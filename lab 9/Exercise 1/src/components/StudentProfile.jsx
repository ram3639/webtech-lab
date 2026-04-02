import React from 'react';


const StudentProfile = () => {
  // Functional Requirement: Store student details inside the component using JavaScript variables
  const name = "Ram Tirlangi";
  const department = "Computer Science and Engineering";
  const year = "III";
  const section = "A";

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>Student Profile</h2>
      </div>
      <div className="profile-details">
      
        <p><strong>Name:</strong> <span>{name}</span></p>
        <p><strong>Department:</strong> <span>{department}</span></p>
        <p><strong>Year:</strong> <span>{year}</span></p>
        <p><strong>Section:</strong> <span>{section}</span></p>
      </div>
    </div>
  );
};

// Functional Requirement: Export the component
export default StudentProfile;
