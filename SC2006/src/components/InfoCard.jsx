import React from "react";
import { useNavigate } from "react-router-dom";

const labelClass = "m-4 text-white border-sky-800 p-2 rounded-2xl bg-sky-800 my-4";
const subLabel = "font-bold float-left my-3";
const ccaInfo = "mx-8";
const subjectsInfo = "list-decimal text-left";
const linkButton = "my-2 text-white border-blue-900 p-2 rounded-2xl hover:shadow-2xl transition-shadow duration-300"
// Reusable button component with props for title and content
const InfoCard = ({schoolData}) => {
  const navigate = useNavigate();
  return (
    <div className="mb-6">
      <div style={{width: '28rem'}} className="bg-[#FAEDCE] -mt-2 mb-5 p-6 border-2 border-black rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-4 text-center underline">{schoolData.name}</h2>
        <div className="flex flex-col items-center flex-grow">
          <img className="w-32 block" src={schoolData.logo} alt={schoolData.name} />
          {/* Label */}
          <div className={labelClass}>CCAs</div>
          <div className="flex flex-col">
            <h2 className={subLabel}>1. Sports and Physical Activities:</h2>
              <div className={ccaInfo}>{schoolData.sports.join(', ')}</div>
            <h2 className={subLabel}>2. Performing Arts:</h2>
              <div className={ccaInfo}> {schoolData.performingArts.join(', ')}</div>
            <h2 className={subLabel}>3. Clubs & Societies:</h2>
              <div className={ccaInfo}> {schoolData.clubsSociety.join(', ')}</div>
            <h2 className={subLabel}>4. Uniform Groups:</h2>
              <div className={ccaInfo}> {schoolData.uniform.join(', ')}</div>
          </div>
        
          <div className={labelClass}>Subjects</div>
          <div className="w-full text-left">
              <ol className={subjectsInfo}>
                {schoolData.subjects.map((subjects)=> (
                  <li className="my-2 mx-5" key={subjects}>{subjects}</li>
                ))}
              </ol>
          </div>
        </div>
        
      </div>
      <div className="flex flex-col items-center">
                  <button className={`${linkButton} bg-rose-500 w-60`} onClick={()=> navigate('/Register')}>Chat with the community</button>
                  <button className={`${linkButton} bg-yellow-800 bg-opacity-40 w-60`}>View Reviews</button>
      </div>
    </div>
  );
};

export default InfoCard;