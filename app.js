// Main application JavaScript
class AyurTrace {
    constructor() {
        this.init();
    }

    init() {
        this.setupServiceWorker();
        this.setupQRScanner();
        this.setupOfflineSupport();
        this.loadUserData();
    }

    // Service Worker for offline support
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
    }

    // QR Scanner functionality
    setupQRScanner() {
        const startScanBtn = document.getElementById('start-scan');
        const uploadQRBtn = document.getElementById('upload-qr');
        const qrFileInput = document.getElementById('qr-file');
        const qrVideo = document.getElementById('qr-video');
        const qrResult = document.getElementById('qr-result');

        if (startScanBtn) {
            startScanBtn.addEventListener('click', () => this.startQRScan());
        }

        if (uploadQRBtn) {
            uploadQRBtn.addEventListener('click', () => qrFileInput.click());
        }

        if (qrFileInput) {
            qrFileInput.addEventListener('change', (e) => this.handleQRUpload(e));
        }
    }

    async startQRScan() {
        const video = document.getElementById('qr-video');
        const startBtn = document.getElementById('start-scan');
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            
            video.srcObject = stream;
            video.style.display = 'block';
            startBtn.textContent = 'Stop Scanning';
            startBtn.onclick = () => this.stopQRScan(stream);
            
            // Start QR detection
            this.detectQRCode(video);
            
        } catch (error) {
            console.error('Camera access denied:', error);
            alert('Camera access is required for QR scanning. Please enable camera permissions.');
        }
    }

    stopQRScan(stream) {
        const video = document.getElementById('qr-video');
        const startBtn = document.getElementById('start-scan');
        
        stream.getTracks().forEach(track => track.stop());
        video.style.display = 'none';
        startBtn.textContent = 'Start Scanning';
        startBtn.onclick = () => this.startQRScan();
    }

    detectQRCode(video) {
        // Simplified QR detection - in real implementation, use a QR library like jsQR
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        const scanFrame = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Simulate QR detection
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const qrCode = this.simulateQRDetection(imageData);
                
                if (qrCode) {
                    this.handleQRResult(qrCode);
                    return;
                }
            }
            
            requestAnimationFrame(scanFrame);
        };
        
        scanFrame();
    }

    simulateQRDetection(imageData) {
        // Simulate QR code detection - return sample data after 3 seconds
        if (Math.random() > 0.99) {
            return 'ASH-2024-001'; // Sample batch ID
        }
        return null;
    }

    handleQRUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Simulate QR code reading from image
                const qrCode = 'ASH-2024-001'; // Sample result
                this.handleQRResult(qrCode);
            };
            reader.readAsDataURL(file);
        }
    }

    handleQRResult(qrCode) {
        const resultDiv = document.getElementById('qr-result');
        
        if (resultDiv) {
            resultDiv.innerHTML = `
                <h3>QR Code Detected!</h3>
                <p>Batch ID: <strong>${qrCode}</strong></p>
                <button class="btn-primary" onclick="window.open('product-details.html?id=${qrCode}', '_blank')">
                    View Product Details
                </button>
            `;
            resultDiv.classList.remove('hidden');
        }
        
        // Stop scanning
        const video = document.getElementById('qr-video');
        if (video && video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
            video.style.display = 'none';
        }
    }

    // Offline support
    setupOfflineSupport() {
        window.addEventListener('online', () => {
            this.showNotification('Connection restored', 'success');
            this.syncOfflineData();
        });

        window.addEventListener('offline', () => {
            this.showNotification('Working offline', 'warning');
        });
    }

    syncOfflineData() {
        const offlineData = this.getOfflineData();
        if (offlineData.length > 0) {
            console.log('Syncing offline data:', offlineData);
            // In real implementation, sync with blockchain
            this.clearOfflineData();
        }
    }

    getOfflineData() {
        return JSON.parse(localStorage.getItem('offlineData') || '[]');
    }

    clearOfflineData() {
        localStorage.removeItem('offlineData');
    }

    storeOfflineData(data) {
        const offlineData = this.getOfflineData();
        offlineData.push({
            ...data,
            timestamp: Date.now(),
            synced: false
        });
        localStorage.setItem('offlineData', JSON.stringify(offlineData));
    }

    // User data management
    loadUserData() {
        const userRole = localStorage.getItem('userRole');
        const username = localStorage.getItem('username');
        
        if (userRole && username) {
            this.updateUserInterface(userRole, username);
        }
    }

    updateUserInterface(role, username) {
        // Update navigation based on user role
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && role) {
            const dashboardLink = document.createElement('a');
            dashboardLink.href = `${role}-dashboard.html`;
            dashboardLink.textContent = 'Dashboard';
            navMenu.insertBefore(dashboardLink, navMenu.lastElementChild);
        }
    }

    // Blockchain simulation
    async recordToBlockchain(data) {
        if (!navigator.onLine) {
            this.storeOfflineData(data);
            this.showNotification('Data stored offline. Will sync when online.', 'info');
            return;
        }

        try {
            // Simulate blockchain transaction
            const txHash = this.generateTxHash();
            const blockNumber = Math.floor(Math.random() * 1000000) + 15000000;
            
            console.log('Recording to blockchain:', {
                data,
                txHash,
                blockNumber,
                timestamp: new Date().toISOString()
            });
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showNotification('Data recorded on blockchain successfully!', 'success');
            
            return {
                txHash,
                blockNumber,
                timestamp: new Date().toISOString()
            };
            
        } catch (error) {
            console.error('Blockchain error:', error);
            this.showNotification('Failed to record on blockchain. Data stored locally.', 'error');
            this.storeOfflineData(data);
        }
    }

    generateTxHash() {
        return '0x' + Array.from({length: 64}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Utility functions
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatCurrency(amount, currency = 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    generateBatchId(herbType) {
        const prefix = herbType.substring(0, 3).toUpperCase();
        const year = new Date().getFullYear();
        const sequence = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        return `${prefix}-${year}-${sequence}`;
    }

    validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.ayurTrace = new AyurTrace();
});

// Global utility functions
function logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

function shareProduct(productId) {
    const url = `${window.location.origin}/product-details.html?id=${productId}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'AyurTrace Product Verification',
            text: 'Check out this verified Ayurvedic herb',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        window.ayurTrace.showNotification('Product link copied to clipboard!', 'success');
    }
}

function printQR(batchId) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>QR Code - ${batchId}</title>
                <style>
                    body { text-align: center; font-family: Arial, sans-serif; }
                    .qr-container { margin: 50px auto; }
                    .qr-code { width: 200px; height: 200px; border: 2px solid #000; margin: 20px auto; }
                    .batch-info { margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="qr-container">
                    <h2>AyurTrace QR Code</h2>
                    <div class="qr-code">QR Code for ${batchId}</div>
                    <div class="batch-info">
                        <p><strong>Batch ID:</strong> ${batchId}</p>
                        <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>Scan to verify authenticity</strong></p>
                    </div>
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}