const { generateId, csl, now } = require('../libs/utils');
const db = require('../db');
const { TABLES, PRODUCT_TYPES } = require('../db/enums');

const prodTable = TABLES.PRODUCTS;

const format = {
    insert(obj, type) {
        return {
            ...obj,
            id: generateId(),
            type,
            meta: JSON.stringify(obj?.meta ?? null),
            tags: csl.toString(obj.tags)
        };
    },
    update(obj) {
        if (obj.id) delete obj.id;

        return {
            ...obj,
            meta: JSON.stringify(obj?.meta ?? null),
            tags: csl.toString(obj.tags),
            updatedAt: now()
        };
    },
    select(obj) {
        return {
            ...obj,
            meta: JSON.parse(obj?.meta ?? null),
            tags: csl.toString(obj.tags)
        };
    }
};

const products = {
        async total({ filter }) {
            const query = db(prodTable).count('*', { as: 'total' }).whereNot('type', 'game');
            for (const f of Object.keys(filter)) {
                query.where(f, 'LIKE', `%${filter[f]}%`);
            }
            const result = await query;
            return result ? result[0].total : 0;
        },
        async find(id) {
            const result = await products.find(id)
                .whereNot('type', PRODUCT_TYPES.GAME)
                .then(rows => rows.map(format.select));

            let prod = null;
            if (Array.isArray(result) && result.length) {
                prod = result.pop();
            }

            return prod;
        },
        get({ range = [0, 9], sort = ['id', 'asc'], filter = {} }) {
            const [lower, upper] = range;
            const limit = upper - lower;
            const offset = lower;
            const query = db(prodTable)
                .select('id', 'name', 'meta')
                .whereNot('type', PRODUCT_TYPES.GAME);

            for (const f of Object.keys(filter)) {
                query.where(f, 'LIKE', `%${filter[f]}%`);
            }

            return query.orderBy(sort[0], sort[1])
                .limit(limit).offset(offset)
                .then(rows => rows.map(format.select));
        },
        async create(obj) {
            const payload = format.insert(obj, obj.type);
            await db(prodTable).insert(payload);
            return { id: payload.id };

        },
        async update(id, values) {
            const result = await db(prodTable)
                .whereNot('type', PRODUCT_TYPES.GAME)
                .where('id', id)
                .update(format.update(values));
            return result === 1;
        },
        async delete(id) {
            const result = await db(prodTable)
                .where('id', id).delete();
            return result === 1;
        }
};

module.exports = {
    format,
    PRODUCT_TYPES,
    products,
    games: {
        async total({ filter }) {
            const query = db(prodTable).count('*', { as: 'total' }).where('type', 'game');
            for (const f of Object.keys(filter)) {
                query.where(f, 'LIKE', `%${filter[f]}%`);
            }
            const result = await query;
            return result ? result[0].total : 0;
        },
        async find(id) {
            const result = await products.find(id)
                .where('type', PRODUCT_TYPES.GAME)
                .then(rows => rows.map(format.select));

            let game = null;
            if (Array.isArray(result) && result.length) {
                game = result.pop();
            }

            return game;
        },
        get({ range = [0, 9], sort = ['id', 'asc'], filter = {} }) {
            const [lower, upper] = range;
            const limit = upper - lower;
            const offset = lower;
            const query = db(prodTable)
                .select('id', 'name', 'meta')
                .where('type', PRODUCT_TYPES.GAME);

            for (const f of Object.keys(filter)) {
                query.where(f, 'LIKE', `%${filter[f]}%`);
            }

            return query.orderBy(sort[0], sort[1])
                .limit(limit).offset(offset)
                .then(rows => rows.map(format.select));
        },
        async create(obj) {
            const payload = format.insert(obj, PRODUCT_TYPES.GAME);
            await db(prodTable).insert(payload);
            return { id: payload.id };

        },
        async update(id, values) {
            const result = await db(prodTable)
                .where('type', PRODUCT_TYPES.GAME)
                .where('id', id)
                .update(format.update(values));
            return result === 1;
        },
        async delete(id) {
            const result = await db(prodTable)
                .where('id', id).delete();
            return result === 1;
        }
    }
};