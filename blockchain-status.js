// Blockchain Status Indicator
class BlockchainStatus {
    constructor() {
        this.isConnected = false;
        this.lastBlockNumber = 0;
        this.init();
    }

    init() {
        this.createStatusIndicator();
        this.checkConnection();
        setInterval(() => this.checkConnection(), 5000); // Check every 5 seconds
    }

    createStatusIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'blockchain-status';
        indicator.innerHTML = `
            <div class="status-indicator">
                <div class="status-dot"></div>
                <span class="status-text">Checking...</span>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            #blockchain-status {
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.95);
                padding: 8px 12px;
                border-radius: 20px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                font-size: 12px;
            }
            .status-indicator {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #ffc107;
                animation: pulse 2s infinite;
            }
            .status-dot.connected {
                background: #4CAF50;
            }
            .status-dot.disconnected {
                background: #f44336;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(indicator);
    }

    async checkConnection() {
        try {
            const response = await fetch('/api/blockchain/history');
            const result = await response.json();
            
            if (result.success) {
                this.updateStatus(true, result.transactions?.length || 0);
            } else {
                this.updateStatus(false);
            }
        } catch (error) {
            this.updateStatus(false);
        }
    }

    updateStatus(connected, transactionCount = 0) {
        const dot = document.querySelector('.status-dot');
        const text = document.querySelector('.status-text');
        
        if (connected) {
            dot.className = 'status-dot connected';
            text.textContent = `Blockchain Connected (${transactionCount} tx)`;
            this.isConnected = true;
        } else {
            dot.className = 'status-dot disconnected';
            text.textContent = 'Blockchain Disconnected';
            this.isConnected = false;
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new BlockchainStatus();
});