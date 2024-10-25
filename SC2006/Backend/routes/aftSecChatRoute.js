const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);




// Route to fetch all chat messages
router.get('/aschat', async (req, res) => {
  try {
    // Fetching all messages from the 'PsgChat' table
    const { data: messages, error } = await supabase
      .from('AsChat')
      .select('*')
      .order('created_at', { ascending: true }); // Order by timestamp ascending


    if (error) {
      throw new Error('Error fetching messages at aschat');
    }


    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to post a new message
router.post('/aschat/messages', async (req, res) => {
  const { message } = req.body;  // Destructure sender and message from the request body


  try {
    const { data, error } = await supabase
      .from('AsChat')
      .insert([{message }])   //add user
      .select("*");


    if (error) {
      throw new Error('Error posting message');
    }


    //create message object
    const result = data[0].message;
    res.status(201).json(result);


  } catch (error) {
    console.log("error in aschat", error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;