import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewCard from './ReviewCard';

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
  const [showExpanded, setShowExpanded] = useState(false);

useEffect(()=>{
  fetchSchoolData();
},[])

const handleClose = () => {
  setShowExpanded(false);
};

const fetchSchoolData = async () => {
  try {
    const queryParams = new URLSearchParams({
      query: schoolname,
    });

    const response = await axios.get(
      `http://localhost:5000/api/schools?${queryParams.toString()}`
    );

    if (response.status === 200) {
      const { ccas, moeprog, subjects } = response.data;

      // Filter unique CCAs by cca_name
      const uniqueCCAsSet = new Set();
      const filteredCCAs = ccas.filter((cca) => {
        if (!uniqueCCAsSet.has(cca.cca_name)) {
          uniqueCCAsSet.add(cca.cca_name);
          return true;
        }
        return false;
      });

      // Filter unique Moe Programs by program name (assuming moeprog[i].program_name)
      const uniqueProgsSet = new Set();
      const filteredProgs = moeprog.filter((prog) => {
        if (!uniqueProgsSet.has(prog.program_name)) {
          uniqueProgsSet.add(prog.program_name);
          return true;
        }
        return false;
      });

      // Filter unique Subjects by subject category or name (assuming subjects[i].category or subjects[i].name)
      const uniqueSubjectsSet = new Set();
      const filteredSubjects = subjects.filter((subject) => {
        const subjectKey = subject.category || subject.name; // Adjust based on the actual field in `subjects`
        if (!uniqueSubjectsSet.has(subjectKey)) {
          uniqueSubjectsSet.add(subjectKey);
          return true;
        }
        return false;
      });

      // Set state with unique values
      setCCAs(filteredCCAs);
      setDistProg(filteredProgs);
      setSubjects(filteredSubjects);

      console.log("Filtered CCAs", filteredCCAs);
      console.log("Filtered Programs", filteredProgs);
      console.log("Filtered Subjects", filteredSubjects);
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
  {subjects.map((subject, index) => (
    <li className="my-2 mx-5" key={subject.category || index}>{subject.category}</li>
  ))}
</ol>

          </div>
        </div>
        
      </div>
      <div className="flex flex-col items-center">
                  <button className={`${linkButton} bg-rose-500 w-60`} onClick={()=> navigate('/chat')}>Chat with the community</button>
                  <button
  className={`${linkButton} bg-green-800 w-60`}
  onClick={() => setShowExpanded(true)} // Use an arrow function here
>
  View Reviews
</button>

      </div>
      <div>
      {showExpanded && (
          <ReviewCard
            name={schoolname}
            onClose={handleClose}
          />
      )}
      </div>
    </div>
  );
};

export default InfoCard;