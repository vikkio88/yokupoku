const { response, notFound } = require('../formatters');
const reviewModel = require('../../models/reviews');

const getPublished = async (req, res) => {
    const reviews = await reviewModel.getPublished();
    return response(res, reviews);
};


module.exports = {
    getPublished
};