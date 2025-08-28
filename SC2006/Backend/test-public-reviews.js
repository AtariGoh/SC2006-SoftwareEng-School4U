// test-public-reviews.js - Test the public review endpoint
const axios = require('axios');

async function testPublicReviews() {
  try {
    console.log('🧪 Testing public review endpoint...');
    
    const testSchools = [
      'ADMIRALTY PRIMARY SCHOOL',
      'ADMIRALTY SECONDARY SCHOOL',
      'NONEXISTENT SCHOOL'
    ];
    
    for (const schoolName of testSchools) {
      console.log(`\n🏫 Testing reviews for: ${schoolName}`);
      
      try {
        const response = await axios.get('http://localhost:5001/api/getReviewPublic', {
          params: { name: schoolName },
          timeout: 10000
        });
        
        console.log('✅ Status:', response.status);
        console.log('📊 Response structure:', {
          school_name: response.data.school_name,
          reviewCount: response.data.count || 0,
          hasReviews: !!response.data.reviews && response.data.reviews.length > 0
        });
        
        if (response.data.reviews && response.data.reviews.length > 0) {
          console.log('📝 Sample review:', {
            id: response.data.reviews[0].id,
            username: response.data.reviews[0].username,
            facilities: response.data.reviews[0].rating_facilities,
            accessibility: response.data.reviews[0].rating_accessibility,
            usefulness: response.data.reviews[0].rating_usefulness,
            comment: response.data.reviews[0].review_comment?.substring(0, 30) + '...',
            reviewed_at: response.data.reviews[0].reviewed_at
          });
        } else {
          console.log('📝 No reviews found');
        }
        
      } catch (error) {
        console.log('❌ Error:', error.response?.status || error.message);
        if (error.response?.data) {
          console.log('Error details:', error.response.data);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPublicReviews();
