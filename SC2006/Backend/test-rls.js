// Check Supabase RLS settings
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkRLS() {
  console.log('🔒 Checking Row Level Security settings...\n');
  
  const tables = ['users', 'PsgChat', 'ApChat', 'AsChat', 'fav_schools'];
  
  for (const table of tables) {
    try {
      // Test SELECT
      const { data: selectData, error: selectError } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      // Test INSERT (for chat tables)
      let insertResult = null;
      if (table.includes('Chat')) {
        const { error: insertError } = await supabase
          .from(table)
          .insert([{ message: 'Test message', school_id: 999 }])
          .select();
        insertResult = insertError ? `❌ ${insertError.message}` : '✅ INSERT allowed';
      }
      
      console.log(`📋 Table: ${table}`);
      console.log(`   SELECT: ${selectError ? `❌ ${selectError.message}` : '✅ Allowed'}`);
      if (insertResult) {
        console.log(`   INSERT: ${insertResult}`);
      }
      console.log();
      
    } catch (error) {
      console.log(`❌ ${table}: ${error.message}\n`);
    }
  }
}

checkRLS();
