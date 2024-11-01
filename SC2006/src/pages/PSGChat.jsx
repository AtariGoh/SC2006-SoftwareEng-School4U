import React, { useState, useEffect } from "react";
import { FaLink, FaArrowUp, FaArrowDown } from "react-icons/fa";
import psgImage from "../assets/psg-image.png";
import axios from 'axios';

const PSGChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolSearch, setSchoolSearch] = useState(""); // Combined search
  const [selectedSchool, setSelectedSchool] = useState();
  const [schoolList, setSchoolList] = useState([]); // Ensure it starts as an array
  const [error, setError] = useState(null);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch school data based on the search query
  const fetchSchoolData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/schools?query=${schoolSearch}`);
      console.log("school searched:", schoolSearch);

      if (response.status === 200) {
        console.log("Fetched schools:", response.data.schools);
        setSchoolList(response.data.schools);

        console.log("data:",schoolList);

      } else {
        throw new Error("Failed to fetch schools.");
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
      setError("Could not fetch schools.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolData(); // Fetch on schoolSearch change
  }, [schoolSearch]);

  // Update search results based on current search term
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

  // Fetch messages for the selected school
  useEffect(() => {
    // Only refresh if no search term is active
    if (selectedSchool && !searchTerm) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/psgchat/${selectedSchool}`);
          const data = await response.json();
          setMessages(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching messages:", error);
          setLoading(false);
        }
      };
  
      fetchMessages(); // Initial fetch
      const intervalId = setInterval(fetchMessages, 2000); // Set up interval if no search term
      return () => clearInterval(intervalId); // Cleanup interval on component unmount or dependency change
    }
  }, [selectedSchool, searchTerm]);
  

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await fetch("http://localhost:5000/api/psgchat/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: newMessage, school_id: selectedSchool }),
        });

        if (response.ok) {
          const result = await response.json();
          setMessages((prevMessages) => [...prevMessages, result]);
          setNewMessage("");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Handle search navigation
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r border-gray-300">
        <h3 className="text-lg font-bold mb-4">Select School</h3>
        <input
          type="text"
          placeholder="Search your school"
          className="w-full p-2 mb-4 bg-yellow border border-black rounded-full"
          value={schoolSearch}
          onChange={(e) => setSchoolSearch(e.target.value)} // Update search term
        />
        <div className="overflow-auto h-64">
          {Array.isArray(schoolList) && schoolList.map((school) => ( // Ensure schoolList is an array
            <button
              name={school.school_name}
              key={school.postal_code}
              onClick={() => setSelectedSchool(school.postal_code)}
              className={`block w-full text-left p-2 rounded-lg mb-2 ${
                selectedSchool === school.school_id ? "bg-blue text-white" : "bg-gray-200"
              }`}
            >
              {school.school_name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="flex flex-col flex-grow h-full bg-FFF1DB">
        <div className="p-4 bg-brown flex justify-between items-center border-b border-gray-300">
          <div className="flex items-center">
            <img src={psgImage} alt="Group" className="w-12 h-12 rounded-full mr-3" />
            <h2 className="text-2xl font-bold text-536493">Parents Support Group</h2>
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

export default PSGChat;
