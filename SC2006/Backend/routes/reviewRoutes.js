const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// 获取某个学校的所有评论
router.get('/:schoolId', reviewController.getReviewsBySchoolId);

// 添加评论
router.post('/', reviewController.addReview);

// 删除评论
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
