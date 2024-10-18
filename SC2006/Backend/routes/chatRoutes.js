// backend/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/chat", chatController.getAllChats); // Route to fetch all chat rooms
router.post("/chat/join", chatController.joinChat); // Route to join a chat room
router.post("/chat/verify-parent", chatController.verifyParent); //Route to verify a parent


module.exports = router;
