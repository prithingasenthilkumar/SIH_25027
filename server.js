const express = require('express');
const path = require('path');
const app = express();
const PORT = 7000;

app.use(express.json());
app.use(express.static('.'));

// Simple login endpoint
app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body;
    
    // Simple validation (you can enhance this)
    if (username && password && role) {
        res.json({ 
            success: true, 
            user: { username, role }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Simple signup endpoint
app.post('/api/signup', (req, res) => {
    const { username, email, password, role } = req.body;
    res.json({ success: true, message: 'User created successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});