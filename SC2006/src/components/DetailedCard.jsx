import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker,Pin, InfoWindow } from "@vis.gl/react-google-maps";
import axios from "axios";
import marker from "../assets/marker.png";


const DetailedCard = ({ name, ccas = [], subjects = [], programmes = [], location, onClose, loading }) => {
  const [activeTab, setActiveTab] = useState("CCAs");
  const [coordinates, setCoordinates] = useState(null);
  const [open, setOpen] = useState(false);
  
  /*
  console.log("Name:", name);
  console.log("CCAs:", ccas);
  console.log("Subjects:", subjects);
  console.log("DistProgs:", programmes);
  console.log("Location:", location);
  console.log("Loading:", loading);
*/

  // Fetch coordinates based on the address
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/get-coordinates", {
          address: location,
        });
        setCoordinates(response.data);

        console.log("Location coordinates:", response.data);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (location) fetchCoordinates();
  }, [location]);

  const renderContent = () => {
    if (loading) return <p>Loading data...</p>; // Show loading message if loading

    switch (activeTab) {
        case "CCAs":
            console.log("query sch name for CCAs", name);
        
            let filteredCCAs = [];
            let uniqueCCAsSet = new Set(); // Create a Set to track unique CCAs
        
            for (let i = 0; i < ccas.length; i++) {
                if (ccas[i].school_name === name) {
                    if (!uniqueCCAsSet.has(ccas[i].cca_name)) {
                        uniqueCCAsSet.add(ccas[i].cca_name);
                        filteredCCAs.push(ccas[i]);
                    }
                }
            }
        
            console.log("Unique CCAs collected:", Array.from(uniqueCCAsSet));
        
            return (
                <ul className="list-disc list-inside">
                    {uniqueCCAsSet.size > 0 ? (
                        Array.from(uniqueCCAsSet).map((uniqueCCA, index) => (
                            <li key={index}>{uniqueCCA}</li>
                        ))
                    ) : (
                        <li>No CCAs available for this school.</li>
                    )}
                </ul>
            );

        case "Subjects":
            console.log("query sch name", name);
            console.log(subjects)
            let filteredSubjects = [];
            let uniqueSubjectsSet = new Set(); // Create a Set to track unique subjects

            // For loop to filter subjects
            for (let i = 0; i < subjects.length; i++) {
                if (subjects[i].school_name === name) {
                    // Add only unique subject descriptions
                    if (!uniqueSubjectsSet.has(subjects[i].catogory)) {
                        uniqueSubjectsSet.add(subjects[i].category);
                        filteredSubjects.push(subjects[i]);
                    }
                }
            }

            console.log("pls work", uniqueSubjectsSet);

            return (
                <ul className="list-disc list-inside">
                    {uniqueSubjectsSet.size > 0 ? ( // Use size property to check for unique subjects
                        Array.from(uniqueSubjectsSet).map((uniqueSubject, index) => ( // Convert Set to Array for mapping
                            <li key={index}>{uniqueSubject}</li> // You can use index or unique identifier if available
                        ))
                    ) : (
                        <li>No subjects available for this school.</li>
                    )}
                </ul>
            );
            
      case "Programmes":
        console.log("programmes", programmes);
        
        let filteredProgrammes = [];
        let uniqueProgrammes = new Set();

        // For loop to filter subjects
        for (let i = 0; i < programmes.length; i++) {
          if (programmes[i].school_name === name) {
              // Add only unique subject descriptions
              if (!uniqueProgrammes.has(programmes[i].catogory)) {
                  uniqueProgrammes.add(subjects[i].category);
                  filteredProgrammes.push(subjects[i]);
              }
          }
      }

      console.log("pls work", uniqueProgrammes);

      return (
          <ul className="list-disc list-inside">
              {uniqueProgrammes.size > 0 ? ( // Use size property to check for unique subjects
                  Array.from(uniqueProgrammes).map((uniqueProgramme, index) => ( // Convert Set to Array for mapping
                      <li key={index}>{uniqueProgramme}</li> // You can use index or unique identifier if available
                  ))
              ) : (
                  <li>No programmes available for this school.</li>
              )}
          </ul>
      );

      case "Locations":
        if (!coordinates) return <p>Location information not available.</p>;
        
        return (
              <div className="w-[100%] h-[500px]">
                <Map zoom={15} center={coordinates} mapId={'d9da54f2adc837f7'}>
                  <AdvancedMarker position={coordinates} onClick={() => setOpen(true)}></AdvancedMarker>
                  {open && (<InfoWindow position={coordinates} onCloseClick={()=>setOpen(false)}><p>School Name:</p> <em>{name}</em> <p>Address:</p> <em>{location}</em></InfoWindow>)}
                </Map>
              </div>
          );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#FAEDCE] p-6 w-96 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">{name}</h2>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          {["CCAs", "Subjects", "Programmes", "Locations"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab ? "bg-[#EF5A6F] text-white" : "bg-[#BF9D8C] text-gray-800"
              } font-semibold rounded-t-md`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="text-gray-700">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DetailedCard;
