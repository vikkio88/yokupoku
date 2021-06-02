const { ulid } = require('ulid');
const db = require('../db');
const { TABLES } = require('../db/enums');

// to be used to generate the slug
// on insert
const slugify = text => text.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');

const format = {
    insert(obj, productId) {
        return {
            ...obj,
            id: ulid(),
            slug: slugify(obj.title),
            productId
        };
    }
};

module.exports = {
    format,
    async total() {
        const result = await db(TABLES.REVIEWS).count('*', { as: 'total' });
        return result ? result[0].total : 0;
    },
    get({ range = [0, 9], sort = ['id', 'asc'] }) {
        const [lower, upper] = range;
        const limit = upper - lower;
        const offset = lower;
        return db(TABLES.REVIEWS)
            .orderBy(sort[0], sort[1])
            .limit(limit).offset(offset);
    },
    find(id) {
        return db(TABLES.REVIEWS)
            .where('id', id);
    },
};