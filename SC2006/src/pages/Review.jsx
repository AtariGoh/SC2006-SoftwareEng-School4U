import { useState, useEffect } from "react";

const Review = () => {
  const [ratings, setRatings] = useState({
    features: 0,
    accessibility: 0,
    useful: 0,
  });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false); // 控制是否已提交

  // 使用 useEffect 在页面加载时执行某些代码（如果需要）
  useEffect(() => {
    console.log("Component loaded");
  }, []); // 空数组表示只在组件首次加载时执行

  // 处理评分点击事件
  const handleRating = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  // 清除评分
  const clearRating = (category) => {
    setRatings({ ...ratings, [category]: 0 });
  };

  // 提交评论到后端
  const submitReview = async () => {
    setLoading(true);
    setError(null);

    const reviewData = {
      features: ratings.features,
      accessibility: ratings.accessibility,
      useful: ratings.useful,
      comment,
    };

    try {
      // 将 fetch 请求发送到后端 API
      const response = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData), // 将评论数据序列化为 JSON 格式
      });

      if (!response.ok) {
        throw new Error("Failed to submit review. Please try again.");
      }

      // 提交成功
      setSubmitted(true);
      alert("Thank you for your feedback!");
      setRatings({ features: 0, accessibility: 0, useful: 0 });
      setComment("");
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // 星级组件
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

  // 渲染星级评分
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white mb-3">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-[#EF5A6F] mb-6">
          We would like to hear from you!
        </h1>

        {/* 提交成功后提示 */}
        {submitted && <p className="text-green-500 mb-4">Review submitted successfully!</p>}

        {/* 评分部分 */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-lg font-medium">Features:</label>
            {renderStars("features")}
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

        {/* 评论部分 */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Other comments:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your thoughts here..."
            className="w-full p-3 border rounded-md bg-[#FAEDCE] focus:outline-none focus:ring-2 focus:ring-[#EF5A6F]"
          />
        </div>

        {/* 错误信息显示 */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* 提交按钮 */}
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

export default Review;
