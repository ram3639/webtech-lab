const http = require('http');

// Define the port number
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Log the request method and URL
    console.log(`Received ${req.method} request for: ${req.url}`);

    // Set the response header
    res.setHeader('Content-Type', 'text/html');

    // Create a beautiful HTML response
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Node.js Server - Lab 11</title>
            <style>
                :root {
                    --bg: #030712;
                    --card: #111827;
                    --primary: #818cf8;
                    --accent: #2dd4bf;
                    --text: #f3f4f6;
                    --muted: #9ca3af;
                    --glow: rgba(129, 140, 248, 0.2);
                }
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Outfit', 'Inter', system-ui, sans-serif;
                    background-color: var(--bg);
                    background-image: 
                        radial-gradient(circle at 50% 100%, #1e1b4b 0%, transparent 50%),
                        radial-gradient(circle at 0% 0%, #0f172a 0%, transparent 30%);
                    color: var(--text);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    overflow: hidden;
                }
                .container {
                    background: rgba(17, 24, 39, 0.7);
                    padding: 3.5rem;
                    border-radius: 2rem;
                    box-shadow: 
                        0 20px 25px -5px rgba(0, 0, 0, 0.5),
                        0 0 40px var(--glow);
                    text-align: center;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    max-width: 450px;
                    width: 90%;
                    animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                h1 {
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.025em;
                    background: linear-gradient(135deg, #fff 0%, var(--primary) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                p {
                    font-size: 1.125rem;
                    color: var(--muted);
                    margin-bottom: 2.5rem;
                    line-height: 1.6;
                }
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(45, 212, 191, 0.1);
                    color: var(--accent);
                    padding: 0.75rem 1.5rem;
                    border-radius: 1rem;
                    font-weight: 700;
                    font-size: 0.875rem;
                    border: 1px solid rgba(45, 212, 191, 0.2);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .dot {
                    width: 10px;
                    height: 10px;
                    background-color: var(--accent);
                    border-radius: 50%;
                    box-shadow: 0 0 12px var(--accent);
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(45, 212, 191, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 212, 191, 0); }
                }
                .footer {
                    margin-top: 2.5rem;
                    font-size: 0.8125rem;
                    color: #4b5563;
                    letter-spacing: 0.025em;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Node Server</h1>
                <p>A high-performance, minimalist environment running on raw Node.js architecture.</p>
                <div class="status-badge">
                    <div class="dot"></div>
                    System Active
                </div>
                <div class="footer">LAB 11 &bull; EXERCISE 1</div>
            </div>
        </body>
        </html>
    `;

    // Write the response
    res.write(htmlResponse);

    // End the response
    res.end();
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`\x1b[32m✔ Server is successfully running on http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[36mℹ Press Ctrl+C to stop the server\x1b[0m`);
});
