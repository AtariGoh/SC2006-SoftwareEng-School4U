const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL1, process.env.SUPABASE_KEY1);
console.log(supabase);


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

// 支持批量添加评论的 POST 路由
router.post('/', async (req, res) => {
    const reviews = req.body;

    // 验证：确保请求体是一个非空的数组
    if (!Array.isArray(reviews) || reviews.length === 0) {
        return res.status(400).json({ message: "Reviews should be a non-empty array." });
    }

    try {
        // 遍历数组中的每个评论对象
        for (let review of reviews) {
            const { schoolId, userId, rating, review: reviewText } = review;

            // 验证：确保每个评论有完整的字段
            if (!schoolId || !userId || !rating || !reviewText) {
                return res.status(400).json({ message: "All fields (schoolId, userId, rating, review) are required for each review." });
            }

            if (rating < 1 || rating > 5) {
                return res.status(400).json({ message: "Rating must be between 1 and 5." });
            }

            // 插入每条评论到数据库
            const { data, error } = await supabase
                .from('school_reviews')
                .insert([{ schoolId, userId, rating, review: reviewText }]);

            if (error) {
                console.error('Error adding review:', error);
                throw new Error(`Error adding review: ${error.message}`);
            }
        }

        // 所有评论成功添加
        res.status(201).json({ message: "All reviews added successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// 删除评论
router.delete('/:reviewId', async (req, res) => {
    const { userId } = req.body;  // 从请求体中获取 userId
    const { reviewId } = req.params; // 从路径中获取 reviewId

    // 验证：确保 userId 提供了
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        // 首先获取评论，确保评论存在并且是由当前用户创建
        const { data: review, error: fetchError } = await supabase
            .from('school_reviews')
            .select('userId')
            .eq('id', reviewId)
            .single();

        if (fetchError) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        // 验证：确保当前用户是评论的所有者
        if (review.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this review." });
        }

        // 删除评论
        const { data, error } = await supabase
            .from('school_reviews')
            .delete()
            .eq('id', reviewId)
            .eq('userId', userId);  // 确保删除评论时 userId 也匹配

        if (error) {
            console.error('Error deleting review:', error);
            throw new Error(`Error deleting review: ${error.message}`);
        }

        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;  // 正确导出 router
