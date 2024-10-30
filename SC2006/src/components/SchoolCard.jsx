import { useNavigate } from "react-router-dom";

const SchoolCard = ({ name, programme, location, onCompare }) => {
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
      console.log("Runtime error :( ")
    }
  }

  return (
    <div
      className="p-4 bg-[#FAEDCE] border border-black shadow-md rounded-md flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-700">Postal Code: {programme}</p>
        <p className="text-gray-700">Location: {location}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => { 
            favSchool(name);
          }}
          className="bg-[#EF5A6F] text-white px-4 py-2 rounded-md"
        >
          Add to compare
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from triggering
            navigate("/school-review", {
              state: { name, programme, location },
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default SchoolCard;
