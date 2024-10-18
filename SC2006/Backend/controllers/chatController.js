// backend/controllers/chatController.js
const chatRoomModel = require('../models/chatRoomModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = ''

// Fetch all chat rooms
exports.getAllChats = async (req, res) => {
  try {
    const chats = await chatRoomModel.getAllChats();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a user to a chat room
exports.joinChat = async (req, res) => {
  const { userId, chatRoomId } = req.body;
  try {
    await chatRoomModel.joinChatRoom(userId, chatRoomId);
    res.status(201).json({ message: "Successfully joined the chat room!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyParent = async (req, res) => {
  const{userId, schoolId}=req.body;
  try{
    const isVerified = await chatRoomModel.verifyParent(userId, schoolId);
    res.status(200).json({message: 'Verified parent', verified: true});
  }catch (error){
    res.status(403).json({message: error.message, verified:false});
  }
};

/*
exports.verifyParentAccess = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer token format
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    if (decoded.isParent) {
      return res.status(200).json({ message: 'Authenticated', verified: true });
    } else {
      return res.status(403).json({ message: 'Not authorized' });
    }
  });
};
*/

const fetchAllMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

const createNewMessage = async (req, res) => {
  const { sender, message } = req.body;

  if (!sender || !message) {
    return res.status(400).json({ message: 'Sender and message are required' });
  }

  try {
    const newMessage = await postNewMessage(sender, message);
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

module.exports = {
  fetchAllMessages,
  createNewMessage,
};