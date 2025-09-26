// Common Header and Footer for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Add header if not exists
    if (!document.querySelector('.premium-header')) {
        const headerHTML = `
            <header class="premium-header">
                <nav class="premium-nav">
                    <div class="nav-brand">
                        <div class="brand-icon">🌿</div>
                        <div class="brand-text">
                            <span class="brand-name">AyurTrace</span>
                            <span class="brand-tagline">Blockchain Verified</span>
                        </div>
                    </div>
                    <div class="nav-links">
                        <a href="index.html" class="nav-link">Home</a>
                        <a href="about.html" class="nav-link">About</a>
                        <a href="verify.html" class="nav-link">Verify</a>
                        <a href="#" id="dashboardLink" class="nav-link">Dashboard</a>
                        <a href="login.html" id="authLink" class="nav-btn">Login</a>
                    </div>
                </nav>
            </header>
        `;
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Add footer if not exists
    if (!document.querySelector('.premium-footer')) {
        const footerHTML = `
            <footer class="premium-footer">
                <div class="footer-content">
                    <div class="footer-main">
                        <div class="footer-brand">
                            <div class="footer-logo">
                                <span class="logo-icon">🌿</span>
                                <span class="logo-text">AyurTrace</span>
                            </div>
                            <p class="footer-desc">Revolutionizing Ayurvedic supply chain with blockchain technology. Ensuring authenticity, quality, and heritage preservation.</p>
                            <div class="footer-badges">
                                <span class="badge">⛓️ Blockchain Verified</span>
                                <span class="badge">🔒 100% Secure</span>
                                <span class="badge">🌱 Eco-Friendly</span>
                            </div>
                        </div>
                        
                        <div class="footer-links">
                            <div class="link-group">
                                <h4>Platform</h4>
                                <a href="verify.html">Verify Products</a>
                                <a href="harvest.html">Farm Dashboard</a>
                                <a href="process.html">Processing</a>
                                <a href="test.html">Lab Testing</a>
                            </div>
                            
                            <div class="link-group">
                                <h4>Company</h4>
                                <a href="about.html">About Us</a>
                                <a href="#">Careers</a>
                                <a href="#">Contact</a>
                                <a href="#">Blog</a>
                            </div>
                            
                            <div class="link-group">
                                <h4>Resources</h4>
                                <a href="#">Documentation</a>
                                <a href="#">API Reference</a>
                                <a href="#">Support</a>
                                <a href="#">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <div class="footer-copy">
                            <p>&copy; 2024 AyurTrace. All rights reserved. | Powered by Blockchain Technology</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    const authLink = document.getElementById('authLink');
    const dashboardLink = document.getElementById('dashboardLink');
    
    if (authLink && dashboardLink) {
        if (isLoggedIn) {
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.onclick = logout;
            
            switch(userRole) {
                case 'processor':
                    dashboardLink.href = 'processor-dashboard.html';
                    break;
                case 'lab':
                    dashboardLink.href = 'lab-dashboard.html';
                    break;
                case 'manufacturer':
                    dashboardLink.href = 'manufacturer-dashboard.html';
                    break;
                case 'regulator':
                    dashboardLink.href = 'regulator-dashboard.html';
                    break;
                default:
                    dashboardLink.href = 'login.html';
            }
        } else {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
            dashboardLink.href = 'login.html';
        }
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}