const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('.'));

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('📝 Test About navigation at:');
    console.log(`   - http://localhost:${PORT}/test-about-functionality.html`);
    console.log(`   - http://localhost:${PORT}/index.html`);
    console.log(`   - http://localhost:${PORT}/lab-dashboard.html`);
});