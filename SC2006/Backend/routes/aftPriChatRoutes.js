const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);




// Route to fetch all chat messages
router.get('/apchat/:school_id', async (req, res) => {
  const{school_id}=req.params;

  try {
    // Fetching all messages from the 'apChat' table
    const { data: messages, error } = await supabase
      .from('ApChat')
      .select('*')
      .eq('school_id', school_id) // Filter messages by school_id
      .order('created_at', { ascending: true }); // Order by timestamp ascending

    if (error) {
      throw new Error('Error fetching messages');
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to post a new message
router.post('/apchat/messages', async (req, res) => {
  const { message, school_id } = req.body;  // Destructure sender and message from the request body

  try {
    const { data, error } = await supabase
      .from('ApChat')
      .insert([{message, school_id }])   //add user 
      .select("*");

    if (error) {
      throw new Error('Error posting message');
    }

    //create message object
    const result = data[0].message;
    res.status(201).json(result);

  } catch (error) {
    console.log("error in apchat", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
