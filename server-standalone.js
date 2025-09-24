const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// In-memory storage (since MySQL is not available)
let users = [
    { username: 'processor', password: 'password123', role: 'processor' },
    { username: 'lab', password: 'password123', role: 'lab' },
    { username: 'manufacturer', password: 'password123', role: 'manufacturer' },
    { username: 'regulator', password: 'password123', role: 'regulator' }
];

let batches = [
    {
        id: 1,
        batch_id: 'ASH-2024-001',
        herb_type: 'ashwagandha',
        quantity: 50,
        process_method: 'sun-drying',
        temperature: 40,
        duration: 24,
        process_notes: 'Premium quality batch',
        status: 'processing',
        created_at: new Date()
    },
    {
        id: 2,
        batch_id: 'TUR-2024-002',
        herb_type: 'turmeric',
        quantity: 75,
        process_method: 'grinding',
        temperature: 35,
        duration: 12,
        process_notes: 'Organic certified batch',
        status: 'completed',
        created_at: new Date()
    }
];

let labTests = [
    {
        id: 1,
        batch_id: 'ASH-2024-001',
        test_type: 'moisture',
        result: '8.2% - passed',
        notes: 'Within acceptable limits',
        created_at: new Date()
    }
];

// API Routes
app.post('/api/signup', (req, res) => {
    const { username, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        role,
        created_at: new Date()
    };
    
    users.push(newUser);
    res.json({ success: true, message: 'User created successfully' });
});

app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body;
    
    const user = users.find(u => u.username === username && u.password === password && u.role === role);
    
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/batches', (req, res) => {
    const { batchId, herbType, quantity, processMethod, temperature, duration, processNotes } = req.body;
    
    const newBatch = {
        id: batches.length + 1,
        batch_id: batchId,
        herb_type: herbType,
        quantity: parseInt(quantity),
        process_method: processMethod,
        temperature: parseInt(temperature),
        duration: parseInt(duration),
        process_notes: processNotes,
        status: 'processing',
        created_at: new Date()
    };
    
    batches.push(newBatch);
    res.json({ success: true, id: newBatch.id });
});

app.get('/api/batches', (req, res) => {
    res.json(batches);
});

app.post('/api/lab-tests', (req, res) => {
    const { batchId, testType, result, notes } = req.body;
    
    const newTest = {
        id: labTests.length + 1,
        batch_id: batchId,
        test_type: testType,
        result: result,
        notes: notes,
        created_at: new Date()
    };
    
    labTests.push(newTest);
    res.json({ success: true, id: newTest.id });
});

app.get('/api/lab-tests', (req, res) => {
    res.json(labTests);
});

app.get('/api/reports', (req, res) => {
    const reports = batches.map(batch => {
        const test = labTests.find(t => t.batch_id === batch.batch_id);
        return {
            ...batch,
            test_type: test ? test.test_type : null,
            result: test ? test.result : null
        };
    });
    res.json(reports);
});

app.get('/api/product/:batchId', (req, res) => {
    const { batchId } = req.params;
    const batch = batches.find(b => b.batch_id === batchId);
    const test = labTests.find(t => t.batch_id === batchId);
    
    if (batch) {
        const result = [{
            ...batch,
            test_type: test ? test.test_type : null,
            result: test ? test.result : null,
            test_notes: test ? test.notes : null
        }];
        res.json(result);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log('🌿 AyurTrace Server Started');
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('📊 Using in-memory storage (no MySQL required)');
    console.log('🔑 Login credentials:');
    console.log('   - processor/password123');
    console.log('   - lab/password123');
    console.log('   - manufacturer/password123');
    console.log('   - regulator/password123');
});