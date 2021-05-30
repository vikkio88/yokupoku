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
        get() {
            return db(products).where('type', 'game').then(rows => rows.map(format.select));
        }
    }
};