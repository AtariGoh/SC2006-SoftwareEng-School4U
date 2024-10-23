const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/userLoginSignUp');
const PSGChatRoutes = require('./routes/PSGChatRoute');
const aftPriChatRoutes = require('./routes/aftPriChatRoutes');
const aftSecChatRoutes = require('./routes/aftSecChatRoute');

// Use routes
app.use('/api', authRoutes);
app.use('/api', PSGChatRoutes);
app.use('/api', aftPriChatRoutes);
app.use('/api', aftSecChatRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
