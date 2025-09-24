class AyurTraceAI {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.createChatWidget();
        this.setupEventListeners();
    }

    createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.innerHTML = `
            <div id="ai-chat-button" class="ai-chat-button">
                🤖 AURA
            </div>
            <div id="ai-chat-container" class="ai-chat-container hidden">
                <div class="ai-chat-header">
                    <h4>🧠 AyurTrace AI Expert</h4>
                    <button id="ai-chat-close">×</button>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="ai-message">
                        <p><strong>🌿 Welcome to AyurTrace AI!</strong></p>
                        <p>I'm your intelligent assistant with deep knowledge about:</p>
                        <ul>
                            <li><strong>🌿 Ayurvedic Herbs:</strong> Ashwagandha, Turmeric, Brahmi, Neem, Tulsi</li>
                            <li><strong>⛓️ Blockchain Technology:</strong> Traceability & transparency</li>
                            <li><strong>🔬 Quality Testing:</strong> Lab procedures & certificates</li>
                            <li><strong>👥 Stakeholders:</strong> Farmers, Labs, Manufacturers</li>
                            <li><strong>🌍 Sustainability:</strong> Environmental impact tracking</li>
                        </ul>
                        <p><strong>Ask me anything!</strong> I provide detailed, intelligent responses! 🚀</p>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" id="user-input" placeholder="Ask me anything about AyurTrace or Ayurveda...">
                    <button onclick="window.ayurAI.sendMessage()">Send</button>
                </div>
            </div>
        `;
        document.body.appendChild(chatWidget);
        this.addStyles();
        window.ayurAI = this;
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ai-chat-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                color: #333;
                border: 2px solid rgba(0, 0, 0, 0.1);
                border-radius: 50px;
                padding: 15px 20px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                transition: all 0.3s ease;
            }
            .ai-chat-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
            }
            .ai-chat-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 400px;
                height: 600px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 1001;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            .ai-chat-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .ai-chat-header h4 {
                margin: 0;
                font-size: 16px;
            }
            .ai-chat-header button {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            }
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 15px;
                background: #f8f9fa;
            }
            .ai-message {
                background: #e3f2fd;
                padding: 12px 15px;
                border-radius: 15px;
                margin-bottom: 15px;
                border-left: 4px solid #2196f3;
            }
            .user-message {
                background: #667eea;
                color: white;
                padding: 12px 15px;
                border-radius: 15px;
                margin-bottom: 15px;
                margin-left: 15%;
            }
            .ai-message p, .user-message p {
                margin: 0 0 8px 0;
                line-height: 1.5;
            }
            .ai-message p:last-child, .user-message p:last-child {
                margin-bottom: 0;
            }
            .ai-message ul {
                margin: 8px 0;
                padding-left: 20px;
            }
            .ai-message li {
                margin-bottom: 4px;
            }
            .chat-input {
                display: flex;
                padding: 15px;
                border-top: 1px solid #e9ecef;
                background: white;
            }
            .chat-input input {
                flex: 1;
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: 25px;
                outline: none;
                font-size: 14px;
            }
            .chat-input button {
                background: #667eea;
                color: white;
                border: none;
                border-radius: 25px;
                padding: 12px 20px;
                margin-left: 10px;
                cursor: pointer;
                font-weight: bold;
                transition: background 0.3s ease;
            }
            .chat-input button:hover {
                background: #5a6fd8;
            }
            .hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        document.getElementById('ai-chat-button').addEventListener('click', () => this.toggleChat());
        document.getElementById('ai-chat-close').addEventListener('click', () => this.toggleChat());
        document.getElementById('user-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.conversationHistory.push({role: 'user', message: message});
        input.value = '';

        setTimeout(() => {
            const response = this.getIntelligentResponse(message);
            this.addMessage(response, 'ai');
            this.conversationHistory.push({role: 'ai', message: response});
        }, 800);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
        messageDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getIntelligentResponse(message) {
        const lower = message.toLowerCase();
        
        // Greetings
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            return '<strong>🌟 Hello there!</strong><br><br>I\'m your intelligent AyurTrace assistant! I have comprehensive knowledge about our blockchain herb traceability platform, Ayurvedic medicine, quality testing, and sustainability practices.<br><br><strong>What would you like to explore today?</strong> 🚀';
        }

        // Platform overview
        if (lower.includes('what is ayurtrace') || lower.includes('about ayurtrace')) {
            return '<strong>🌿 AyurTrace - Revolutionary Herb Traceability!</strong><br><br><strong>What we do:</strong> We\'re a blockchain-based system that tracks Ayurvedic herbs from farm to consumer, ensuring complete authenticity, quality, and sustainability.<br><br><strong>Key Features:</strong><br>• QR Code scanning for instant verification<br>• Complete supply chain transparency<br>• Lab certificates & quality testing<br>• Sustainability metrics tracking<br>• Mobile-first PWA design<br><br><strong>Technology:</strong> Blockchain, MySQL backend, QR codes, real-time analytics<br><br>Want to know about any specific aspect? 🔍';
        }

        // Herbs information
        if (lower.includes('ashwagandha')) {
            return '<strong>🌿 Ashwagandha (Withania somnifera)</strong><br><br><strong>Benefits:</strong><br>• Stress reduction & anxiety relief<br>• Energy boost & vitality<br>• Immune system support<br>• Sleep quality improvement<br><br><strong>Uses:</strong> Powerful adaptogen for stress management and overall vitality<br><br><strong>Quality Tests we perform:</strong><br>• Withanolide content analysis<br>• Heavy metals screening<br>• Pesticide residue testing<br>• Microbial safety verification<br><br>Our platform tracks every Ashwagandha product from organic farms to your hands with complete transparency! 🔬';
        }

        if (lower.includes('turmeric')) {
            return '<strong>✨ Turmeric (Curcuma longa)</strong><br><br><strong>Benefits:</strong><br>• Powerful anti-inflammatory properties<br>• Rich antioxidant content<br>• Joint health support<br>• Digestive system enhancement<br><br><strong>Uses:</strong> Nature\'s golden healer for inflammation and overall wellness<br><br><strong>Quality Tests:</strong><br>• Curcumin content verification<br>• Purity analysis<br>• Heavy metals detection<br>• Adulterant screening<br><br>We ensure every turmeric product is authentic and pure through blockchain verification! 🧪';
        }

        if (lower.includes('brahmi')) {
            return '<strong>🧠 Brahmi (Bacopa monnieri)</strong><br><br><strong>Benefits:</strong><br>• Memory enhancement<br>• Cognitive function support<br>• Stress relief<br>• Mental clarity improvement<br><br><strong>Uses:</strong> Traditional brain tonic for memory and cognitive enhancement<br><br><strong>Quality Testing:</strong><br>• Bacosides content analysis<br>• Heavy metals screening<br>• Pesticide testing<br>• Authenticity verification<br><br>Perfect for students and professionals seeking cognitive enhancement! 🎓';
        }

        // Blockchain technology
        if (lower.includes('blockchain') || lower.includes('technology')) {
            return '<strong>⛓️ Blockchain Technology in AyurTrace</strong><br><br><strong>Purpose:</strong> Create immutable, tamper-proof records of every herb\'s journey<br><br><strong>Benefits:</strong><br>• Complete transparency in supply chain<br>• Trust through verification<br>• Anti-counterfeiting protection<br>• Permanent audit trail<br><br><strong>Data Stored:</strong><br>• Harvest records & farming practices<br>• Processing steps & methods<br>• Lab test results & certificates<br>• Ownership transfers & logistics<br><br>Every step is permanently recorded - no one can fake or alter the history! 🔒';
        }

        // QR Code scanning
        if (lower.includes('qr') || lower.includes('scan')) {
            return '<strong>📱 QR Code Scanning - Your Gateway to Truth!</strong><br><br><strong>How it works:</strong><br>1. Open AyurTrace website on your mobile<br>2. Click "Start Scanning" to activate camera<br>3. Point camera at QR code on product<br>4. View complete product journey instantly<br><br><strong>What you\'ll see:</strong><br>• Farm origin & farmer details<br>• Processing history<br>• Lab test certificates<br>• Sustainability metrics<br>• Quality verification<br><br><strong>QR Code contains:</strong> Batch ID, Blockchain hash, Product details, Verification link<br><br>It\'s like having a digital passport for every herb! 🌟';
        }

        // Quality testing
        if (lower.includes('quality') || lower.includes('test') || lower.includes('lab')) {
            return '<strong>🔬 Quality Testing - Our Commitment to Excellence</strong><br><br><strong>Testing Types:</strong><br>• Purity analysis<br>• Potency verification<br>• Safety screening<br>• Authenticity confirmation<br><br><strong>Parameters Tested:</strong><br>• Heavy metals (Lead, Mercury, Cadmium)<br>• Pesticide residues<br>• Microbial contamination<br>• Active compound levels<br><br><strong>Certification Process:</strong><br>• Certified laboratories conduct tests<br>• Digital certificates generated<br>• Results stored on blockchain<br>• Tamper-proof verification<br><br>All testing follows international standards with complete transparency! 📋';
        }

        // Stakeholders
        if (lower.includes('farmer') || lower.includes('cultivation')) {
            return '<strong>👨‍🌾 Our Farmers - Heroes of Authentic Herbs</strong><br><br><strong>Their Role:</strong><br>• Cultivate herbs using traditional methods<br>• Record farming data on blockchain<br>• Follow sustainable practices<br>• Maintain organic standards<br><br><strong>Activities:</strong><br>• Plant seeds with proper timing<br>• Monitor growth conditions<br>• Harvest at optimal potency<br>• Upload farming records<br><br><strong>Benefits they receive:</strong><br>• Fair trade premiums<br>• Direct consumer connection<br>• Recognition for sustainable practices<br>• Transparent payment system<br><br>We celebrate and support our farming community! 🌱';
        }

        // Sustainability
        if (lower.includes('sustainability') || lower.includes('environment')) {
            return '<strong>🌍 Sustainability - Protecting Our Planet</strong><br><br><strong>What we track:</strong><br>• Carbon footprint of each product<br>• Water usage in cultivation<br>• Fair trade premiums to farmers<br>• Biodiversity protection efforts<br><br><strong>Environmental Benefits:</strong><br>• Reduced environmental impact<br>• Farmer welfare improvement<br>• Sustainable farming practices<br>• Conservation of native varieties<br><br><strong>Metrics Monitored:</strong><br>• CO2 emissions per batch<br>• Water consumption data<br>• Fair trade payment records<br>• Organic certification status<br><br>Every purchase supports environmental protection! 🌿';
        }

        // How to use
        if (lower.includes('how to use') || lower.includes('how does it work')) {
            return '<strong>🚀 How AyurTrace Works - Simple & Powerful!</strong><br><br><strong>For Consumers:</strong><br>1. 📱 Open website on mobile device<br>2. 📸 Click "Start Scanning" for camera<br>3. 🎯 Point at QR code on product<br>4. 📊 View complete journey & certificates<br>5. ✅ Verify authenticity instantly<br><br><strong>For Stakeholders:</strong><br>1. 🔐 Navigate to Login page<br>2. 👤 Select role (Processor/Lab/Manufacturer)<br>3. 🆔 Enter credentials<br>4. 📋 Access role-specific dashboard<br>5. 📈 Manage workflow & data<br><br>It\'s designed to be intuitive and powerful! 💪';
        }

        // General conversational responses
        if (lower.includes('how are you')) {
            return '<strong>😊 I\'m functioning excellently!</strong><br><br>My AI systems are running smoothly and I\'m ready to provide you with detailed, intelligent responses about AyurTrace, Ayurvedic herbs, blockchain technology, or any other topic you\'re curious about!<br><br><strong>How can I assist you today?</strong> 🌟';
        }

        if (lower.includes('thank')) {
            return '<strong>🙏 You\'re very welcome!</strong><br><br>I\'m always happy to share knowledge and help with anything related to AyurTrace or Ayurvedic wellness. Feel free to ask me more questions - I enjoy our intelligent conversations!<br><br><strong>Is there anything else you\'d like to explore?</strong> 💫';
        }

        // Default intelligent response
        return '<strong>🤔 That\'s a fascinating question!</strong><br><br>I have extensive knowledge about AyurTrace and many other topics. I can provide detailed information about:<br><br>• 🌿 <strong>Ayurvedic herbs</strong> (benefits, uses, testing)<br>• ⛓️ <strong>Blockchain technology</strong> (how it ensures trust)<br>• 🔬 <strong>Quality testing</strong> (lab procedures, certificates)<br>• 👥 <strong>Stakeholders</strong> (farmers, labs, manufacturers)<br>• 🌍 <strong>Sustainability</strong> (environmental impact)<br>• 📱 <strong>Platform usage</strong> (QR scanning, dashboards)<br><br><strong>What specific aspect interests you most?</strong> I\'d love to provide you with detailed insights! 🚀';
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('ai-chat-container');
        const button = document.getElementById('ai-chat-button');
        
        if (this.isOpen) {
            container.classList.remove('hidden');
            button.style.display = 'none';
        } else {
            container.classList.add('hidden');
            button.style.display = 'block';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AyurTraceAI();
});