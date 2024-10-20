const reviewModel = require('../models/reviewModel');

// 获取某个学校的所有评论
exports.getReviewsBySchoolId = async (req, res) => {
    try {
        const reviews = await reviewModel.getReviewsBySchoolId(req.params.schoolId);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 添加评论
exports.addReview = async (req, res) => {
    const { schoolId, userId, rating, review } = req.body;

    // 验证输入
    if (!schoolId || !userId || !rating || !review) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newReview = await reviewModel.addReview(schoolId, userId, rating, review);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add review', error: error.message });
    }
};

// 删除评论
exports.deleteReview = async (req, res) => {
    const { userId } = req.body;

    try {
        // 获取评论并检查是否由当前用户创建
        const review = await reviewModel.getReviewById(req.params.reviewId);
        if (review.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this review." });
        }

        const deletedReview = await reviewModel.deleteReview(req.params.reviewId, userId);
        res.status(200).json(deletedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};
