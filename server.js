const express = require('express');
<<<<<<< HEAD
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ayurtrace_mongodb:<db_password>@ayurtrace.u5ikwdo.mongodb.net/?retryWrites=true&w=majority&appName=AyurTrace';

mongoose.connect(MONGODB_URI.replace('<db_password>', process.env.DB_PASSWORD || 'your_password'))
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['processor', 'lab', 'manufacturer', 'regulator'] },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Batch Schema
const batchSchema = new mongoose.Schema({
  batchId: { type: String, required: true, unique: true },
  herbType: { type: String, required: true },
  quantity: { type: Number, required: true },
  farmerId: { type: String, required: true },
  location: { type: String, required: true },
  harvestDate: { type: Date, required: true },
  status: { type: String, default: 'harvested' },
  blockchainHash: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Batch = mongoose.model('Batch', batchSchema);

// Lab Test Schema
const labTestSchema = new mongoose.Schema({
  batchId: { type: String, required: true },
  testType: { type: String, required: true },
  result: { type: String, required: true },
  status: { type: String, required: true },
  testDate: { type: Date, default: Date.now },
  labId: { type: String, required: true },
  certificate: { type: String }
});

const LabTest = mongoose.model('LabTest', labTestSchema);

// Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });
    
    await user.save();
    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.findOne({ username, role });
    
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, user: { username: user.username, role: user.role } });
    } else {
      res.json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post('/api/batches', async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.json({ success: true, id: batch.batchId });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/batches', async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.post('/api/lab-tests', async (req, res) => {
  try {
    const labTest = new LabTest(req.body);
    await labTest.save();
    res.json({ success: true, id: labTest._id });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/api/product/:batchId', async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId });
    const tests = await LabTest.find({ batchId: req.params.batchId });
    
    if (batch) {
      res.json([{
        batchId: batch.batchId,
        herbType: batch.herbType,
        quantity: batch.quantity + 'kg',
        status: batch.status,
        tests: tests
      }]);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AyurTrace server running on port ${PORT}`);
=======
const path = require('path');
const crypto = require('crypto');
const app = express();
const PORT = 7000;

app.use(express.json());
app.use(express.static('.'));

// In-memory blockchain simulation (replace with real blockchain calls)
const blockchainData = new Map();
const transactionHistory = [];

// Blockchain API endpoints
app.post('/api/blockchain/record', async (req, res) => {
    try {
        const data = req.body;
        const txHash = generateTxHash();
        const blockNumber = Math.floor(Math.random() * 1000000) + 15000000;
        const timestamp = new Date().toISOString();
        
        // Store in blockchain simulation
        const blockchainRecord = {
            ...data,
            txHash,
            blockNumber,
            timestamp,
            verified: true
        };
        
        blockchainData.set(data.batchId || data.id, blockchainRecord);
        transactionHistory.push(blockchainRecord);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        res.json({
            success: true,
            txHash,
            blockNumber,
            timestamp,
            message: 'Data recorded on blockchain'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/blockchain/verify/:batchId', async (req, res) => {
    try {
        const { batchId } = req.params;
        const record = blockchainData.get(batchId);
        
        if (record) {
            res.json({
                success: true,
                verified: true,
                data: record,
                message: 'Batch verified on blockchain'
            });
        } else {
            res.json({
                success: false,
                verified: false,
                message: 'Batch not found on blockchain'
            });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/blockchain/history', (req, res) => {
    res.json({
        success: true,
        transactions: transactionHistory.slice(-50) // Last 50 transactions
    });
});

function generateTxHash() {
    return '0x' + crypto.randomBytes(32).toString('hex');
}

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
>>>>>>> 713115b7710eead0c05f2340a5f742f1bf587bae
});