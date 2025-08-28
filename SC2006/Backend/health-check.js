// Comprehensive health check for your Node.js + Supabase app
require('dotenv').config();
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

console.log('🏥 Starting comprehensive health check...\n');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Test 1: Environment Variables
console.log('1️⃣ ENVIRONMENT VARIABLES CHECK');
console.log('================================');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log();

// Test 2: Supabase Connection
console.log('2️⃣ SUPABASE CONNECTION CHECK');
console.log('==============================');

async function testSupabase() {
  try {
    console.log('Testing basic connection...');
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log('❌ Supabase Error:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    console.log('📊 Users table count:', data?.length || 0);
    return true;
  } catch (error) {
    console.log('❌ Supabase connection failed:', error.message);
    return false;
  }
}

// Test 3: Database Tables
async function testTables() {
  console.log('\n3️⃣ DATABASE TABLES CHECK');
  console.log('=========================');
  
  const tables = ['users', 'PsgChat', 'ApChat', 'AsChat', 'fav_schools'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ Table '${table}':`, error.message);
      } else {
        console.log(`✅ Table '${table}': accessible`);
      }
    } catch (error) {
      console.log(`❌ Table '${table}':`, error.message);
    }
  }
}

// Test 4: External APIs
async function testExternalAPIs() {
  console.log('\n4️⃣ EXTERNAL APIS CHECK');
  console.log('======================');
  
  const apis = [
    {
      name: 'CCA Data API',
      url: 'https://data.gov.sg/api/action/datastore_search?resource_id=d_9aba12b5527843afb0b2e8e4ed6ac6bd&limit=1'
    }
    // Add other APIs here
  ];
  
  for (const api of apis) {
    try {
      console.log(`Testing ${api.name}...`);
      const response = await axios.get(api.url, { timeout: 10000 });
      
      console.log(`✅ ${api.name}: Status ${response.status}`);
      if (response.data?.result?.records) {
        console.log(`   📊 Records available: ${response.data.result.records.length}`);
      }
    } catch (error) {
      console.log(`❌ ${api.name}:`, error.message);
      if (error.response) {
        console.log(`   Status: ${error.response.status} ${error.response.statusText}`);
      }
    }
  }
}

// Test 5: JWT Secret Validation
function testJWTSecret() {
  console.log('\n5️⃣ JWT SECRET VALIDATION');
  console.log('=========================');
  
  const jwt = require('jsonwebtoken');
  
  try {
    const testPayload = { userId: 123, test: true };
    const token = jwt.sign(testPayload, process.env.JWT_SECRET, { expiresIn: '1m' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('✅ JWT Secret working correctly');
    console.log('🔒 Token generated and verified successfully');
  } catch (error) {
    console.log('❌ JWT Secret issue:', error.message);
  }
}

// Test 6: Server Dependencies
function testDependencies() {
  console.log('\n6️⃣ DEPENDENCIES CHECK');
  console.log('======================');
  
  const requiredPackages = [
    'express',
    'axios',
    '@supabase/supabase-js',
    'jsonwebtoken',
    'cors',
    'cookie-parser'
  ];
  
  for (const pkg of requiredPackages) {
    try {
      require(pkg);
      console.log(`✅ ${pkg}: installed`);
    } catch (error) {
      console.log(`❌ ${pkg}: missing or error`);
    }
  }
}

// Run all tests
async function runHealthCheck() {
  testDependencies();
  testJWTSecret();
  
  const supabaseOK = await testSupabase();
  if (supabaseOK) {
    await testTables();
  }
  
  await testExternalAPIs();
  
  console.log('\n🏁 HEALTH CHECK COMPLETE');
  console.log('========================');
  console.log('Review the results above to identify any issues.');
  console.log('❌ indicates problems that need to be fixed.');
  console.log('✅ indicates everything is working correctly.');
}

runHealthCheck().catch(console.error);
