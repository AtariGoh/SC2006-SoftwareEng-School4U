require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

console.log('Testing Supabase connection...');
console.log('URL:', process.env.SUPABASE_URL);
console.log('Key starts with:', process.env.SUPABASE_ANON_KEY?.substring(0, 20) + '...');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Test connection by checking users table
supabase.from('users').select('count', { count: 'exact', head: true })
  .then(response => {
    if (response.error) {
      console.error('❌ Connection failed:', response.error.message);
    } else {
      console.log('✅ Connection successful!');
      console.log('Users table accessible, count:', response.count);
    }
  })
  .catch(error => {
    console.error('❌ Network error:', error.message);
  });
