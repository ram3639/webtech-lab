const express = require('express');
const connectDB = require('./db');
const {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
} = require('./controllers/studentController');

const app = express();
const PORT = 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
// 1. Insert data - POST /api/students
app.post('/api/students', createStudent);

// 2. Retrieve data - GET /api/students
app.get('/api/students', getAllStudents);

// 3. Update records - PUT /api/students/:id
app.put('/api/students/:id', updateStudent);

// 4. Delete records - DELETE /api/students/:id
app.delete('/api/students/:id', deleteStudent);

// Basic home route
app.get('/', (req, res) => {
    res.send('<h1>Lab 12 - Exercise 3: Node.js + MongoDB CRUD</h1><p>API endpoints are available at /api/students</p>');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available Endpoints:');
    console.log('POST   /api/students - Create Student');
    console.log('GET    /api/students - Get All Students');
    console.log('PUT    /api/students/:id - Update Student');
    console.log('DELETE /api/students/:id - Delete Student');
});
