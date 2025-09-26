// Header and Footer for all pages
function loadHeaderFooter() {
    // Header HTML
    const headerHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">🌿 AyurTrace</div>
                <div class="nav-menu">
                    <a href="index.html">Home</a>
                    <a href="#about">About</a>
                    <a href="#" id="dashboardLink">Dashboard</a>
                    <a href="login.html" id="authLink" onclick="handleAuthClick(event)">Login</a>
                </div>
            </div>
        </nav>
    `;

    // Footer HTML
    const footerHTML = `
        <footer class="bg-gray-900 text-white py-12">
            <div class="container mx-auto px-6 text-center">
                <div class="mb-8">
                    <div class="text-2xl font-bold text-green-400 mb-4">🌿 AyurTrace</div>
                    <p class="text-gray-400 max-w-2xl mx-auto">
                        Securing Ayurvedic Heritage with Blockchain Technology. Ensuring authenticity, quality, and transparency from farm to pharmacy.
                    </p>
                </div>
                <div class="border-t border-gray-800 pt-8">
                    <p class="text-gray-400">&copy; 2024 AyurTrace. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;

    // Insert header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    
    // Insert footer at the end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Update navigation
    updateNavigation();
}

function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    const authLink = document.getElementById('authLink');
    const dashboardLink = document.getElementById('dashboardLink');
    
    if (isLoggedIn) {
        authLink.textContent = 'Logout';
        authLink.href = '#';
        
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

function handleAuthClick(event) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        event.preventDefault();
        logout();
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeaderFooter);