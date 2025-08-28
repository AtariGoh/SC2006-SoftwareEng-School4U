// test-frontend-issue.js - Test both the subjects API and review functionality
const axios = require('axios');

async function testBothIssues() {
  try {
    console.log('🧪 Testing both subjects API and review functionality...\n');
    
    // Test 1: Check if subjects API is causing 409 errors
    console.log('1️⃣ Testing subjects API (checking for 409 errors)...');
    try {
      const schoolsResponse = await axios.get('http://localhost:5001/api/schools', {
        params: { query: 'admiralty' },
        timeout: 15000
      });
      console.log('✅ Schools API Status:', schoolsResponse.status);
      console.log('📊 Schools API Results:', {
        schools: schoolsResponse.data.schools?.length || 0,
        ccas: schoolsResponse.data.ccas?.length || 0,
        subjects: schoolsResponse.data.subjects?.length || 0,
        distProgs: schoolsResponse.data.distProgs?.length || 0,
        moeprog: schoolsResponse.data.moeprog?.length || 0
      });
    } catch (schoolsError) {
      console.log('❌ Schools API Error:', schoolsError.response?.status || schoolsError.message);
    }
    
    // Test 2: Check review endpoint specifically
    console.log('\n2️⃣ Testing review endpoint...');
    try {
      const reviewResponse = await axios.get('http://localhost:5001/api/getReview', {
        params: { name: 'ADMIRALTY PRIMARY SCHOOL' },
        timeout: 10000
      });
      
      console.log('✅ Review API Status:', reviewResponse.status);
      console.log('📊 Review API Response:', {
        school_name: reviewResponse.data.school_name,
        review_count: reviewResponse.data.count,
        has_reviews_array: !!reviewResponse.data.reviews,
        reviews_length: reviewResponse.data.reviews?.length || 0
      });
      
      if (reviewResponse.data.reviews && reviewResponse.data.reviews.length > 0) {
        console.log('📝 Sample review data:', {
          id: reviewResponse.data.reviews[0].id,
          username: reviewResponse.data.reviews[0].username,
          rating_facilities: reviewResponse.data.reviews[0].rating_facilities,
          rating_accessibility: reviewResponse.data.reviews[0].rating_accessibility,
          rating_usefulness: reviewResponse.data.reviews[0].rating_usefulness,
          review_comment: reviewResponse.data.reviews[0].review_comment?.substring(0, 50) + '...'
        });
      }
      
    } catch (reviewError) {
      console.log('❌ Review API Error:', reviewError.response?.status || reviewError.message);
      if (reviewError.response?.data) {
        console.log('Error details:', reviewError.response.data);
      }
    }
    
    // Test 3: Simulate frontend request exactly as ReviewCard.jsx would make it
    console.log('\n3️⃣ Testing frontend simulation...');
    try {
      const frontendResponse = await axios.get('http://localhost:5001/api/getReview', {
        params: { name: 'ADMIRALTY PRIMARY SCHOOL' },
        withCredentials: true, // This is what frontend uses
        timeout: 10000
      });
      
      console.log('✅ Frontend simulation status:', frontendResponse.status);
      
      // Simulate exact frontend processing
      const reviewsData = frontendResponse.data.reviews || [];
      console.log('📊 Frontend would see:', {
        reviewsArray: Array.isArray(reviewsData),
        length: reviewsData.length,
        firstReview: reviewsData[0] || 'none'
      });
      
    } catch (frontendError) {
      console.log('❌ Frontend simulation error:', frontendError.response?.status || frontendError.message);
    }
    
    console.log('\n📝 Diagnosis:');
    console.log('- 409 error check: Run schools API to see if subjects still causes conflicts');
    console.log('- Review fetch check: Verify data structure matches frontend expectations');
    console.log('- Frontend auth check: Ensure withCredentials works without token requirement');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testBothIssues();
