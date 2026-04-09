const express = require('express');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();

// Body parser middleware (to handle JSON inputs)
app.use(express.json());

// Routes middleware
app.use('/api/users', userRoutes);

// Basic home route
app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});

// Configure server port
const PORT = 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('API endpoints:');
    console.log(`- GET    http://localhost:${PORT}/api/users`);
    console.log(`- GET    http://localhost:${PORT}/api/users/:id`);
    console.log(`- POST   http://localhost:${PORT}/api/users`);
    console.log(`- PUT    http://localhost:${PORT}/api/users/:id`);
    console.log(`- DELETE http://localhost:${PORT}/api/users/:id`);
});
