/*
Unit tests for TraceabilityContract (using Mocha + Chai)
*/
const { ChaincodeMockStub, Transform } = require('@theledger/fabric-mock-stub');
const TraceabilityContract = require('./index');
const chai = require('chai');
const expect = chai.expect;

describe('TraceabilityContract', () => {
    let contract, stub, ctx;
    beforeEach(() => {
        contract = new TraceabilityContract();
        stub = new ChaincodeMockStub('Traceability', contract);
        ctx = { stub, clientIdentity: { getAttributeValue: () => 'farmer', getID: () => 'x509::/OU=client/CN=farmer::/C=US/ST=CA/L=San Francisco/O=Org1/CN=ca.org1.example.com' } };
    });

    it('should create participant', async () => {
        const participant = { id: 'farmer1', name: 'Farmer Joe', role: 'farmer' };
        const res = await contract.CreateParticipant(ctx, JSON.stringify(participant));
        expect(res.success).to.be.true;
        const stored = await stub.getState('PARTICIPANT_farmer1');
        expect(JSON.parse(stored.toString()).name).to.equal('Farmer Joe');
    });

    it('should create batch', async () => {
        const batch = { id: 'batch1', geo: '12.34,56.78', species: 'Ashwagandha', photos: ['hash1'] };
        const res = await contract.CreateBatch(ctx, JSON.stringify(batch));
        expect(res.success).to.be.true;
        const stored = await stub.getState('BATCH_batch1');
        expect(JSON.parse(stored.toString()).species).to.equal('Ashwagandha');
    });

    it('should transfer batch', async () => {
        const batch = { id: 'batch2', geo: '12.34,56.78', species: 'Tulsi', photos: ['hash2'], history: [] };
        await stub.putState('BATCH_batch2', Buffer.from(JSON.stringify(batch)));
        const res = await contract.TransferBatch(ctx, 'batch2', 'processor1', 'metadata');
        expect(res.success).to.be.true;
        const stored = await stub.getState('BATCH_batch2');
        expect(JSON.parse(stored.toString()).owner).to.equal('processor1');
    });

    it('should record quality test', async () => {
        const batch = { id: 'batch3', geo: '12.34,56.78', species: 'Neem', photos: ['hash3'], history: [] };
        await stub.putState('BATCH_batch3', Buffer.from(JSON.stringify(batch)));
        const test = { hash: 'testhash' };
        const res = await contract.RecordQualityTest(ctx, 'batch3', JSON.stringify(test));
        expect(res.success).to.be.true;
        const stored = await stub.getState('BATCH_batch3');
        expect(JSON.parse(stored.toString()).qualityTests[0]).to.equal('testhash');
    });

    it('should aggregate batches', async () => {
        const batchIds = ['batch4', 'batch5'];
        const res = await contract.AggregateBatches(ctx, 'batch6', JSON.stringify(batchIds), 'metadata');
        expect(res.success).to.be.true;
        const stored = await stub.getState('BATCH_batch6');
        expect(JSON.parse(stored.toString()).aggregatedFrom).to.deep.equal(batchIds);
    });

    it('should consume batch for product (manufacturer only)', async () => {
        ctx.clientIdentity.getAttributeValue = () => 'manufacturer';
        const batch = { id: 'batch7', geo: '12.34,56.78', species: 'Brahmi', photos: ['hash7'], history: [] };
        await stub.putState('BATCH_batch7', Buffer.from(JSON.stringify(batch)));
        const res = await contract.ConsumeBatchForProduct(ctx, 'prod1', JSON.stringify(['batch7']), 'prodMeta');
        expect(res.success).to.be.true;
        const stored = await stub.getState('BATCH_batch7');
        expect(JSON.parse(stored.toString()).consumedInProduct).to.equal('prod1');
    });

    it('should query batch', async () => {
        const batch = { id: 'batch8', geo: '12.34,56.78', species: 'Shatavari', photos: ['hash8'], history: [] };
        await stub.putState('BATCH_batch8', Buffer.from(JSON.stringify(batch)));
        const res = await contract.QueryBatch(ctx, 'batch8');
        expect(JSON.parse(res).species).to.equal('Shatavari');
    });

    it('should query trace', async () => {
        const batch = { id: 'batch9', geo: '12.34,56.78', species: 'Guduchi', photos: ['hash9'], history: [{ event: 'Created' }] };
        await stub.putState('BATCH_batch9', Buffer.from(JSON.stringify(batch)));
        const res = await contract.QueryTrace(ctx, 'batch9');
        expect(JSON.parse(res)[0].event).to.equal('Created');
    });

    it('should put/get private data', async () => {
        await contract.PutPrivateData(ctx, 'privateCollection', 'key1', 'secretValue');
        const val = await contract.GetPrivateData(ctx, 'privateCollection', 'key1');
        expect(val).to.equal('secretValue');
    });
});
