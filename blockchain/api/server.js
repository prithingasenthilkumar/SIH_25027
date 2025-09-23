const express = require('express');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Blockchain connection setup
async function connectToNetwork() {
    const ccpPath = path.resolve(__dirname, '..', 'config', 'connection.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: true }
    });
    
    const network = await gateway.getNetwork('supply-chain-channel');
    const contract = network.getContract('provenance-cc');
    
    return { gateway, contract };
}

// API Endpoints

// Record Collection Event (Farmer)
app.post('/api/collection/record', async (req, res) => {
    try {
        const { farmerID, cropID, geoCoords, offChainData } = req.body;
        
        // Hash off-chain data
        const detailsHash = crypto.createHash('sha256')
            .update(JSON.stringify(offChainData))
            .digest('hex');
        
        const eventID = `EVENT_${Date.now()}`;
        
        const { gateway, contract } = await connectToNetwork();
        
        await contract.submitTransaction(
            'RecordCollectionEvent',
            eventID,
            farmerID,
            cropID,
            geoCoords,
            detailsHash
        );
        
        await gateway.disconnect();
        
        // Store off-chain data (IPFS/Database)
        await storeOffChainData(eventID, offChainData);
        
        res.json({
            success: true,
            eventID,
            detailsHash,
            message: 'Collection event recorded successfully'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Record Quality Test (Lab)
app.post('/api/quality/test', async (req, res) => {
    try {
        const { labID, batchID, testType, result, labReport } = req.body;
        
        // Hash lab report
        const reportHash = crypto.createHash('sha256')
            .update(JSON.stringify(labReport))
            .digest('hex');
        
        const testID = `TEST_${Date.now()}`;
        
        const { gateway, contract } = await connectToNetwork();
        
        await contract.submitTransaction(
            'RecordQualityTest',
            testID,
            labID,
            batchID,
            reportHash,
            testType,
            result.toString()
        );
        
        await gateway.disconnect();
        
        // Store lab report off-chain
        await storeOffChainData(testID, labReport);
        
        res.json({
            success: true,
            testID,
            reportHash,
            message: 'Quality test recorded successfully'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify Product (Consumer)
app.get('/api/verify/:qrCode', async (req, res) => {
    try {
        const { qrCode } = req.params;
        
        const { gateway, contract } = await connectToNetwork();
        
        // Get provenance data
        const result = await contract.evaluateTransaction('GetProvenance', qrCode);
        const provenance = JSON.parse(result.toString());
        
        await gateway.disconnect();
        
        // Fetch off-chain data
        const fullData = await getFullProvenanceData(provenance);
        
        res.json({
            success: true,
            provenance,
            fullData,
            verified: true
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Get Batch Provenance
app.get('/api/provenance/:batchID', async (req, res) => {
    try {
        const { batchID } = req.params;
        
        const { gateway, contract } = await connectToNetwork();
        
        const result = await contract.evaluateTransaction('GetProvenance', batchID);
        const provenance = JSON.parse(result.toString());
        
        await gateway.disconnect();
        
        res.json({
            success: true,
            provenance
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper Functions

async function storeOffChainData(id, data) {
    // Store in IPFS or database
    const filePath = path.join(__dirname, '..', 'data', `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return filePath;
}

async function getFullProvenanceData(provenance) {
    // Retrieve off-chain data for complete provenance
    const fullData = {
        collection: {},
        quality: {},
        processing: {},
        certifications: {}
    };
    
    // Load off-chain data files
    try {
        for (const eventID of provenance.collectionEvents || []) {
            const dataPath = path.join(__dirname, '..', 'data', `${eventID}.json`);
            if (fs.existsSync(dataPath)) {
                fullData.collection[eventID] = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            }
        }
    } catch (error) {
        console.log('Error loading off-chain data:', error);
    }
    
    return fullData;
}

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Blockchain API server running on port ${PORT}`);
});

module.exports = app;