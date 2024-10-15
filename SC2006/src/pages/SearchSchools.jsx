import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SchoolCard from "../components/SchoolCard"; // Import SchoolCard component

const SearchSchools = () => {
  const navigate = useNavigate();

  // State management
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // Schools shown on the page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination and infinite scroll state
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Whether more data exists
  const observer = useRef(); // Observer reference

  // Filter-related state
  const [filtersVisible, setFiltersVisible] = useState(false); // Toggle filters section
  const [level, setLevel] = useState("");
  const [programme, setProgramme] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  const SCHOOLS_PER_PAGE = 10; // Number of schools per page

  // Fetch schools with pagination from backend
  const fetchSchools = async (reset = false) => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        query,
        level,
        programme,
        location,
        sortBy,
        page,
        limit: SCHOOLS_PER_PAGE,
      });

      const response = await fetch(
        `https://your-api.com/schools?${queryParams.toString()}`
      );

      if (!response.ok) throw new Error("Failed to fetch schools.");

      const data = await response.json();

      setResults((prevResults) =>
        reset ? data.schools || [] : [...prevResults, ...(data.schools || [])]
      );
      setHasMore((data.schools || []).length === SCHOOLS_PER_PAGE);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch schools.");
    } finally {
      setLoading(false);
    }
  };

  // Load schools on initial mount and whenever filters or query change
  useEffect(() => {
    setPage(1); // Reset to first page

    // Trigger a fetch only after resetting the page to 1
    const timeoutId = setTimeout(() => fetchSchools(true), 0);

    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [query, level, programme, location, sortBy]);

  // Fetch more schools when the page number changes
  useEffect(() => {
    if (page > 1) fetchSchools();
  }, [page]);

  // IntersectionObserver to detect when the bottom is reached
  const lastSchoolRef = useCallback(
    (node) => {
      if (loading) return; // Avoid attaching observer while loading

      if (observer.current) observer.current.disconnect(); // Cleanup previous observer

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increment page number
        }
      });

      if (node) observer.current.observe(node); // Attach observer to new node
    },
    [loading, hasMore] // Dependencies to recreate the observer
  );

  const handleClear = () => {
    setQuery("");
    setLevel("");
    setProgramme("");
    setLocation("");
    setSortBy("name-asc"); // Reset to default sort

    // Optionally, trigger a fetch manually after resetting filters if needed
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
            onClick={() => fetchSchools(true)}
            disabled={loading}
            className={`bg-green-500 text-white px-4 py-2 rounded-md shadow-md ${
              loading ? "opacity-50" : ""
            }`}
          >
            {loading ? "Searching..." : "Search"}
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
                className="flex-1 p-2 border border-black rounded-md bg-[#FAEDCE]"
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
          {results.map((school, index) => (
            <div
              ref={index === results.length - 1 ? lastSchoolRef : null}
              key={school.id}
            >
              <SchoolCard
                name={school.name}
                programme={school.programme}
                location={school.location}
                onClick={() => !loading && navigate(`/school/${school.id}`)}
                onCompare={() => console.log(`Added ${school.name} to compare`)}
                onReview={() => console.log(`Reviewing ${school.name}`)}
              />
            </div>
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
