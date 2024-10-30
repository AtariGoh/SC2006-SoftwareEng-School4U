import React, { useState, useEffect } from "react";
import { FaLink, FaArrowUp, FaArrowDown } from "react-icons/fa";
import apImage from "../assets/The-Transition-from-Primary-to-Secondary-School.png";

import { useLocation } from 'react-router-dom';

const AftPriChat = () => {
  const schools = [
    { school_id: 1, name: 'Greenwood High School' },
    { school_id: 2, name: 'Sunnydale Academy' },
    { school_id: 3, name: 'Riverside School' },
    { school_id: 4, name: 'Maple Leaf International School' },
    { school_id: 5, name: 'Crescent Valley High' },
    { school_id: 6, name: 'Oakwood Preparatory School' },
    { school_id: 7, name: 'Hilltop Primary School' },
    { school_id: 8, name: 'Pine Crest School' },
    { school_id: 9, name: 'Lakeside Secondary School' },
    { school_id: 10, name: 'Silver Oaks School' },

  ];

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState(schools[0].school_id);



  useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/apchat/${selectedSchool}`);
          const data = await response.json();
          setMessages(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching messages:", error);
          setLoading(false);
        };
      

      // Initial fetch and setting interval for updates
      fetchMessages();
      const intervalId = setInterval(fetchMessages, 2000);
      return () => clearInterval(intervalId);

    }

  }, [selectedSchool]);

  useEffect(() => {
    if (searchTerm) {
      const results = messages
        .map((msg, index) => ({ ...msg, index }))

        .filter((msg) => msg.message && msg.message.toLowerCase().includes(searchTerm.toLowerCase()));

      setSearchResults(results);
      setCurrentSearchIndex(0);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {

        const response = await fetch("http://localhost:5000/api/apchat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: newMessage, school_id: selectedSchool }),
        });


        if (response.ok) {
          const result = await response.json();
          setMessages([...messages, result]);
          setNewMessage("");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleSearchNavigation = (direction) => {
    let newIndex = currentSearchIndex;
    if (direction === "up" && currentSearchIndex > 0) newIndex--;

    else if (direction === "down" && currentSearchIndex < searchResults.length - 1) newIndex++;
    
    if (newIndex !== currentSearchIndex) {
      setCurrentSearchIndex(newIndex);
      document.getElementById(`message-${searchResults[newIndex].index}`)

        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  return (
    <div className="flex h-screen pt-14">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
        <h3 className="text-lg font-bold mb-4">Select School</h3>
        <input
          type="text"
          placeholder="Search your school"
          className="w-full p-2 mb-4 bg-yellow border border-black rounded-full"
          value={schoolSearch}
          onChange={(e) => setSchoolSearch(e.target.value)}
        />

        <div className="overflow-auto h-64">
=======

          {filteredSchools.map((school) => (
            <button
              key={school.school_id}
              onClick={() => setSelectedSchool(school.school_id)}
              className={`block w-full text-left p-2 rounded-lg mb-2 ${

                selectedSchool === school.school_id ? "bg-blue text-white" : "bg-gray-200"
=======

              }`}
            >
              {school.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="flex flex-col flex-grow h-full bg-FFF1DB">
        <div className="p-4 bg-brown flex justify-between items-center border-b border-gray-300">
          <div className="flex items-center">

            <img src={apImage} alt="Group" className="w-12 h-12 rounded-full mr-3" />
            <h2 className="text-2xl font-bold text-536493">Journey After Primary School</h2>
=======

          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search messages"
              className="w-50 p-2 bg-yellow border border-black rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="flex space-x-2">
                <button
                  className="p-2 bg-gray-200 rounded-full"
                  onClick={() => handleSearchNavigation("up")}
                  disabled={currentSearchIndex === 0}
                >
                  <FaArrowUp />
                </button>
                <button
                  className="p-2 bg-gray-200 rounded-full"
                  onClick={() => handleSearchNavigation("down")}
                  disabled={currentSearchIndex === searchResults.length - 1}
                >
                  <FaArrowDown />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 flex-grow overflow-auto">
          {loading ? (
            <div>Loading chat messages...</div>
          ) : (
            messages.map((msg, index) => {

              const isHighlighted = searchResults.some((result) => result.index === index);
              const isCurrentResult = searchResults[currentSearchIndex]?.index === index;
=======


              return (
                <div
                  key={index}
                  id={`message-${index}`}
                  className={`mb-4 p-2 rounded-lg ${
                    isHighlighted ? "bg-yellow-200" : "bg-gray-200"
                  } ${isCurrentResult ? "border-2 border-blue" : ""}`}
                >
                  {msg.message}
                </div>
              );
            })
          )}
        </div>

        <div className="bg-yellow border-t border-gray-300 p-4 flex items-center space-x-4">
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
