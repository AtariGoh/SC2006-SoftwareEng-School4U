const express = require('express');
const supabase = require('../src/supabaseClient');
const router = express.Router();

// 获取某个学校的所有评论
router.get('/:schoolId', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('school_reviews')
            .select('*')
            .eq('schoolId', req.params.schoolId);

        if (error) {
            console.error('Error fetching reviews:', error);
            throw new Error(`Error fetching reviews: ${error.message}`);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 添加评论
router.post('/', async (req, res) => {
    const { schoolId, userId, rating, review } = req.body;

    // 验证输入
    if (!schoolId || !userId || !rating || !review) {
        return res.status(400).json({ message: "All fields are required." });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    try {
        const { data, error } = await supabase
            .from('school_reviews')
            .insert([{ schoolId, userId, rating, review }]);

        if (error) {
            console.error('Error adding review:', error);
            throw new Error(`Error adding review: ${error.message}`);
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 删除评论
router.delete('/:reviewId', async (req, res) => {
    const { userId } = req.body;

    try {
        // 获取评论并检查是否由当前用户创建
        const { data: review, error: fetchError } = await supabase
            .from('school_reviews')
            .select('userId')
            .eq('id', req.params.reviewId)
            .single();

        if (fetchError || !review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        if (review.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this review." });
        }

        const { data, error } = await supabase
            .from('school_reviews')
            .delete()
            .eq('id', req.params.reviewId)
            .eq('userId', userId);

        if (error) {
            console.error('Error deleting review:', error);
            throw new Error(`Error deleting review: ${error.message}`);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
