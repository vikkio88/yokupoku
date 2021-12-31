const { response, notFound } = require('../formatters');
const reviewModel = require('../../models/reviews');
const productModels = require('../../models/products');

const getPublished = async (req, res) => {
    const reviews = await reviewModel.getPublished();
    return response(res, reviews);
};

const getReview = async (req, res) => {
    const { slug } = req.params;
    const review = await reviewModel.getBySlug(slug);
    if (!review) return notFound(res);

    //TODO: this could be another product too
    const product = await productModels.games.find(review.productId);
    if (!product) return notFound(res);

    // maybe move this to the model dont care tbh
    review.product && delete review.product;


    return response(res, { review, product });
};


module.exports = {
    getPublished, getReview
};