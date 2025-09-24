// AyurTrace Knowledge Base for AI Assistant
const AYURTRACE_KNOWLEDGE = {
    // Core Platform Information
    platform: {
        name: "AyurTrace",
        description: "Blockchain-based Ayurvedic herb traceability system",
        purpose: "Track Ayurvedic herbs from farm to consumer ensuring authenticity, quality, and sustainability",
        technology: "Blockchain, QR codes, PWA, MySQL backend",
        features: [
            "QR Code Scanning for instant verification",
            "Complete provenance tracking from seed to shelf",
            "Lab certificates and quality test results",
            "Sustainability metrics and environmental impact",
            "Mobile-first PWA design with offline support",
            "Real-time analytics and reporting"
        ]
    },

    // Stakeholder Information
    stakeholders: {
        consumers: {
            role: "End users who verify herb authenticity",
            features: ["QR scanning", "Provenance viewing", "Certificate access", "Sustainability info"],
            benefits: ["Verify authenticity", "Access quality data", "See farmer stories", "Ensure safety"]
        },
        farmers: {
            role: "Herb cultivators who start the supply chain",
            activities: ["Plant seeds", "Harvest herbs", "Record farming data", "Upload to blockchain"],
            benefits: ["Fair trade premiums", "Direct consumer connection", "Sustainable practices recognition"]
        },
        processors: {
            role: "Transform raw herbs into processed products",
            dashboard: "Processor Dashboard with batch management",
            features: ["Batch processing workflow", "QR code generation", "Processing documentation", "Quality control"],
            activities: ["Receive raw herbs", "Process into products", "Generate batch QR codes", "Track processing steps"]
        },
        laboratories: {
            role: "Test herb quality and safety",
            dashboard: "Laboratory Dashboard for test management",
            features: ["Test result upload", "Certificate generation", "Batch approval/rejection", "Compliance tracking"],
            tests: ["Purity testing", "Potency analysis", "Pesticide screening", "Heavy metal detection", "Microbial safety"]
        },
        manufacturers: {
            role: "Create final products from verified herbs",
            dashboard: "Manufacturer Dashboard with inventory management",
            features: ["Verified herb inventory", "Product formulation", "Production tracking", "Supply chain integration"],
            activities: ["Source verified herbs", "Create formulations", "Manufacture products", "Generate final QR codes"]
        },
        regulators: {
            role: "Monitor and ensure compliance",
            dashboard: "Regulator Dashboard for oversight",
            features: ["Supply chain monitoring", "Compliance reporting", "Alert management", "Provenance queries"],
            capabilities: ["Real-time monitoring", "Automated reports", "Industry metrics", "Regulatory compliance"]
        }
    },

    // Popular Ayurvedic Herbs
    herbs: {
        ashwagandha: {
            name: "Ashwagandha",
            scientific: "Withania somnifera",
            benefits: ["Stress reduction", "Energy boost", "Immune support", "Sleep improvement"],
            uses: "Adaptogen for stress management and vitality",
            quality_tests: ["Withanolide content", "Heavy metals", "Pesticides", "Microbial safety"]
        },
        turmeric: {
            name: "Turmeric",
            scientific: "Curcuma longa",
            benefits: ["Anti-inflammatory", "Antioxidant", "Joint health", "Digestive support"],
            uses: "Natural anti-inflammatory and healing agent",
            quality_tests: ["Curcumin content", "Purity", "Heavy metals", "Adulterants"]
        },
        brahmi: {
            name: "Brahmi",
            scientific: "Bacopa monnieri",
            benefits: ["Memory enhancement", "Cognitive support", "Stress relief", "Mental clarity"],
            uses: "Brain tonic for memory and cognitive function",
            quality_tests: ["Bacosides content", "Heavy metals", "Pesticides", "Authenticity"]
        },
        neem: {
            name: "Neem",
            scientific: "Azadirachta indica",
            benefits: ["Antibacterial", "Antifungal", "Skin health", "Immune support"],
            uses: "Natural antimicrobial and skin care",
            quality_tests: ["Azadirachtin content", "Microbial limits", "Heavy metals", "Purity"]
        },
        tulsi: {
            name: "Tulsi",
            scientific: "Ocimum sanctum",
            benefits: ["Respiratory health", "Stress relief", "Immune boost", "Antioxidant"],
            uses: "Sacred herb for respiratory and immune health",
            quality_tests: ["Essential oil content", "Heavy metals", "Pesticides", "Authenticity"]
        }
    },

    // Blockchain & Technology
    technology: {
        blockchain: {
            purpose: "Create immutable, tamper-proof records",
            benefits: ["Transparency", "Trust", "Anti-counterfeiting", "Audit trail"],
            data_stored: ["Harvest records", "Processing steps", "Test results", "Ownership transfers"]
        },
        qr_codes: {
            purpose: "Quick access to product information",
            contains: ["Batch ID", "Blockchain hash", "Product details", "Verification link"],
            scanning: "Use camera to scan QR code on product packaging"
        },
        quality_testing: {
            types: ["Purity", "Potency", "Safety", "Authenticity"],
            parameters: ["Heavy metals", "Pesticides", "Microbial limits", "Active compounds"],
            certificates: "All test results stored on blockchain with digital certificates"
        }
    },

    // Sustainability Features
    sustainability: {
        tracking: ["Carbon footprint", "Water usage", "Fair trade premiums", "Biodiversity protection"],
        benefits: ["Environmental protection", "Farmer welfare", "Sustainable practices", "Conservation"],
        metrics: ["CO2 emissions", "Water consumption", "Fair trade payments", "Organic certification"]
    },

    // How to Use Platform
    usage: {
        consumers: {
            steps: [
                "Open AyurTrace website on mobile",
                "Click 'Start Scanning' to activate camera",
                "Point camera at QR code on product",
                "View complete product journey and certificates",
                "Verify authenticity and quality"
            ]
        },
        stakeholders: {
            steps: [
                "Navigate to Login page",
                "Select your role (Processor/Lab/Manufacturer/Regulator)",
                "Enter credentials for demo access",
                "Access role-specific dashboard",
                "Manage workflow and upload data"
            ]
        }
    },

    // Common Questions & Answers
    faq: {
        "what is ayurtrace": "AyurTrace is a blockchain-based system that tracks Ayurvedic herbs from farm to consumer, ensuring authenticity, quality, and sustainability through QR code verification.",
        "how does blockchain help": "Blockchain creates tamper-proof records of every step in the herb's journey, making it impossible to fake or alter the product history.",
        "what can i verify": "You can verify herb authenticity, see complete provenance, access lab certificates, check quality tests, and view sustainability metrics.",
        "is it free to use": "Yes, consumers can scan QR codes and verify products for free using any smartphone.",
        "what herbs are tracked": "We track popular Ayurvedic herbs like Ashwagandha, Turmeric, Brahmi, Neem, Tulsi, and many others.",
        "how accurate are tests": "All testing is done by certified laboratories following international standards, with results stored immutably on blockchain."
    }
};

// Export for use in AI assistant
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AYURTRACE_KNOWLEDGE;
}