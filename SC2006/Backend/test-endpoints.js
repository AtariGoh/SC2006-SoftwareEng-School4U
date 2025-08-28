// Quick test script for your improved endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5001'; // or 5002 if you changed it

async function testEndpoints() {
  console.log('🧪 Testing API endpoints...\n');
  
  const tests = [
    {
      name: 'Schools API - Valid Query',
      url: `${BASE_URL}/api/schools?query=anderson`,
      method: 'GET'
    },
    {
      name: 'Schools API - Empty Query',
      url: `${BASE_URL}/api/schools?query=`,
      method: 'GET'
    },
    {
      name: 'Schools API - No Query',
      url: `${BASE_URL}/api/schools`,
      method: 'GET'
    },
    {
      name: 'PSG Chat - Valid School ID',
      url: `${BASE_URL}/api/psgchat/1`,
      method: 'GET'
    },
    {
      name: 'PSG Chat - Invalid School ID',
      url: `${BASE_URL}/api/psgchat/invalid`,
      method: 'GET'
    }
  ];
  
  for (const test of tests) {
    try {
      console.log(`🔍 Testing: ${test.name}`);
      const response = await axios[test.method.toLowerCase()](test.url, {
        timeout: 10000,
        validateStatus: () => true // Don't throw on HTTP errors
      });
      
      console.log(`✅ Status: ${response.status}`);
      if (response.status >= 400) {
        console.log(`❌ Error Response:`, response.data);
      }
      console.log();
      
    } catch (error) {
      console.log(`❌ Request Failed: ${error.message}`);
      console.log();
    }
  }
}

testEndpoints();
