import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const labelClass = "m-4 text-white border-sky-800 p-2 rounded-2xl bg-sky-800 my-4";
const subLabel = "font-bold float-left my-3";
const ccaInfo = "mx-8";
const subjectsInfo = "list-decimal text-left";
const linkButton = "my-2 text-white border-blue-900 p-2 rounded-2xl hover:shadow-2xl transition-shadow duration-300"
// Reusable button component with props for title and content
const InfoCard = ({schoolname}) => {
  const [ccas, setCCAs] = useState([]);
  const [distProgs, setDistProg] = useState([]);
  const [subjects, setSubjects] = useState([]);

useEffect(()=>{
  fetchSchoolData();
},[])

  const fetchSchoolData = async () => {

    try {
      const queryParams = new URLSearchParams({
        query: schoolname, // Assuming 'name' will be used to filter
      });

      // Fetch data from the server with the query parameter
      const response = await axios.get(
        `http://localhost:5000/api/schools?${queryParams.toString()}`
      );

      if (response.status === 200) {
        // Destructure and set the data from the response
        const { ccas, moeprog, subjects } = response.data;
        setCCAs(ccas || []);
        setDistProg(moeprog || []);
        setSubjects(subjects || []);
        console.log("ccas",ccas)
      } else {
        console.error("Failed to fetch school details.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };

  const navigate = useNavigate();
  return (
    <div className="mb-6">
      <div style={{width: '28rem'}} className="bg-[#FAEDCE] -mt-2 mb-5 p-6 border-2 border-black rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-4 text-center underline">{schoolname}</h2>
        <div className="flex flex-col items-center flex-grow">
          {/* Label */}
          <div className={labelClass}>CCAs</div>
          <div className="flex flex-col">
            <h2 className={subLabel}>1. Sports and Physical Activities:</h2>
              <div className={ccaInfo}>{ccas
    .filter((cca) => cca.category === "PHYSICAL SPORTS")
    .map((cca) => cca.cca_name)
    .join(", ")}</div>
            <h2 className={subLabel}>2. Performing Arts:</h2>
              <div className={ccaInfo}> {ccas
    .filter((cca) => cca.category === "VISUAL AND PERFORMING ARTS")
    .map((cca) => cca.cca_name)
    .join(", ")}</div>
            <h2 className={subLabel}>3. Clubs & Societies:</h2>
              <div className={ccaInfo}> {ccas
    .filter((cca) => cca.category === "CLUBS AND SOCIETIES")
    .map((cca) => cca.cca_name)
    .join(", ")}</div>
            <h2 className={subLabel}>4. Uniform Groups:</h2>
              <div className={ccaInfo}> {ccas
    .filter((cca) => cca.category === "UNIFORMED GROUPS")
    .map((cca) => cca.cca_name)
    .join(", ")}</div>
              <h2 className={subLabel}>5. Others:</h2>
              <div className={ccaInfo}> {ccas
    .filter((cca) => cca.category === "OTHERS")
    .map((cca) => cca.cca_name)
    .join(", ")}</div>
          </div>
        
          <div className={labelClass}>Subjects</div>
          <div className="w-full text-left">
              <ol className={subjectsInfo}>
                {subjects.map((subjects)=> (
                  <li className="my-2 mx-5" key={subjects}>{subjects.category}</li>
                ))}
              </ol>
          </div>
        </div>
        
      </div>
      <div className="flex flex-col items-center">
                  <button className={`${linkButton} bg-rose-500 w-60`} onClick={()=> navigate('/chat')}>Chat with the community</button>
                  <button className={`${linkButton} bg-yellow-800 bg-opacity-40 w-60`}>View Reviews</button>
      </div>
    </div>
  );
};

export default InfoCard;