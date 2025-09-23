require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI.replace('<db_password>', process.env.DB_PASSWORD);
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

// Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: String,
    password: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const batchSchema = new mongoose.Schema({
    batchId: { type: String, required: true, unique: true },
    herbType: { type: String, required: true },
    quantity: Number,
    processMethod: String,
    temperature: Number,
    duration: Number,
    processNotes: String,
    status: { type: String, default: 'processing' },
    createdAt: { type: Date, default: Date.now }
});

const labTestSchema = new mongoose.Schema({
    batchId: { type: String, required: true },
    testType: String,
    result: String,
    notes: String,
    createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Batch = mongoose.model('Batch', batchSchema);
const LabTest = mongoose.model('LabTest', labTestSchema);

// API Routes
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, password, role });
        await user.save();
        res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.findOne({ username, password, role });
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/batches', async (req, res) => {
    try {
        const batch = new Batch(req.body);
        await batch.save();
        res.json({ success: true, id: batch._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/batches', async (req, res) => {
    try {
        const batches = await Batch.find();
        res.json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/lab-tests', async (req, res) => {
    try {
        const labTest = new LabTest(req.body);
        await labTest.save();
        res.json({ success: true, id: labTest._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/lab-tests', async (req, res) => {
    try {
        const labTests = await LabTest.find();
        res.json(labTests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/product/:batchId', async (req, res) => {
    try {
        const { batchId } = req.params;
        const batch = await Batch.findOne({ batchId });
        const test = await LabTest.findOne({ batchId });
        
        if (batch) {
            const result = {
                ...batch.toObject(),
                testType: test?.testType,
                result: test?.result,
                testNotes: test?.notes
            };
            res.json([result]);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log('🌿 AyurTrace MongoDB Integration Active');
    });
};

startServer();