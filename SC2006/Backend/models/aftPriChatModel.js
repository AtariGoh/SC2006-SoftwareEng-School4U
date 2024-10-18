const supabase = require('../src/supabaseClient');

// Fetch all messages from Supabase
const getAllMessages = async () => {
    const { data, error } = await supabase
      .from('aftpri_chat')
      .select('*')
      .order('timestamp', { ascending: true });
  
    if (error) {
      throw new Error('Error fetching messages');
    }
  
    return data;
  };
  
  // Post a new message to Supabase
  const postNewMessage = async (sender, message) => {
    const { data, error } = await supabase
      .from('aftpri_chat')
      .insert([{ sender, message }]);
  
    if (error) {
      throw new Error('Error posting message');
    }
  
    return data;
  };
  
  module.exports = {
    getAllMessages,
    postNewMessage,
  };