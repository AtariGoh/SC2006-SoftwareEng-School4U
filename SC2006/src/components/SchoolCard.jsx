import { useNavigate } from "react-router-dom";
import DetailedCard from "./DetailedCard";
import { useState } from "react";
import axios from "axios";

const SchoolCard = ({ name, postal_code, location, onCompare }) => {
  const navigate = useNavigate();
  const [showExpanded, setShowExpanded] = useState(false);
  const [ccas, setCCAs] = useState([]);
  const [distProgs, setDistProg] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch school data based on the school name
  const fetchSchoolData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({ query: name });
      const response = await axios.get(
        `http://localhost:5000/api/schools?${queryParams.toString()}`
      );
      if (response.status === 200) {
        const { ccas, moeprog, subjects } = response.data;
        setCCAs(ccas || []);
        setDistProg(moeprog || []);
        setSubjects(subjects || []);
      } else {
        console.error("Failed to fetch school details.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setShowExpanded(true);
    }
  };

  const handleAddSchool = async (schData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/addToFav`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ data: schData }),
      });
      if (!response.ok) console.log("Failed to add school.");
    } catch (error) {
      console.error("Runtime error:", error);
    }
  };

  return (
    <div className="p-4 bg-[#FAEDCE] border border-black shadow-md rounded-md flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-700">Postal Code: {postal_code}</p>
        <p className="text-gray-700">Location: {location}</p>
      </div>

      <div className="space-x-2">
        {/* See Details Button */}
        <button
          onClick={fetchSchoolData}
          className="bg-[#536493] text-white px-4 py-2 rounded-md transition transform hover:bg-blue-600 hover:scale-105 active:scale-95"
        >
          See Details
        </button>

        {/* Add to Compare Button */}
        <button
          onClick={() => handleAddSchool(name)}
          className="bg-[#EF5A6F] text-white px-4 py-2 rounded-md transition transform hover:bg-red-600 hover:scale-105 active:scale-95"
        >
          Add to Compare
        </button>

        {/* Review Button (Green) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/review-schools", { state: { name } });
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md transition transform hover:bg-green-600 hover:scale-105 active:scale-95"
        >
          Review
        </button>
      </div>

      {showExpanded && (
        <DetailedCard
          name={name}
          ccas={ccas}
          programmes={distProgs}
          subjects={subjects}
          location={location}
          onClose={() => setShowExpanded(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SchoolCard;
