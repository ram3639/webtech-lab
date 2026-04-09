const express = require('express');
const app = express();
const PORT = 3000;

// 1. Application-level Middleware: Logger
// Requirement: Log request details (method, URL, timestamp)
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to: ${req.url}`);
    next(); // Control request flow using next()
};

// 2. Application-level Middleware: Request Preprocessing
// Requirement: Handle request preprocessing
const preprocessingMiddleware = (req, res, next) => {
    req.requestTime = new Date().toLocaleString();
    req.customID = 'REQ-' + Math.floor(Math.random() * 10000);
    console.log(`> Preprocessing: Assigned ID ${req.customID}`);
    next();
};

// Apply application-level middleware globally
app.use(loggerMiddleware);
app.use(preprocessingMiddleware);

// 3. Route-level Middleware: Simple Auth Simulation
// Requirement: Apply middleware to specific routes
const authMiddleware = (req, res, next) => {
    console.log('>> Executing Route-level Middleware: Authentication Check');
    const isAuthorized = true; // Simulated check
    if (isAuthorized) {
        next(); // Proceed to next middleware/handler
    } else {
        res.status(401).send('Unauthorized');
    }
};

// 4. Chained Middleware Demonstration
// Requirement: Create multiple middleware layers using chaining
const checkAdminMiddleware = (req, res, next) => {
    console.log('>>> Executing Chained Middleware: Admin Role Check');
    // Simulate check
    req.isAdmin = true;
    next();
};

// --- ROUTES ---

// Basic Route
app.get('/', (req, res) => {
    res.send(`
        <h1>Middleware Demonstration</h1>
        <p>Request processed at: ${req.requestTime}</p>
        <p>Request ID: ${req.customID}</p>
        <ul>
            <li><a href="/api/profile">Visit Profile (Route-level Middleware)</a></li>
            <li><a href="/api/admin">Visit Admin (Chained Middleware)</a></li>
        </ul>
    `);
});

// Route with Route-level Middleware
app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Profile data accessed successfully!',
        processedAt: req.requestTime,
        requestID: req.customID
    });
});

// Route with Chained Middleware (Auth -> Admin)
app.get('/api/admin', [authMiddleware, checkAdminMiddleware], (req, res) => {
    res.json({
        message: 'Welcome to Admin Dashboard',
        isAdmin: req.isAdmin,
        processedAt: req.requestTime,
        requestID: req.customID
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('--- Middleware Layers Demo ---');
    console.log('Global: Logger, Preprocessing');
    console.log('Route: /api/profile (Auth)');
    console.log('Chained: /api/admin (Auth -> Admin Check)');
});
