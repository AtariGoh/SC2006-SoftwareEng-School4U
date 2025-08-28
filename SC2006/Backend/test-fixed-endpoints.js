// Test script to verify all fixed endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5001';

async function testAllEndpoints() {
  console.log('🧪 Testing All Fixed Endpoints\n');
  
  const tests = [
    {
      name: '1. Schools API - Empty Query (Should Work Now)',
      method: 'GET',
      url: `${BASE_URL}/api/schools?query=&level=&programme=&location=&sortBy=name-asc&page=1&limit=10`,
      expectedStatus: 200
    },
    {
      name: '2. Schools API - Valid Query',
      method: 'GET', 
      url: `${BASE_URL}/api/schools?query=anderson&level=&programme=&location=&sortBy=name-asc`,
      expectedStatus: 200
    },
    {
      name: '3. Schools API - No Query Parameters',
      method: 'GET',
      url: `${BASE_URL}/api/schools`,
      expectedStatus: 200
    }
  ];
  
  for (const test of tests) {
    try {
      console.log(`🔍 ${test.name}`);
      
      const response = await axios({
        method: test.method.toLowerCase(),
        url: test.url,
        timeout: 15000,
        validateStatus: () => true // Don't throw on HTTP errors
      });
      
      if (response.status === test.expectedStatus) {
        console.log(`✅ SUCCESS: Status ${response.status}`);
        if (response.data && typeof response.data === 'object') {
          if (response.data.schools !== undefined) {
            console.log(`   📊 Schools: ${response.data.schools?.length || 0} records`);
            console.log(`   📊 CCAs: ${response.data.ccas?.length || 0} records`);
            console.log(`   📊 DistProgs: ${response.data.distProgs?.length || 0} records`);
            console.log(`   📊 Subjects: ${response.data.subjects?.length || 0} records`);
            console.log(`   📊 MOE Programs: ${response.data.moeprog?.length || 0} records`);
          }
        }
      } else {
        console.log(`❌ FAILED: Expected ${test.expectedStatus}, got ${response.status}`);
        console.log(`   Error: ${response.data?.error || response.data?.message || 'Unknown error'}`);
        if (response.data?.details) {
          console.log(`   Details: ${response.data.details}`);
        }
      }
      
    } catch (error) {
      console.log(`❌ REQUEST FAILED: ${error.message}`);
      if (error.code === 'ECONNREFUSED') {
        console.log('   💡 Make sure your server is running on port 5001');
      }
    }
    
    console.log();
  }
  
  console.log('📋 SUMMARY:');
  console.log('   • If all tests show ✅ SUCCESS, your endpoints are fixed!');
  console.log('   • If you see ❌ FAILED, check the server logs for detailed error info');
  console.log('   • Empty queries should now return empty arrays instead of 500 errors');
}

// Run the tests
testAllEndpoints().catch(console.error);
