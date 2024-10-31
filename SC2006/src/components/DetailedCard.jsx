import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import axios from "axios";

const DetailedCard = ({
  name,
  ccas = [],
  subjects = [],
  programmes = [],
  location,
  onClose,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState("CCAs");
  const [coordinates, setCoordinates] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch coordinates based on the address
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/get-coordinates",
          {
            address: location,
          }
        );
        setCoordinates(response.data);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
    if (location) fetchCoordinates();
  }, [location]);

  const renderContent = () => {
    if (loading) return <p>Loading data...</p>;

    switch (activeTab) {
      case "CCAs":
        const uniqueCCAs = Array.from(
          new Set(
            ccas
              .filter((cca) => cca.school_name === name)
              .map((c) => c.cca_name)
          )
        );
        return (
          <ul className="list-disc list-inside space-y-2">
            {uniqueCCAs.length > 0 ? (
              uniqueCCAs.map((cca, index) => <li key={index}>{cca}</li>)
            ) : (
              <li>No CCAs available for this school.</li>
            )}
          </ul>
        );

      case "Subjects":
        const uniqueSubjects = Array.from(
          new Set(
            subjects
              .filter((s) => s.school_name === name)
              .map((s) => s.category)
          )
        );
        return (
          <ul className="list-disc list-inside space-y-2">
            {uniqueSubjects.length > 0 ? (
              uniqueSubjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))
            ) : (
              <li>No subjects available for this school.</li>
            )}
          </ul>
        );

      case "Programmes":
        const uniqueProgrammes = Array.from(
          new Set(
            programmes
              .filter((p) => p.school_name === name)
              .map((p) => p.category)
          )
        );
        return (
          <ul className="list-disc list-inside space-y-2">
            {uniqueProgrammes.length > 0 ? (
              uniqueProgrammes.map((programme, index) => (
                <li key={index}>{programme}</li>
              ))
            ) : (
              <li>No programmes available for this school.</li>
            )}
          </ul>
        );

      case "Locations":
        if (!coordinates) return <p>Location information not available.</p>;
        return (
          <div className="w-full h-80">
            <Map zoom={15} center={coordinates} mapId={"d9da54f2adc837f7"}>
              <AdvancedMarker
                position={coordinates}
                onClick={() => setOpen(true)}
              ></AdvancedMarker>
              {open && (
                <InfoWindow
                  position={coordinates}
                  onCloseClick={() => setOpen(false)}
                >
                  <div>
                    <p>
                      <strong>School Name:</strong> {name}
                    </p>
                    <p>
                      <strong>Address:</strong> {location}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#FAEDCE] w-[90%] max-w-lg p-6 rounded-lg shadow-lg mx-4 my-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl hover:text-black transition"
        >
          ✖
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-4">{name}</h2>

        {/* Tabs */}
        <div className="flex justify-between mb-4 border-b pb-2">
          {["CCAs", "Subjects", "Programmes", "Locations"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 font-semibold rounded-t-md transition-transform transform hover:scale-105 hover:bg-[#EF5A6F] active:scale-95 ${
                activeTab === tab
                  ? "bg-[#EF5A6F] text-white"
                  : "bg-[#BF9D8C] text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="text-gray-700">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DetailedCard;
