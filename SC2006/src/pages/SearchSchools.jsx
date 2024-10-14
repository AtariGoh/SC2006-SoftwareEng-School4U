import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SchoolCard from "../components/SchoolCard"; // Import SchoolCard component

const SearchSchools = () => {
  const navigate = useNavigate();

  // State management
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter-related state
  const [filtersVisible, setFiltersVisible] = useState(false); // Toggle filters section
  const [level, setLevel] = useState("");
  const [programme, setProgramme] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  // Fetch data from backend on mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);

        // Replace this with your API endpoint
        const response = await fetch("https://your-api.com/schools");
        if (!response.ok) throw new Error("Failed to fetch schools.");

        const data = await response.json();
        setAllSchools(data);
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch schools.");
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Handle search logic with filters
  const handleSearch = () => {
    let filteredResults = allSchools;

    if (query) {
      filteredResults = filteredResults.filter((school) =>
        school.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (level) {
      filteredResults = filteredResults.filter(
        (school) => school.level === level
      );
    }

    if (programme) {
      filteredResults = filteredResults.filter((school) =>
        school.programme.toLowerCase().includes(programme.toLowerCase())
      );
    }

    if (location) {
      filteredResults = filteredResults.filter((school) =>
        school.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Sort results based on user selection
    if (sortBy === "name-asc") {
      filteredResults.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      filteredResults.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "ratings") {
      filteredResults.sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Descending order
    }

    setResults(filteredResults);
  };
  useEffect(() => {
    handleSearch(); // Trigger search whenever a filter or sorting changes
  }, [query, level, programme, location, sortBy]);

  const handleClear = () => {
    setQuery("");
    setLevel("");
    setProgramme("");
    setLocation("");
    setResults(allSchools); // Reset to all schools
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow p-8">
        {/* Secondary Navbar - Filters */}
        <div className="flex items-center space-x-4 bg-[#EF5A6F] p-4 rounded-md mb-4 text-black">
          <input
            type="text"
            placeholder="Search your school"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 border border-black rounded-md bg-[#FAEDCE]"
          />
          <button
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            {filtersVisible ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            Search
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-300 px-4 py-2 rounded-md shadow-md"
          >
            Clear
          </button>

          {/* Sorted by Dropdown aligned to the right */}
          <div className="ml-auto flex items-center space-x-2">
            <label className="text-black">Sorted by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded-md bg-[#FAEDCE]"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="ratings">Ratings</option>
            </select>
          </div>
        </div>

        {/* Toggleable Filters Section */}
        {filtersVisible && (
          <div className="flex flex-col space-y-4 mb-4 p-4 bg-[#EF5A6F] rounded-md">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Level (e.g., Primary, Secondary)"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="flex-1 p-2 border border-black rounded-md bg-[#FAEDCE] "
              />
              <input
                type="text"
                placeholder="Programme"
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
                className="flex-1 p-2 border border-black rounded-md bg-[#FAEDCE]"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 p-2 border border-black rounded-md bg-[#FAEDCE]"
              />
            </div>
          </div>
        )}

        {/* Loading and Error States */}
        {loading && <p className="text-center">Loading schools...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Display Search Results */}
        <div className="grid gap-4">
          {results.map((school) => (
            <SchoolCard
              key={school.id}
              name={school.name}
              programme={school.programme}
              location={school.location}
              onClick={() => navigate(`/school/${school.id}`)}
              onCompare={() => console.log(`Added ${school.name} to compare`)}
              onReview={() => console.log(`Reviewing ${school.name}`)}
            />
          ))}
        </div>

        {/* No Results Found */}
        {!loading && results.length === 0 && (
          <p className="text-center text-gray-500">No schools found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchSchools;
