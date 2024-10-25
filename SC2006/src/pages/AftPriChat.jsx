import React, { useState, useEffect } from "react";
import {FaHeart, FaLink} from "react-icons/fa";
import psgImage from "../assets/psg-image.png";
import afterpri from "../assets/The-Transition-from-Primary-to-Secondary-School.png";
import aftsec from "../assets/after-secondary.png"


const AftPriChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);


  // Fetch messages when component loads
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/apchat");
        const contentType = response.headers.get("content-type");
       
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Expected JSON but got", contentType);
          const text = await response.text();
          console.error("Response text:", text);
        }


        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };
    fetchMessages();


    // Fetch messages every 2 seconds (2000 ms)
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);


    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        const response = await fetch("http://localhost:5000/api/apchat/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: newMessage }), // Send only the message for now
        });


        if (response.ok) {
          const result = await response.json();
          setMessages([...messages, ...result]); // Append new message to chat
          setNewMessage(""); // Clear input field
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };


  if (loading) {
    return <div>Loading chat messages...</div>;
  }




  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-brown p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search your chat"
            className="w-full p-3 rounded-full bg-gray-100 focus:outline-none border border-gray-300"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <img
                src={psgImage}
                alt="Group"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold">Parents Support Group</div>
                <div className="text-sm text-gray-500">Welcome to the...</div>
              </div>
            </div>
            <FaHeart className="text-red-500" />
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <img
                src={afterpri}
                alt="Group"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold">Journey After Primary School</div>
                <div className="text-sm text-gray-500">Welcome to the...?</div>
              </div>
            </div>
            <FaHeart className="text-yellow-500" />
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <img
                src={aftsec}
                alt="Group"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-semibold">Journey After Secondary School</div>
                <div className="text-sm text-gray-500">Welcome to the...?</div>
              </div>
            </div>
            <FaHeart className="text-yellow-500" />
          </div>
        </div>
      </div>


      {/* Main chat area */}
      <div className="w-3/4 bg-FFF1DB flex flex-col">
        {/* Chat header */}
        <div className="p-6 bg-blue border-b border-gray-300">
          <h2 className="text-2xl font-bold text-536493">Journey After Primary School</h2>
          <p className="text-500">389 members, 180 online</p>
        </div>


        {/* Chat messages */}
        <div className="p-6 flex-grow overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="bg-gray-200 p-2 rounded-lg">
                {msg.message}
              </div>
            </div>
          ))}
        </div>


        {/* Chat input */}
        <div className="justify-bottom bg-yellow  border-t border-gray-300  rounded-full flex items-center space-x-4">
          <FaLink className="text-dark" />
          <input
            type="text"
            placeholder="Type Your Message..."
            className="flex-grow px-4 py-2 border border-yellow bg-yellow rounded focus:outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="px-6 py-2 bg-blue text-white rounded-full hover:shadow-lg transition-shadow duration-300"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};


export default AftPriChat;
