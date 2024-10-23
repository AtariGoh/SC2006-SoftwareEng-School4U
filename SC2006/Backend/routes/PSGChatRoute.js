// routes/PSGChatRoutes.js
const express = require('express');
const router = express.Router();

// Route to fetch all chat messages
router.get('/psgchat', async (req, res) => {
  try {
    // Fetching all messages from the 'PsgChat' table
    const { data: messages, error } = await supabase
      .from('PsgChat')
      .select('*')
      .order('timestamp', { ascending: true }); // Order by timestamp ascending

    if (error) {
      throw new Error('Error fetching messages');
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to post a new message
router.post('/psgchat/messages', async (req, res) => {
  const { message } = req.body;  // Destructure sender and message from the request body

  try {
    const { data, error } = await supabase
      .from('PsgChat')
      .insert([{message }]);   //add user 

    if (error) {
      throw new Error('Error posting message');
    }

    res.status(201).json(data);
  } catch (error) {
    console.log("error in psgchat", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
