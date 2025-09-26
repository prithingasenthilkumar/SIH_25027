const express = require('express');
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

});