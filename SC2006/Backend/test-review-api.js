// test-review-api.js - Test the review API endpoint
const axios = require('axios');

async function testReviewAPI() {
  try {
    console.log('🧪 Testing review API endpoint...');
    
    // Test with a school that has reviews
    const schoolsWithReviews = [
      'ADMIRALTY PRIMARY SCHOOL',
      'ADMIRALTY SECONDARY SCHOOL'
    ];
    
    for (const schoolName of schoolsWithReviews) {
      console.log(`\n🔍 Testing reviews for: ${schoolName}`);
      
      try {
        // This will fail because we need authentication token
        const response = await axios.get('http://localhost:5001/api/getReview', {
          params: { name: schoolName },
          timeout: 10000
        });
        
        console.log('✅ Status:', response.status);
        console.log('📊 Reviews found:', response.data.reviews?.length || 0);
        
        if (response.data.reviews && response.data.reviews.length > 0) {
          console.log('📝 Sample review:', response.data.reviews[0]);
        }
        
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('🔐 Authentication required (expected)');
          console.log('Status:', error.response.status);
          console.log('Message:', error.response.data?.error || 'No message');
        } else {
          console.error('❌ Unexpected error:', error.response?.status || error.message);
          if (error.response?.data) {
            console.error('Error details:', error.response.data);
          }
        }
      }
    }
    
    console.log('\n📝 Summary: The review API requires authentication token');
    console.log('The endpoint structure looks correct, but we need to test with proper auth');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testReviewAPI();
