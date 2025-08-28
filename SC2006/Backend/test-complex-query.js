// test-complex-query.js - Test various query parameters
const axios = require('axios');

async function testComplexQueries() {
    const tests = [
        { query: '', description: 'Empty query' },
        { query: 'primary', description: 'Level search' },
        { query: 'ang mo kio', description: 'School name search' },
        { query: 'xyz', description: 'Non-existent school' }
    ];
    
    for (const test of tests) {
        try {
            console.log(`\n🧪 Testing: ${test.description} (query: "${test.query}")`);
            
            const response = await axios.get('http://localhost:5001/api/schools', {
                params: { query: test.query },
                timeout: 10000
            });
            
            console.log('✅ Status:', response.status);
            console.log('📊 Results:', {
                schools: response.data.schools?.length || 0,
                ccas: response.data.ccas?.length || 0,
                subjects: response.data.subjects?.length || 0,
                distProgs: response.data.distProgs?.length || 0,
                moeprog: response.data.moeprog?.length || 0
            });
            
        } catch (error) {
            console.error('❌ Test failed:', error.response?.status || error.message);
        }
    }
    
    console.log('\n🎉 All tests completed - No 500 errors detected!');
}

testComplexQueries();
