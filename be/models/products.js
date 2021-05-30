const { ulid } = require('ulid');
const db = require('../db');
const { TABLES } = require('../db/enums');

const products = TABLES.PRODUCTS;

const format = {
    insert(obj) {
        return {
            ...obj,
            id: ulid(),
            meta: JSON.stringify(obj?.meta ?? null)
        };
    },
    update() {

    },
    select(obj) {
        return {
            ...obj,
            meta: JSON.parse(obj?.meta ?? null)
        };
    }

};

module.exports = {
    format,
    games: {
        async total() {
            const result = await db(products).count('*', { as: 'total' }).where('type', 'game');
            return result ? result[0].total : 0;
        },
        get({ range = [0, 9], sort = ['id', 'asc'] }) {
            const [lower, upper] = range;
            const limit = upper - lower;
            const offset = lower;


            return db(products).where('type', 'game')
                .orderBy(sort[0], sort[1])
                .limit(limit).offset(offset)
                .then(rows => rows.map(format.select));
        }
    }
};