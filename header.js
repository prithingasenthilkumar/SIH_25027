// Shared Header Component
function createHeader() {
    return `
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">🌿 AyurTrace</div>
            <div class="nav-menu">
                <a href="index.html">Home</a>
                <a href="product-details.html">Verify</a>
                <a href="reports.html">Reports</a>
                <a href="login.html">Login</a>
                <button id="themeToggle">🌙</button>
            </div>
        </div>
    </nav>
    `;
}

// Shared Footer Component
function createFooter() {
    return `
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>🌿 AyurTrace</h3>
                    <p>Securing Ayurvedic Heritage with Blockchain Technology</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <a href="index.html">Home</a>
                    <a href="product-details.html">Verify Product</a>
                    <a href="reports.html">Reports</a>
                </div>
                <div class="footer-section">
                    <h4>Dashboards</h4>
                    <a href="manufacturer-dashboard.html">Manufacturer</a>
                    <a href="processor-dashboard.html">Processor</a>
                    <a href="lab-dashboard.html">Laboratory</a>
                    <a href="regulator-dashboard.html">Regulator</a>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>📧 info@ayurtrace.com</p>
                    <p>📞 +91 12345 67890</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 AyurTrace. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;
}

// Initialize header and footer on page load
document.addEventListener('DOMContentLoaded', function() {
    // Insert header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = createHeader();
    }
    
    // Insert footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = createFooter();
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Apply dark theme styles immediately
            if (isDark) {
                document.body.style.background = '#1a1a1a';
                document.body.style.color = '#fff';
                // Update all sections
                document.querySelectorAll('section').forEach(section => {
                    section.style.background = '#1a1a1a';
                    section.style.color = '#fff';
                });
                // Update cards and containers
                document.querySelectorAll('div[style*="background:white"], div[style*="background:#fff"]').forEach(el => {
                    el.style.background = '#2d2d2d';
                    el.style.color = '#fff';
                });
            } else {
                document.body.style.background = '#ffffff';
                document.body.style.color = '#333';
                // Reset sections
                document.querySelectorAll('section').forEach(section => {
                    section.style.background = '';
                    section.style.color = '';
                });
                // Reset cards
                document.querySelectorAll('div[style*="background:#2d2d2d"]').forEach(el => {
                    el.style.background = 'white';
                    el.style.color = '#333';
                });
            }
        });
    }
});