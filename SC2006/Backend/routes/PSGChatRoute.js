// routes/PSGChatRoutes.js
const express = require('express');
const { fetchAllMessages, createNewMessage } = require('../controllers/chatController');

const router = express.Router();

// Route to fetch all chat messages
router.get('/psg/messages', fetchAllMessages);

// Route to post a new message
router.post('/psg/messages', createNewMessage);

module.exports = router;
