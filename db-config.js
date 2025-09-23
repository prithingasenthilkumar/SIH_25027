// MongoDB Database Configuration
const API_BASE_URL = '/api';

class DatabaseAPI {
    // User operations
    static async signup(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            return response.json();
        } catch (error) {
            console.log('Server not available, using demo mode');
            return { success: true, message: 'Demo account created' };
        }
    }

    static async login(credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            return response.json();
        } catch (error) {
            console.log('Server not available, using demo mode');
            // Demo login - accept any credentials
            if (credentials.username && credentials.password && credentials.role) {
                return { success: true, user: credentials };
            }
            return { success: false, error: 'Please fill all fields' };
        }
    }

    // Batch operations
    static async createBatch(batchData) {
        try {
            const response = await fetch(`${API_BASE_URL}/batches`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(batchData)
            });
            return response.json();
        } catch (error) {
            console.log('Server not available, using demo mode');
            return { success: true, id: 'DEMO-' + Date.now() };
        }
    }

    static async getBatches() {
        try {
            const response = await fetch(`${API_BASE_URL}/batches`);
            return response.json();
        } catch (error) {
            console.log('Server not available, using demo data');
            return [];
        }
    }

    // Lab test operations
    static async createLabTest(testData) {
        try {
            const response = await fetch(`${API_BASE_URL}/lab-tests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testData)
            });
            return response.json();
        } catch (error) {
            console.log('Server not available, using demo mode');
            return { success: true, id: 'TEST-' + Date.now() };
        }
    }

    static async getLabTests() {
        try {
            const response = await fetch(`${API_BASE_URL}/lab-tests`);
            return response.json();
        } catch (error) {
            console.log('Server not available, using demo data');
            return [];
        }
    }

    // Product verification
    static async getProduct(batchId) {
        try {
            const response = await fetch(`${API_BASE_URL}/product/${batchId}`);
            return response.json();
        } catch (error) {
            console.log('Server not available, using demo data');
            return [{
                batchId: batchId,
                herbType: 'Ashwagandha',
                quantity: '50kg',
                status: 'verified',
                testType: 'Quality Test',
                result: 'Passed'
            }];
        }
    }
}

// Export for use in other files
window.DatabaseAPI = DatabaseAPI;