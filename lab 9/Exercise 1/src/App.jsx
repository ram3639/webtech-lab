import React from 'react';
import StudentProfile from './components/StudentProfile';


function App() {
  return (
    <div className="App">
      <header className="main-header">
        <h1>Student Profile Portal</h1>
      </header>
      <main className="main-content">
      
        <StudentProfile />
      </main>
      <footer className="main-footer">
        <p>&copy; Lab 9 Exercise 1</p>
      </footer>
    </div>
  );
}

export default App;
