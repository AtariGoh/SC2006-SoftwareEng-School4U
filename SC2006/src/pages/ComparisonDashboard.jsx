import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../components/InfoCard';
import NameCard from '../components/NameCard';


const ComparisonDashboard = () => {
  const navigate = useNavigate();

  const [schoolNum, setSchoolNum] = useState(() => {
    const savedState = localStorage.getItem('schoolNum');
      return savedState !== null ? Number(savedState) : 0;
  });

  useEffect(()=>{
    localStorage.setItem('schoolNum', schoolNum);
  }, [schoolNum]);

  const schoolData = [
  {
    name: 'Shuqun Primary School',
    logo: 'https://png.pngtree.com/png-vector/20230609/ourlarge/pngtree-school-logo-design-template-vector-png-image_7125354.png',
    sports: ['Badminton', 'Soccer', 'Track & Field', 'Taekwondo'],
    performingArts: ['Choir', 'Dance', 'Drama Club'],
    clubsSociety: ['Robotics', 'Art and Craft', 'Green Club' ],
    uniform: ['Scouts',],
    subjects: ['English', 'Math', 'Science', 'Chinese', 'Music'],
  },
  {
    name: 'Jurong West Primary School',
    logo: 'https://png.pngtree.com/png-vector/20230311/ourlarge/pngtree-education-and-school-logo-design-template-vector-png-image_6644811.png',
    sports: ['Badminton', 'Soccer', 'Track & Field', 'Taekwondo'],
    performingArts: ['Choir', 'Chinese Dance','Dance', 'Drama Club', 'IT Club'],
    clubsSociety: ['Robotics', 'Art and Craft', 'Green Club' ],
    uniform: ['Scouts','NCC', 'NPCC'],
    subjects: ['English', 'Math', 'Science', 'Chinese', 'Music', 'Physical Education', 'Social Studies'],
  },
  {
    name: 'Corporation Primary School',
    logo: 'https://png.pngtree.com/png-vector/20230408/ourlarge/pngtree-school-logo-design-template-vector-png-image_6681515.png',
    sports: ['Badminton', 'Soccer', 'Track & Field', 'Taekwondo'],
    performingArts: ['Choir', 'Dance', 'Drama Club'],
    clubsSociety: ['Robotics', 'Art and Craft', 'Green Club' ],
    uniform: ['Scouts',],
    subjects: ['English', 'Math', 'Science', 'Chinese', 'Music', 'Character and Citizenship Education (CEE)'],
  },


];

const handleRemoveSchool = () => {
  setSchoolData(prevSchools => prevSchools.filter(school => school.name !== schoolName));
  setSchoolNum(prevNum => Math.max(prevNum - 1, 0)); // Decrease schoolNum, ensuring it doesn't go below 0
};
  
return (
    <div className="-mt-3 min-h-screen bg-gray-100 p-0">
      {/* navigation bar*/}
      <div className="flex justify-between p-3 left-0 bg-[#b3c1fe] shadow-md z-40">
        <div className="contentLeft">
          <div className="p-2 nameBar flex flex-grow border-r bg-[#FAEDCE] h-10 ml-7 mt-3 rounded-xl justify-between">
            {schoolNum > 0 ? null : (<p className="mx-5 opacity-50 mr-40">View your list</p>)}
            {Array.from({ length: schoolNum }).map((_, i) => (
              <NameCard key={i} schoolData={schoolData[i]} onRemove={handleRemoveSchool} />
            ))}
            {schoolNum<3 ?(
            <div className="flex justify-center items-center h-full px-2">
              <button className="bg-[#536493] text-white h-10 rounded-xl p-1 px-3 -mr-5" onClick={()=>{navigate("/search")}}>Add School</button>
            </div>
            ) : null}
          </div>                         
          <p className="text-base mx-9 my-1 float-left "> Displaying {schoolNum} {schoolNum>1 ? "schools" : "school"}.</p> 
        </div>
        <div className="testButton">
          <button className="border border-black w-10" onClick={() => schoolNum<3 ? setSchoolNum(schoolNum + 1) : null}>+</button>
          <button className="border border-black w-10" onClick={() => schoolNum>0 ? setSchoolNum(schoolNum - 1) : null}>-</button>
        </div>
      </div> 
      
      <div className="Container ">
         {/* Add comparison tables/cards here */}
        {schoolNum > 0 ? 
        (<div className="flex flex-wrap items-start justify-center mt-12 space-x-8">
          {Array.from({ length: schoolNum }).map((_, i) => (
          <InfoCard key={i} schoolData={schoolData[i]}/>
        ))}
        </div>) : (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-center">No Schools in Comparison Dashboard</p>
          </div>

        )}
      </div>  
    </div>
  );
};

export default ComparisonDashboard;