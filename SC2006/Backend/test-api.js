const axios = require('axios');

// Test the data.gov.sg API that getCCAs.js uses
const CCAdata = 'd_9aba12b5527843afb0b2e8e4ed6ac6bd';
const url = 'https://data.gov.sg/api/action/datastore_search?resource_id=' + CCAdata;

console.log('Testing data.gov.sg API...');
console.log('URL:', url);

axios.get(url + '&limit=1')
  .then(response => {
    console.log('✅ API Response Status:', response.status);
    console.log('✅ API Response Structure:', {
      success: response.data.success,
      recordCount: response.data.result?.records?.length || 0,
      hasRecords: !!response.data.result?.records
    });
  })
  .catch(error => {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
  });
