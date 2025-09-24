/*
Hyperledger Fabric chaincode for Ayurvedic Herb Traceability
Using fabric-contract-api (JavaScript)
*/

'use strict';

const { Contract } = require('fabric-contract-api');

class TraceabilityContract extends Contract {
    // Utility: emit event
    async emitEvent(ctx, eventName, payload) {
        ctx.stub.setEvent(eventName, Buffer.from(JSON.stringify(payload)));
    }

    // Utility: get client role
    async getClientRole(ctx) {
        // Example: get role from client identity attributes
        const role = ctx.clientIdentity.getAttributeValue('role');
        return role;
    }

    // Create participant
    async CreateParticipant(ctx, participantJSON) {
        const participant = JSON.parse(participantJSON);
        const id = participant.id;
        if (!id) throw new Error('Participant id required');
        await ctx.stub.putState(`PARTICIPANT_${id}`, Buffer.from(JSON.stringify(participant)));
        await this.emitEvent(ctx, 'ParticipantCreated', participant);
        return { success: true };
    }

    // Create batch
    async CreateBatch(ctx, batchJSON) {
        const role = await this.getClientRole(ctx);
        if (role !== 'farmer' && role !== 'collector') throw new Error('Only farmers/collectors can create batches');
        const batch = JSON.parse(batchJSON);
        const id = batch.id;
        if (!id) throw new Error('Batch id required');
        batch.history = [{ event: 'Created', timestamp: Date.now(), by: ctx.clientIdentity.getID() }];
        await ctx.stub.putState(`BATCH_${id}`, Buffer.from(JSON.stringify(batch)));
        await this.emitEvent(ctx, 'BatchCreated', batch);
        return { success: true };
    }

    // Transfer batch
    async TransferBatch(ctx, batchId, toParticipant, metadata) {
        const batchBytes = await ctx.stub.getState(`BATCH_${batchId}`);
        if (!batchBytes || batchBytes.length === 0) throw new Error('Batch not found');
        const batch = JSON.parse(batchBytes.toString());
        batch.owner = toParticipant;
        batch.history.push({ event: 'Transferred', to: toParticipant, metadata, timestamp: Date.now(), by: ctx.clientIdentity.getID() });
        await ctx.stub.putState(`BATCH_${batchId}`, Buffer.from(JSON.stringify(batch)));
        await this.emitEvent(ctx, 'BatchTransferred', { batchId, toParticipant, metadata });
        return { success: true };
    }

    // Record quality test
    async RecordQualityTest(ctx, batchId, testJSON) {
        const batchBytes = await ctx.stub.getState(`BATCH_${batchId}`);
        if (!batchBytes || batchBytes.length === 0) throw new Error('Batch not found');
        const batch = JSON.parse(batchBytes.toString());
        const test = JSON.parse(testJSON);
        if (!batch.qualityTests) batch.qualityTests = [];
        batch.qualityTests.push(test.hash); // Only store hash
        batch.history.push({ event: 'QualityTest', testHash: test.hash, timestamp: Date.now(), by: ctx.clientIdentity.getID() });
        await ctx.stub.putState(`BATCH_${batchId}`, Buffer.from(JSON.stringify(batch)));
        await this.emitEvent(ctx, 'QualityTestRecorded', { batchId, testHash: test.hash });
        return { success: true };
    }

    // Aggregate batches
    async AggregateBatches(ctx, newBatchId, batchIdsJSON, metadata) {
        const batchIds = JSON.parse(batchIdsJSON);
        const newBatch = {
            id: newBatchId,
            aggregatedFrom: batchIds,
            metadata,
            history: [{ event: 'Aggregated', from: batchIds, timestamp: Date.now(), by: ctx.clientIdentity.getID() }]
        };
        await ctx.stub.putState(`BATCH_${newBatchId}`, Buffer.from(JSON.stringify(newBatch)));
        await this.emitEvent(ctx, 'BatchesAggregated', { newBatchId, batchIds, metadata });
        return { success: true };
    }

    // Consume batch for product
    async ConsumeBatchForProduct(ctx, productId, batchIdsJSON, productMetadata) {
        const role = await this.getClientRole(ctx);
        if (role !== 'manufacturer') throw new Error('Only manufacturers can consume batches');
        const batchIds = JSON.parse(batchIdsJSON);
        for (const batchId of batchIds) {
            const batchBytes = await ctx.stub.getState(`BATCH_${batchId}`);
            if (!batchBytes || batchBytes.length === 0) throw new Error(`Batch ${batchId} not found`);
            const batch = JSON.parse(batchBytes.toString());
            batch.consumedInProduct = productId;
            batch.history.push({ event: 'Consumed', productId, productMetadata, timestamp: Date.now(), by: ctx.clientIdentity.getID() });
            await ctx.stub.putState(`BATCH_${batchId}`, Buffer.from(JSON.stringify(batch)));
        }
        await this.emitEvent(ctx, 'BatchConsumed', { productId, batchIds, productMetadata });
        return { success: true };
    }

    // Query batch
    async QueryBatch(ctx, batchId) {
        const batchBytes = await ctx.stub.getState(`BATCH_${batchId}`);
        if (!batchBytes || batchBytes.length === 0) throw new Error('Batch not found');
        return batchBytes.toString();
    }

    // Query trace
    async QueryTrace(ctx, batchId) {
        const batchBytes = await ctx.stub.getState(`BATCH_${batchId}`);
        if (!batchBytes || batchBytes.length === 0) throw new Error('Batch not found');
        const batch = JSON.parse(batchBytes.toString());
        return JSON.stringify(batch.history);
    }

    // Private data collection example (for sensitive fields)
    async PutPrivateData(ctx, collection, key, value) {
        await ctx.stub.putPrivateData(collection, key, Buffer.from(value));
        await this.emitEvent(ctx, 'PrivateDataPut', { collection, key });
        return { success: true };
    }

    async GetPrivateData(ctx, collection, key) {
        const value = await ctx.stub.getPrivateData(collection, key);
        if (!value || value.length === 0) throw new Error('Private data not found');
        return value.toString();
    }
}

module.exports = TraceabilityContract;
