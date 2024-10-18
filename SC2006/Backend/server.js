const port = 5173;
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/userLoginSignUp');

// Use routes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
=======
const chatRoutes = require("./routes/chatRoutes");
const PSGChatRoutes = require("./routes/PSGChatRoute");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/psgchat', PSGChatRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
>>>>>>> 985ff9e ({)
