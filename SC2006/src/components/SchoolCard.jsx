import { useNavigate } from "react-router-dom";
import DetailedCard from "./DetailedCard";
import { useState } from "react";
import axios from "axios";

const SchoolCard = ({ name, postal_code, location, onCompare }) => {
  const navigate = useNavigate();

  // Add fav school to database linked to user
  const favSchool = async(data)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/addToFav`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({data})
      });
      if (response.ok){
        console.log("Success YAYYYYY");
      }
      else{
        console.log("oh no :((((9")
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
      setShowExpanded(true); // Show DetailedCard after data load
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
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering
            fetchSchoolData()}} // Fetch school details on button click
          className="bg-blue text-white px-4 py-2 rounded-md"
        >
          See Details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering
            navigate("/school-dashboard", {
              state: { name, postal_code, location },
            });
          }}
          className="bg-[#EF5A6F] text-white px-4 py-2 rounded-md"
        >
          Add to Compare
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering
            navigate("/school-review", {
              state: { name },
            });
          }}
          className="bg-brown text-white px-4 py-2 rounded-md"
        >
          Review
        </button>
      </div>

      {/* Render DetailedCard only if showExpanded is true */}
      {showExpanded && (
        <DetailedCard
          name={name}
          ccas={ccas}
          programmes={distProgs}
          subjects={subjects}
          location={location}
          onClose={() => setShowExpanded(false)}
          loading={loading} // Pass loading to show loader if needed
        />
      )}
    </div>
  );
};

export default SchoolCard;
