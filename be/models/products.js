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
    update(obj) {
        if (obj.id) delete obj.id;
        return {
            ...obj,
            meta: JSON.parse(obj?.meta ?? null)
        };
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
        find(id) {
            return db(products).where('type', 'game')
                .where('id', id)
                .then(rows => rows.map(format.select));
        },
        get({ range = [0, 9], sort = ['id', 'asc'] }) {
            const [lower, upper] = range;
            const limit = upper - lower;
            const offset = lower;
            return db(products).where('type', 'game')
                .orderBy(sort[0], sort[1])
                .limit(limit).offset(offset)
                .then(rows => rows.map(format.select));
        },
        create() {

        },
        update(id, values) {
            return db(products).where('type', 'game').where('id', id).update(format.update(values));
        },
        delete() {

        }
    }
};