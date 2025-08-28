// test-reviews.js - Check review database structure and data
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkReviewData() {
  try {
    console.log('🔍 Checking fav_schools table for review data...');
    
    // First, let's see what data exists
    const { data: allData, error: allError } = await supabase
      .from('fav_schools')
      .select('*')
      .limit(5);
      
    if (allError) {
      console.error('❌ Error fetching data:', allError);
      return;
    }
    
    console.log('📊 Sample fav_schools data:');
    console.log(JSON.stringify(allData, null, 2));
    
    // Get the schema information by examining the first row
    if (allData.length > 0) {
      console.log('\n📋 Available columns:', Object.keys(allData[0]));
    }
    
    // Check if any entries have review fields
    const { data: reviewData, error: reviewError } = await supabase
      .from('fav_schools')
      .select('id, school_name, rating_facilities, rating_accessibility, rating_usefulness, review_comment')
      .not('rating_facilities', 'is', null);
      
    if (reviewError) {
      console.log('❌ Review columns may not exist:', reviewError.message);
      
      // Try a simpler query to see what's in the table
      const { data: simpleData, error: simpleError } = await supabase
        .from('fav_schools')
        .select('*');
        
      if (simpleError) {
        console.error('❌ Error with simple query:', simpleError);
      } else {
        console.log('📊 Total entries in fav_schools:', simpleData.length);
        if (simpleData.length > 0) {
          console.log('📋 All columns:', Object.keys(simpleData[0]));
        }
      }
    } else {
      console.log('📝 Entries with reviews:', reviewData.length);
      if (reviewData.length > 0) {
        console.log('Sample review entry:', JSON.stringify(reviewData[0], null, 2));
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit(0);
}

checkReviewData();
