// Quick authentication test script
console.log('🔧 Testing Authentication System...');

// Test 1: Check initial state
console.log('\n1. Initial Auth State:');
console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));
console.log('userRole:', localStorage.getItem('userRole'));

// Test 2: Simulate login
console.log('\n2. Simulating Login...');
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('userRole', 'processor');
localStorage.setItem('username', 'testuser');
console.log('✅ Login simulation complete');

// Test 3: Check navigation update
console.log('\n3. Testing Navigation Update...');
const loginLink = document.getElementById('loginLink');
const logoutLink = document.getElementById('logoutLink');
const dashboardLink = document.getElementById('dashboardLink');

if (loginLink && logoutLink && dashboardLink) {
    console.log('✅ All navigation elements found');
    console.log('Login link hidden:', loginLink.classList.contains('hidden'));
    console.log('Logout link visible:', !logoutLink.classList.contains('hidden'));
    console.log('Dashboard link visible:', !dashboardLink.classList.contains('hidden'));
    console.log('Dashboard href:', dashboardLink.href);
} else {
    console.log('❌ Navigation elements not found');
}

// Test 4: Test logout
console.log('\n4. Testing Logout Function...');
if (typeof logout === 'function') {
    console.log('✅ Logout function available');
} else {
    console.log('❌ Logout function not found');
}

console.log('\n🎯 Test Complete! Check console for results.');