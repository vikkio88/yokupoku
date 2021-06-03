const { ulid } = require('ulid');
const db = require('../db');
const { TABLES } = require('../db/enums');

const TYPES = {
    GAME: 'game',
};

const products = TABLES.PRODUCTS;

const format = {
    insert(obj, type) {
        return {
            ...obj,
            id: ulid(),
            type,
            meta: JSON.stringify(obj?.meta ?? null)
        };
    },
    update(obj) {
        if (obj.id) delete obj.id;

        return {
            ...obj,
            meta: JSON.stringify(obj?.meta ?? null),
            //TODO: add updatedAt
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
    TYPES,
    games: {
        async total() {
            const result = await db(products).count('*', { as: 'total' }).where('type', 'game');
            return result ? result[0].total : 0;
        },
        find(id) {
            return db(products)
                .select('id', 'name')
                .where('type', TYPES.GAME)
                .where('id', id)
                .then(rows => rows.map(format.select));
        },
        get({ range = [0, 9], sort = ['id', 'asc'] }) {
            const [lower, upper] = range;
            const limit = upper - lower;
            const offset = lower;
            // TODO: wanna select a subset of info for the get
            return db(products)
                .where('type', TYPES.GAME)
                .orderBy(sort[0], sort[1])
                .limit(limit).offset(offset)
                .then(rows => rows.map(format.select));
        },
        async create(obj) {
            const payload = format.insert(obj, TYPES.GAME);
            await db(products).insert(payload);
            return { id: payload.id };

        },
        async update(id, values) {
            const result = await db(products)
                .where('type', TYPES.GAME)
                .where('id', id)
                .update(format.update(values));
            return result === 1;
        },
        async delete(id) {
            const result = await db(products)
                .where('id', id).delete();
            return result === 1;
        }
    }
};