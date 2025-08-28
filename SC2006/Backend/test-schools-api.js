// test-schools-api.js - Quick test for schools API
const axios = require('axios');

async function testSchoolsAPI() {
    try {
        console.log('🧪 Testing schools API...');
        
        const response = await axios.get('http://localhost:5001/api/schools', {
            params: { query: 'ang' },
            timeout: 15000
        });
        
        console.log('✅ API Response Status:', response.status);
        console.log('📊 Schools found:', response.data.schools?.length || 0);
        console.log('📊 CCAs found:', response.data.ccas?.length || 0);
        console.log('📊 Subjects found:', response.data.subjects?.length || 0);
        console.log('📊 Dist Programs found:', response.data.distProgs?.length || 0);
        console.log('📊 MOE Programs found:', response.data.moeprog?.length || 0);
        
        // Show first school as example
        if (response.data.schools && response.data.schools.length > 0) {
            console.log('🏫 Example school:', response.data.schools[0]);
        }
        
        console.log('✅ Schools API test successful - No 500 error!');
        
    } catch (error) {
        console.error('❌ Schools API test failed:', error.response?.status || error.message);
        if (error.response?.data) {
            console.error('Error details:', error.response.data);
        }
    }
}

testSchoolsAPI();
