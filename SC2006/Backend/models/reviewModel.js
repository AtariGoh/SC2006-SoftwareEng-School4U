const supabase = require('../src/supabaseClient');

// 获取指定学校的所有评论
const getReviewsBySchoolId = async (schoolId) => {
    const { data, error } = await supabase
        .from('school_reviews')
        .select('*')
        .eq('schoolId', schoolId)
        .order('createdAt', { ascending: false });

    if (error) {
        console.error('Error fetching reviews:', error);
        throw new Error(`Error fetching reviews: ${error.message}`);
    }
    return data;
};

// 添加新的评论
const addReview = async (schoolId, userId, rating, review) => {
    if (!schoolId || !userId || !review || rating < 1 || rating > 5) {
        throw new Error('All fields are required and rating must be between 1 and 5');
    }

    const { data, error } = await supabase
        .from('school_reviews')
        .insert([{ schoolId, userId, rating, review }]);

    if (error) {
        console.error('Error adding review:', error);
        throw new Error(`Error adding review: ${error.message}`);
    }
    return data;
};

// 删除评论
const deleteReview = async (reviewId, userId) => {
    const { data: review, error: fetchError } = await supabase
        .from('school_reviews')
        .select('userId')
        .eq('id', reviewId)
        .single();

    if (fetchError || !review) {
        throw new Error('Review not found');
    }

    if (review.userId !== userId) {
        throw new Error('You are not authorized to delete this review');
    }

    const { data, error } = await supabase
        .from('school_reviews')
        .delete()
        .eq('id', reviewId)
        .eq('userId', userId);

    if (error) {
        console.error('Error deleting review:', error);
        throw new Error(`Error deleting review: ${error.message}`);
    }
    return data;
};

module.exports = {
    getReviewsBySchoolId,
    addReview,
    deleteReview, 
};
