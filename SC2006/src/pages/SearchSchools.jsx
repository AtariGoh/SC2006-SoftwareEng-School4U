const SearchSchools = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Search and Filter Schools</h2>
      <input
        type="text"
        placeholder="Search by school name or location"
        className="w-full p-2 mb-4 border rounded"
      />
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        Search
      </button>
      {/* Add search results and filter options here */}
    </div>
  );
};

export default SearchSchools;
