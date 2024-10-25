// src/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL1;
const supabaseKey = process.env.SUPABASE_KEY1;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
