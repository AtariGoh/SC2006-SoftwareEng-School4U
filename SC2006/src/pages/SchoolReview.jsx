import { useState } from "react";
import { useLocation } from "react-router-dom";

const SchoolReview = () => {
  const { state } = useLocation(); // Retrieve passed data via state
  const { name, programme, location } = state || {}; // Destructure school details

  const [ratings, setRatings] = useState({
    facilities: 0,
    accessibility: 0,
    useful: 0,
  });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle star rating clicks
  const handleRating = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  // Clear rating for a specific category
  const clearRating = (category) => {
    setRatings({ ...ratings, [category]: 0 });
  };

  // Star component with animation
  const Star = ({ filled, onClick }) => (
    <span
      onClick={onClick}
      className={`cursor-pointer text-3xl transition transform ${
        filled ? "text-yellow-500 scale-110" : "text-gray-400"
      } hover:scale-125 hover:text-yellow-300`}
    >
      ★
    </span>
  );

  // Render stars with a styled clear button
  const renderStars = (category) => (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            filled={value <= ratings[category]}
            onClick={() => handleRating(category, value)}
          />
        ))}
      </div>
      <button
        onClick={() => clearRating(category)}
        className="bg-[#EF5A6F] text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
      >
        Clear
      </button>
    </div>
  );

  const submitReview = async () => {
    setLoading(true);
    setError(null);

    const reviewData = {
      facilities: ratings.facilities,
      accessibility: ratings.accessibility,
      useful: ratings.useful,
      comment,
    };

    try {
      const response = await fetch("https://your-api.com/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review. Please try again.");
      }

      alert("Thank you for your feedback!");
      setRatings({ facilities: 0, accessibility: 0, useful: 0 });
      setComment("");
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white pb-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        {/* School Header Section */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://via.placeholder.com/100" // Placeholder for school emblem
            alt="School Emblem"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-4xl font-bold">{name}</h1>
            <p className="text-gray-700">{programme}</p>
            <p className="text-gray-500">{location}</p>
          </div>
        </div>

        {/* Ratings Section */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-lg font-medium">Facilities:</label>
            {renderStars("facilities")}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium">Accessibility:</label>
            {renderStars("accessibility")}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium">Useful:</label>
            {renderStars("useful")}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Other comments:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your thoughts here..."
            className="w-full p-3 border rounded-md bg-[#FAEDCE] focus:outline-none focus:ring-2 focus:ring-[#EF5A6F]"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          onClick={submitReview}
          disabled={loading}
          className={`w-full py-2 rounded-md text-lg font-bold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#EF5A6F] text-white hover:bg-red-500"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default SchoolReview;
