const db = require('../db');

// to be used to generate the slug
const slugify = text => text.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');

module.exports = {
    get(params) {
        const query = db('reviews');
        for (const field of Object.keys(params)) {
            query.where(field, params[field]);
        }
        return query;
    }
};