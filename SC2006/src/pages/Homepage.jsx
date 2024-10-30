import { Link } from "react-router-dom";
import ButtonCard from "../components/ButtonCard"; // Reusable card component

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4 md:px-8 lg:px-12 space-y-8 pt-28">
      <h1 className="text-4xl font-bold text-center">Hello!</h1>
      <p className="text-lg text-center">What do you want to do today?</p>

      {/* Button Container */}
      <div className="flex flex-wrap justify-evenly items-center gap-6">
        {/* Browse Schools Button */}
        <Link to="/search">
          <ButtonCard title="Browse School For Your Child">
            <img
              src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
              alt="School"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          </ButtonCard>
        </Link>

        {/* Compare Schools Button */}
        <Link to="/dashboard">
          <ButtonCard title="Compare Schools">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2946/2946577.png"
              alt="Comparison"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
          </ButtonCard>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
