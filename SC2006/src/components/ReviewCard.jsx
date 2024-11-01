import { useState, useEffect } from "react";
import axios from "axios";

const ReviewCard = ({ name, onClose }) => {
  const [responds, setResponds] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [name]);

  const fetchReviews = async () => {
    try {
      console.log(name);
      const response = await axios.get(`http://localhost:5000/api/getReview`, {
        params: { name },
        withCredentials: true,
      });
      setResponds(response.data);
      console.log("Reviews:", response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#FAEDCE] p-6 w-[400px] rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">{name}</h2>

        {/* Scrollable Reviews Section */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {responds.length > 0 ? (
            responds.map((review, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <p className="text-lg font-semibold">Review {index + 1}</p>
                <p>Facilities Rating: {review.rating_f}</p>
                <p>Accessibility Rating: {review.rating_a}</p>
                <p>Teaching Quality Rating: {review.rating_t}</p>
                <p className="italic">Comment: {review.review}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
