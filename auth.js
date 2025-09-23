// Authentication utility functions
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log('Auth check - isLoggedIn:', isLoggedIn);
    
    if (isLoggedIn !== 'true') {
        console.log('Not logged in, redirecting to login.html');
        window.location.href = 'login.html';
        return false;
    }
    console.log('User is logged in');
    return true;
}

function logout() {
    console.log('Logging out user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Auto-redirect for dashboard pages
function protectDashboard() {
    console.log('Protecting dashboard page');
    checkAuth();
}