const db = require('../db');

// to be used to generate the slug
const slugify = text => text.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');

module.exports = {
    getPublished() {
        return db('reviews').where('published', true);
    }
};