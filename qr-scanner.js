// QR Scanner functionality using jsQR library (simplified version)
class QRScanner {
    constructor() {
        this.video = null;
        this.canvas = null;
        this.context = null;
        this.scanning = false;
    }

    async startScanning() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            
            this.video = document.getElementById('qr-video');
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            
            this.video.srcObject = stream;
            this.video.play();
            this.scanning = true;
            
            this.video.addEventListener('loadedmetadata', () => {
                this.canvas.width = this.video.videoWidth;
                this.canvas.height = this.video.videoHeight;
                this.scanFrame();
            });
            
        } catch (error) {
            console.error('Camera access error:', error);
            throw new Error('Camera access denied');
        }
    }

    scanFrame() {
        if (!this.scanning) return;
        
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            
            // Simulate QR detection (in real app, use jsQR library)
            const qrResult = this.detectQR(imageData);
            
            if (qrResult) {
                this.onQRDetected(qrResult);
                return;
            }
        }
        
        requestAnimationFrame(() => this.scanFrame());
    }

    detectQR(imageData) {
        // Simplified QR detection simulation
        // In production, use: const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        // Simulate random detection after some time
        if (Math.random() > 0.995) {
            return {
                data: this.generateSampleBatchId()
            };
        }
        return null;
    }

    generateSampleBatchId() {
        const herbs = ['ASH', 'TUL', 'BRA', 'GIL', 'NIM'];
        const herb = herbs[Math.floor(Math.random() * herbs.length)];
        const year = new Date().getFullYear();
        const sequence = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        return `${herb}-${year}-${sequence}`;
    }

    onQRDetected(result) {
        this.stopScanning();
        
        const resultDiv = document.getElementById('qr-result');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <h3>✅ QR Code Detected!</h3>
                <p>Batch ID: <strong>${result.data}</strong></p>
                <button class="btn-primary" onclick="viewProductDetails('${result.data}')">
                    View Product Details
                </button>
                <button class="btn-secondary" onclick="restartScanning()">
                    Scan Another
                </button>
            `;
            resultDiv.classList.remove('hidden');
        }
    }

    stopScanning() {
        this.scanning = false;
        
        if (this.video && this.video.srcObject) {
            this.video.srcObject.getTracks().forEach(track => track.stop());
            this.video.style.display = 'none';
        }
        
        const startBtn = document.getElementById('start-scan');
        if (startBtn) {
            startBtn.textContent = 'Start Scanning';
            startBtn.onclick = () => this.startScanning();
        }
    }

    async scanFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
                    
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const result = this.detectQR(imageData);
                    
                    if (result) {
                        resolve(result);
                    } else {
                        // Simulate successful detection for demo
                        resolve({ data: this.generateSampleBatchId() });
                    }
                };
                img.src = e.target.result;
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

// Global functions for QR scanner
let qrScanner = null;

function initQRScanner() {
    qrScanner = new QRScanner();
}

function startQRScanning() {
    if (!qrScanner) {
        initQRScanner();
    }
    
    qrScanner.startScanning().catch(error => {
        alert('Camera access is required for QR scanning. Please enable camera permissions and try again.');
    });
    
    const startBtn = document.getElementById('start-scan');
    if (startBtn) {
        startBtn.textContent = 'Stop Scanning';
        startBtn.onclick = stopQRScanning;
    }
}

function stopQRScanning() {
    if (qrScanner) {
        qrScanner.stopScanning();
    }
}

function restartScanning() {
    const resultDiv = document.getElementById('qr-result');
    if (resultDiv) {
        resultDiv.classList.add('hidden');
    }
    startQRScanning();
}

async function handleQRFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!qrScanner) {
        initQRScanner();
    }
    
    try {
        const result = await qrScanner.scanFromFile(file);
        qrScanner.onQRDetected(result);
    } catch (error) {
        alert('Could not read QR code from the selected image. Please try another image.');
    }
}

function viewProductDetails(batchId) {
    window.open(`product-details.html?id=${batchId}`, '_blank');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const startScanBtn = document.getElementById('start-scan');
    const uploadQRBtn = document.getElementById('upload-qr');
    const qrFileInput = document.getElementById('qr-file');
    
    if (startScanBtn) {
        startScanBtn.addEventListener('click', startQRScanning);
    }
    
    if (uploadQRBtn) {
        uploadQRBtn.addEventListener('click', () => {
            if (qrFileInput) {
                qrFileInput.click();
            }
        });
    }
    
    if (qrFileInput) {
        qrFileInput.addEventListener('change', handleQRFileUpload);
    }
});