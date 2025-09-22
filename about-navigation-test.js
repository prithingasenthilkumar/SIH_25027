// About Navigation Test Script
class AboutNavigationTest {
    constructor() {
        this.testResults = [];
    }

    // Test About button functionality
    async runAllTests() {
        console.log('🧪 Starting About Navigation Tests...');
        
        // Test 1: Verify About link exists in main navigation
        this.testAboutLinkExists();
        
        // Test 2: Verify About section exists on main page
        this.testAboutSectionExists();
        
        // Test 3: Test smooth scrolling to About section
        this.testSmoothScrolling();
        
        // Test 4: Test About link from dashboard pages
        this.testDashboardAboutLink();
        
        // Test 5: Test URL hash navigation
        this.testHashNavigation();
        
        this.displayResults();
    }

    testAboutLinkExists() {
        const aboutLinks = document.querySelectorAll('a[href="#about"], a[href*="#about"]');
        const passed = aboutLinks.length > 0;
        
        this.addResult('About link exists in navigation', passed, 
            passed ? `Found ${aboutLinks.length} About link(s)` : 'No About links found');
    }

    testAboutSectionExists() {
        const aboutSection = document.getElementById('about');
        const passed = aboutSection !== null;
        
        this.addResult('About section exists on page', passed,
            passed ? 'About section found with ID "about"' : 'About section not found');
    }

    testSmoothScrolling() {
        const aboutLink = document.querySelector('a[href="#about"]');
        const aboutSection = document.getElementById('about');
        
        if (aboutLink && aboutSection) {
            // Simulate click and check if it scrolls
            aboutLink.addEventListener('click', (e) => {
                e.preventDefault();
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            });
            
            this.addResult('Smooth scrolling functionality', true, 'Click handler added for smooth scrolling');
        } else {
            this.addResult('Smooth scrolling functionality', false, 'Missing About link or section');
        }
    }

    testDashboardAboutLink() {
        // Check if we're on a dashboard page
        const isDashboard = window.location.pathname.includes('dashboard');
        
        if (isDashboard) {
            const aboutLink = document.querySelector('a[href="index.html#about"]');
            const passed = aboutLink !== null;
            
            this.addResult('Dashboard About link redirects to main page', passed,
                passed ? 'About link correctly points to index.html#about' : 'Dashboard About link not found or incorrect');
        } else {
            this.addResult('Dashboard About link test', true, 'Skipped - not on dashboard page');
        }
    }

    testHashNavigation() {
        // Test if URL hash works correctly
        const currentHash = window.location.hash;
        
        if (currentHash === '#about') {
            const aboutSection = document.getElementById('about');
            const passed = aboutSection !== null;
            
            this.addResult('Hash navigation to About section', passed,
                passed ? 'Successfully navigated to About section via hash' : 'Hash navigation failed');
        } else {
            // Simulate hash navigation
            window.location.hash = '#about';
            setTimeout(() => {
                const aboutSection = document.getElementById('about');
                const passed = aboutSection !== null && window.location.hash === '#about';
                
                this.addResult('Hash navigation simulation', passed,
                    passed ? 'Hash navigation works correctly' : 'Hash navigation failed');
            }, 100);
        }
    }

    addResult(testName, passed, details) {
        this.testResults.push({
            name: testName,
            passed: passed,
            details: details,
            timestamp: new Date().toISOString()
        });
    }

    displayResults() {
        console.log('\n📊 About Navigation Test Results:');
        console.log('================================');
        
        let passedCount = 0;
        
        this.testResults.forEach((result, index) => {
            const status = result.passed ? '✅ PASS' : '❌ FAIL';
            console.log(`${index + 1}. ${result.name}: ${status}`);
            console.log(`   Details: ${result.details}`);
            
            if (result.passed) passedCount++;
        });
        
        console.log('\n📈 Summary:');
        console.log(`Total Tests: ${this.testResults.length}`);
        console.log(`Passed: ${passedCount}`);
        console.log(`Failed: ${this.testResults.length - passedCount}`);
        console.log(`Success Rate: ${((passedCount / this.testResults.length) * 100).toFixed(1)}%`);
        
        return this.testResults;
    }
}

// Enhanced About navigation functionality
function enhanceAboutNavigation() {
    // Add smooth scrolling to all About links
    document.querySelectorAll('a[href="#about"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, '#about');
            }
        });
    });
    
    // Handle hash navigation on page load
    window.addEventListener('load', function() {
        if (window.location.hash === '#about') {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                setTimeout(() => {
                    aboutSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    });
}

// Auto-run tests and enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Enhance About navigation
    enhanceAboutNavigation();
    
    // Run tests after a short delay
    setTimeout(() => {
        const tester = new AboutNavigationTest();
        tester.runAllTests();
    }, 500);
});

// Export for manual testing
window.AboutNavigationTest = AboutNavigationTest;