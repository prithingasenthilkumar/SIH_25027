// MongoDB Database Configuration
const API_BASE_URL = '/api';

class DatabaseAPI {
    // User operations
    static async signup(userData) {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    static async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return response.json();
    }

    // Batch operations
    static async createBatch(batchData) {
        const response = await fetch(`${API_BASE_URL}/batches`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(batchData)
        });
        return response.json();
    }

    static async getBatches() {
        const response = await fetch(`${API_BASE_URL}/batches`);
        return response.json();
    }

    // Lab test operations
    static async createLabTest(testData) {
        const response = await fetch(`${API_BASE_URL}/lab-tests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData)
        });
        return response.json();
    }

    static async getLabTests() {
        const response = await fetch(`${API_BASE_URL}/lab-tests`);
        return response.json();
    }

    // Product verification
    static async getProduct(batchId) {
        const response = await fetch(`${API_BASE_URL}/product/${batchId}`);
        return response.json();
    }
}

// Export for use in other files
window.DatabaseAPI = DatabaseAPI;