// test-auth-review-flow.js - Test the complete authentication and review flow
const axios = require('axios');

async function testAuthReviewFlow() {
  try {
    console.log('🧪 Testing complete authentication and review flow...');
    
    // Step 1: Try to login (you'll need real credentials)
    console.log('\n1️⃣ Testing login...');
    
    // For now, let's test with a mock token or see what the auth endpoint looks like
    // First, let's check what auth endpoints are available
    try {
      const authTest = await axios.get('http://localhost:5001/api/verifySession', {
        withCredentials: true,
        timeout: 5000
      });
      console.log('✅ Session verification:', authTest.status);
    } catch (authError) {
      console.log('❌ Session verification failed:', authError.response?.status || authError.message);
      
      // Try to check if there are any cookies or tokens available
      console.log('🔍 Auth issue - need to login first');
    }
    
    // Step 2: Test review endpoint with schools that have reviews
    console.log('\n2️⃣ Testing review endpoint...');
    
    const testSchools = [
      'ADMIRALTY PRIMARY SCHOOL',
      'ADMIRALTY SECONDARY SCHOOL'
    ];
    
    for (const schoolName of testSchools) {
      console.log(`\n🏫 Testing reviews for: ${schoolName}`);
      
      try {
        const response = await axios.get('http://localhost:5001/api/getReview', {
          params: { name: schoolName },
          withCredentials: true,
          timeout: 10000
        });
        
        console.log('✅ Status:', response.status);
        console.log('📊 Response structure:', {
          hasReviews: !!response.data.reviews,
          reviewCount: response.data.count || 0,
          schoolName: response.data.school_name
        });
        
        if (response.data.reviews && response.data.reviews.length > 0) {
          console.log('📝 Sample review:', {
            id: response.data.reviews[0].id,
            username: response.data.reviews[0].username,
            facilities: response.data.reviews[0].rating_facilities,
            accessibility: response.data.reviews[0].rating_accessibility,
            usefulness: response.data.reviews[0].rating_usefulness,
            comment: response.data.reviews[0].review_comment?.substring(0, 50) + '...'
          });
        }
        
      } catch (error) {
        console.log('❌ Error:', error.response?.status || error.message);
        if (error.response?.data) {
          console.log('Error details:', error.response.data);
        }
      }
    }
    
    console.log('\n📝 Next steps:');
    console.log('1. Frontend needs to be logged in to access reviews');
    console.log('2. Check browser dev tools for authentication cookies/tokens');
    console.log('3. Verify the review data structure matches frontend expectations');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuthReviewFlow();
