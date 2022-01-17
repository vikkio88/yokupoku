const { response, notFound } = require('../formatters');
const reviewModel = require('../../models/reviews');
const productModels = require('../../models/products');

const getPublished = async (req, res) => {
    const reviews = await reviewModel.getPublished();
    return response(res, reviews);
};

const getLatestReviews = async (req, res) => {
    const reviews = await reviewModel.getLatest();
    return response(res, reviews);
};

const getReview = async (req, res) => {
    const { slug } = req.params;
    const review = await reviewModel.getBySlug(slug);
    if (!review) return notFound(res);
    const product = await productModels.products.find(review.productId);
    if (!product) return notFound(res);
    review.product && delete review.product;

    return response(res, { review, product });
};

const getProducts = async (req, res) => {
    const products = await productModels.products.getIndexedByTypeWithReviews();
    return response(res, products);
};

const getProduct = async (req, res) => {
    const { slug } = req.params;
    const product = await productModels.products.getBySlug(slug);
    if (!product) return notFound(res);
    const reviews = await reviewModel.getByProductId(product.id);
    product.reviews = reviews;

    return response(res, product);
};

const getReviewedProducts = async (req, res) => {
    const products = await productModels.products.getOnlyWithReviews();
    return response(res, products);
};


module.exports = {
    getPublished, getLatestReviews, getReview,
    getProducts, getProduct, getReviewedProducts
};