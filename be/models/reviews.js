const db = require('../db');

module.exports = {
    async get() {
        return await db('reviews').where('published', true);
    }
};