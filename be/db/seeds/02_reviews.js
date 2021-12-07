const reviews = require('../data/reviews.json');
const { TABLES } = require('../enums');
const { format } = require('../../models/reviews');

const r = array => array[Math.floor(Math.random() * array.length)];
const rI = () => Math.floor(Math.random() * 100);
const rB = () => Math.floor(Math.random() * 100) > 50;

const MAX_REVIEWS = 10;

exports.seed = async (knex) => {
    return knex(TABLES.REVIEWS).del()
        .then(async () => {
            const products = await knex(TABLES.PRODUCTS).select('id', 'name');
            const reviewsToAdd = [];
            let reviewsSoFar = 0;
            for (const product of products) {
                const review = {
                    title: `${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)}`,
                    subtitle: `${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)}`,
                    image: `https://via.placeholder.com/400`,
                    content: `${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)} ${r(reviews.words)}`,
                    pros: `${r(reviews.words)},${r(reviews.words)}`,
                    cons: `${r(reviews.words)},${r(reviews.words)}`,
                    tags: `${r(reviews.words)},${r(reviews.words)}`,
                    rating: rI(),
                    bsi: rI(),
                    suggested: rB(),
                    published: rB()

                };

                review.productId = product.id;

                reviewsToAdd.push(format.insert(review, product));
                reviewsSoFar++;

                if (reviewsSoFar >= MAX_REVIEWS) break;
            }
            return knex(TABLES.REVIEWS).insert(reviewsToAdd);
        });
};