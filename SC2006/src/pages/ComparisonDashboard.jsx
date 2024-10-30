import { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import InfoCard from '../components/InfoCard';
import NameCard from '../components/NameCard';
import { useAuth } from '../context/AuthContext.jsx';


const ComparisonDashboard = () => {
  const navigate = useNavigate();
  //const { loggedIn, setLoggedIn } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dropdownRef = useRef(null);


{/*Dummy Schools*/}
  const [allSchools, setAllSchools] = useState([
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
]);

{/*Save selected school for page reloading*/}
const [selectedSchools, setSelectedSchools] = useState(() => {
  const savedState = localStorage.getItem('selectedSchools');
  return savedState !==null ? JSON.parse(savedState) : [];
})

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


useEffect(() => {
  localStorage.setItem('selectedSchools', JSON.stringify(selectedSchools));
}, [selectedSchools]);

{/*Add and remove schools */}
const handleRemoveSchool = (schoolName) => {
  setSelectedSchools((prevSchools) =>
    prevSchools.filter((school) => school.name !== schoolName)
  );
};

const handleAddSchool = (school) => {
  if (
    selectedSchools.length < 3 &&
    !selectedSchools.some((s) => s.name === school.name)
  ) {
    setSelectedSchools([...selectedSchools, school]);
  }
};


{/*!loggedIn ? <div className="flex justify-center items-center h-[75vh]">Please Login first</div> :*/}
return ( 
    <div className="-mt-3 min-h-screen bg-gray-100 p-0">
      {/* navigation bar*/}
      <div className="flex justify-between p-2 left-0 bg-[#EF5A6F] shadow-md z-40">
        <div className="contentLeft">
          <div className="p-2 nameBar flex flex-grow border-r bg-[#FAEDCE] h-10 ml-7 mt-3 rounded-xl justify-between">
            {selectedSchools.length > 0 ? null : (<p className="mx-5 opacity-50 mr-40">View your list</p>)}
            {Array.from({ length: selectedSchools.length }).map((_, i) => (
              <NameCard key={i} schoolData={selectedSchools[i]} onRemove={handleRemoveSchool} />
            ))}
            {selectedSchools.length < 3 ?(
            <div className="flex justify-center items-center h-full px-2">
              <button className="bg-[#536493] text-white h-10 rounded-xl p-1 px-3 -mr-5" onClick={()=>{navigate("/search")}}>Add School</button>
            </div>
            ) : null}
          </div>                         
          <p className="text-base mx-9 my-1 float-left "> Displaying {selectedSchools.length} {selectedSchools.length>1 ? "schools" : "school"}.</p> 
        </div>
        <div className="testButton">
        <div className="relative">
<button
  onClick={toggleDropdown}
  className="rounded-lg border-black border-2 mx-5 px-3 hover:opacity-50 mt-4 bg-[#FAEDCE]"
>
  View your favourited schools
</button>

  {isDropdownOpen && (
    <div
      ref={dropdownRef}
      className="absolute bg-white border mt-2 rounded shadow-lg max-h-60 overflow-y-auto"
      style={{ width: '200px' }} // Adjust width as needed
    >
      <ul>
        {allSchools.map((school) => (
          <li
            key={school.name}
            className="flex justify-between items-center p-2 hover:bg-gray-100"
          >
            <span>{school.name}</span>
            {selectedSchools.some((s) => s.name === school.name) ? (
              <button
                onClick={() => handleRemoveSchool(school.name)}
                className="text-red-500"
              >
                -
              </button>
            ) : (
              <button
                onClick={() => handleAddSchool(school)}
                className="text-green-500"
              >
                +
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

     </div>
      </div> 
      
      <div className="Container ">
         {/* Add comparison tables/cards here */}
        {selectedSchools.length > 0 ? 
        (<div className="flex flex-wrap items-start justify-center mt-12 space-x-8">
          {Array.from({ length: selectedSchools.length }).map((_, i) => (
          <InfoCard key={i} schoolData={selectedSchools[i]}/>
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