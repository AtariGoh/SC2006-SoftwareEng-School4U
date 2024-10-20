const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/userLoginSignUp');
const chatRoutes = require('./routes/chatRoutes');
const PSGChatRoutes = require('./routes/PSGChatRoute');
const reviewRoutes = require('./routes/reviewRoutes');

// Use routes
app.use('/api', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/psgchat', PSGChatRoutes);
app.use('/reviews', reviewRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
