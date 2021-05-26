const db = require('../db');

module.exports = {
    get() {
        return db('reviews').where('published', false);
    }
};