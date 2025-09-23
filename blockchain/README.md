# AyurTrace Blockchain System

## Overview
Blockchain-based Ayurvedic herbal traceability system using Hyperledger Fabric for immutable supply chain tracking from farm to consumer.

## Architecture

### On-Chain Data (Immutable)
- **CollectionEvent**: Farmer ID, crop ID, timestamp, geo-coordinates, hash of details
- **QualityTest**: Test ID, lab ID, result (pass/fail), hash of lab report
- **ProcessingStep**: Step ID, processor ID, action, timestamp, hash of details
- **Provenance**: Unique batch ID linking all events across supply chain
- **Certification**: Hashes of organic, AYUSH, sustainability certificates
- **QRLink**: QR code mapping to blockchain provenance record

### Off-Chain Data (Hashed On-Chain)
- Full lab reports (PDFs, images, certificates)
- GPS maps and environmental data
- Farmer/community profiles, photos, storytelling data
- Detailed analytics, reports, dashboards

## Smart Contract Rules
- **Geo-fencing**: Only approved GPS zones allowed
- **Seasonal harvesting**: Crop-specific harvesting windows
- **Quality validation**: Moisture thresholds, pesticide limits, DNA checks
- **Role-based access**: Farmers, labs, processors, regulators permissions

## Network Participants
- **FarmersOrg**: Record harvest events
- **LabsOrg**: Quality testing and certification
- **ProcessorsOrg**: Processing steps tracking
- **ManufacturersOrg**: Final product packaging
- **RegulatorsOrg**: Compliance monitoring

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Node.js 16+
- Go 1.19+

### 1. Start Blockchain Network
```bash
cd blockchain
npm run network-up
```

### 2. Deploy Chaincode
```bash
npm run deploy-chaincode
```

### 3. Start API Server
```bash
npm install
npm start
```

## API Endpoints

### Farmer APIs
- `POST /api/collection/record` - Record harvest event
- `GET /api/farmer/batches` - Get farmer's batches

### Lab APIs
- `POST /api/quality/test` - Record quality test
- `GET /api/lab/pending-tests` - Get pending tests

### Consumer APIs
- `GET /api/verify/{qrCode}` - Verify product by QR code
- `GET /api/provenance/{batchId}` - Get full provenance

## Data Flow

### 1. Harvest Recording
```
Farmer → Records harvest → Hash stored on-chain → Full data on IPFS
```

### 2. Quality Testing
```
Lab → Tests sample → Result hash on-chain → Full report on IPFS
```

### 3. Processing
```
Processor → Records steps → Hash on-chain → Process data on IPFS
```

### 4. Consumer Verification
```
QR Scan → Blockchain lookup → Retrieve provenance → Display journey
```

## Example Usage

### Record Collection Event
```javascript
POST /api/collection/record
{
  "farmerID": "FARMER_001",
  "cropID": "ASHWAGANDHA",
  "geoCoords": "26.9124,75.7873",
  "offChainData": {
    "farmName": "Green Valley Organic Farm",
    "soilType": "Sandy loam",
    "organicCertified": true,
    "harvestMethod": "Hand-picked"
  }
}
```

### Record Quality Test
```javascript
POST /api/quality/test
{
  "labID": "LAB_001",
  "batchID": "ASH-2024-001",
  "testType": "PESTICIDE",
  "result": true,
  "labReport": {
    "moistureContent": 8.2,
    "pesticideLevel": 0,
    "heavyMetals": "Within limits",
    "dnaAuthentication": "Confirmed"
  }
}
```

### Verify Product
```javascript
GET /api/verify/QR_ASH_2024_001

Response:
{
  "success": true,
  "provenance": {
    "batchId": "ASH-2024-001",
    "collectionEvents": ["EVENT_1234567890"],
    "qualityTests": ["TEST_1234567891"],
    "status": "VERIFIED"
  },
  "fullData": {
    "collection": {...},
    "quality": {...},
    "processing": {...}
  }
}
```

## Security Features
- **Immutable Records**: Blockchain prevents tampering
- **Hash Verification**: Off-chain data integrity
- **Role-based Access**: Permissioned network
- **Digital Signatures**: Transaction authenticity
- **Geo-fencing**: Location validation
- **Seasonal Restrictions**: Time-based validation

## Compliance
- **AYUSH Ministry**: Regulatory compliance
- **Organic Certification**: Automated validation
- **Fair Trade**: Premium tracking
- **Sustainability**: Carbon footprint monitoring

## Benefits
- **Transparency**: Complete supply chain visibility
- **Trust**: Immutable proof of authenticity
- **Efficiency**: Automated compliance checking
- **Traceability**: Farm-to-consumer tracking
- **Quality Assurance**: Lab-verified products