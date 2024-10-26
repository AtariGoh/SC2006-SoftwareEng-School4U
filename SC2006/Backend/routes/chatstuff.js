const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);


router.post('/psg', async (req, res) => {
   
    const { message } = req.body;
    console.log(message)
    console.log('POST /psg route hit', message);
    const { data, error } = await supabase
      .from('PsgChat')
      .insert([{ message }]);
  
    if (error) {
      return res.status(500).send({ error: 'Error posting message' });
    }
  
    res.status(201).send(data);
});


  module.exports = router;