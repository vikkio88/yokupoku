const reviews = require('../data/reviews.json');
const { TABLES } = require('../enums');
const { format } = require('../../models/reviews');

const r = array => array[Math.floor(Math.random() * array.length)];

exports.seed = async (knex) => {
    return knex(TABLES.REVIEWS).del()
        .then(async () => {
            const products = await knex(TABLES.PRODUCTS).select('id');
            const reviewsToAdd = [];
            for (const product of products) {
                const review = {
                    title: `${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)}`,
                    subtitle: `${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)}`,
                    content: `${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)}`,

                };
                reviewsToAdd.push(format.insert(review, product.id));
            }
            return knex(TABLES.REVIEWS).insert(reviewsToAdd);
        });
};