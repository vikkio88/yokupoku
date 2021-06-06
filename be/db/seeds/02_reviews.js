const reviews = require('../data/reviews.json');
const { TABLES } = require('../enums');
const { format } = require('../../models/reviews');

const r = array => array[Math.floor(Math.random() * array.length)];
const rI = () => Math.floor(Math.random() * 100);
const rB = () => Math.floor(Math.random() * 100) > 50;

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
                    pros: `${r(reviews.words)},${r(reviews.words)}`,
                    cons: `${r(reviews.words)},${r(reviews.words)}`,
                    tags: `${r(reviews.words)},${r(reviews.words)}`,
                    rating: rI(),
                    bsi: rI(),
                    suggested: rB(),
                    published: rB()

                };
                reviewsToAdd.push(format.insert(review, product.id));
            }
            return knex(TABLES.REVIEWS).insert(reviewsToAdd);
        });
};