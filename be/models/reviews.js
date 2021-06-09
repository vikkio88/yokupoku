
// model for REVIEWS table
const { generateId, slugify, csl, nBoolean } = require('../libs/utils');
const db = require('../db');
const { TABLES } = require('../db/enums');

const format = {
    insert(obj, productId) {
        if (obj.product) delete obj.product;

        return {
            ...obj,
            id: generateId(),
            slug: slugify(obj.title),
            productId: obj.productId || productId,
            tags: csl.toString(obj.tags),
            pros: csl.toString(obj.pros),
            cons: csl.toString(obj.cons),
        };
    },
    selectMany(obj) {
        const formatted = {
            ...obj,
            product: {
                id: obj.productId,
                name: obj.productName || null,
                type: obj.productType || null,
            },
        };

        formatted.productName && delete formatted.productName;
        formatted.productType && delete formatted.productType;

        return formatted;
    },
    select(obj) {
        const base = format.selectMany(obj);
        const formatted = {
            ...base,
            tags: csl.toString(obj.tags),
            pros: csl.toString(obj.pros),
            cons: csl.toString(obj.cons),
            published: nBoolean(obj.published),
            suggested: nBoolean(obj.suggested),
        };
        return formatted;
    },
    update(obj) {
        if (obj.id) delete obj.id;

        if (obj.product) delete obj.product;

        return {
            ...obj,
            tags: csl.toString(obj.tags),
            pros: csl.toString(obj.pros),
            cons: csl.toString(obj.cons),
            updatedAt: Date.now()
        };
    },
};

module.exports = {
    format,
    async getBySlug(slug) {
        const result = await db(TABLES.REVIEWS).select('reviews.*',
            'products.name as productName', 'products.type as productType'
        ).innerJoin(TABLES.PRODUCTS, 'products.id', '=', 'reviews.productId')
            .where('published', true)
            .where('slug', slug)
            .then(rows => rows.map(format.select));

        let review = null;
        if (Array.isArray(result) && result.length) {
            review = result.pop();
        }

        return review;
    },
    async getPublished() {
        const result = await db(TABLES.REVIEWS).select('reviews.*',
            'products.name as productName', 'products.type as productType'
        ).innerJoin(TABLES.PRODUCTS, 'products.id', '=', 'reviews.productId')
            .where('published', true).orderBy('updatedAt', 'desc')
            .then(rows => rows.map(format.select));
        return result;
    },
    async total() {
        const result = await db(TABLES.REVIEWS).count('*', { as: 'total' });
        return result ? result[0].total : 0;
    },
    get({ range = [0, 9], sort = ['reviews.id', 'asc'] }) {
        const [lower, upper] = range;
        const limit = upper - lower;
        const offset = lower;

        sort[0] = sort[0] === 'id' ? 'reviews.id' : sort[0];
        return db(TABLES.REVIEWS)
            .select('reviews.id', 'title', 'productId',
                'products.name as productName', 'products.type as productType'
            ).innerJoin(TABLES.PRODUCTS, 'products.id', '=', 'reviews.productId')
            .orderBy(sort[0], sort[1])
            .limit(limit).offset(offset).then(rows => rows.map(format.selectMany));
    },
    find(id) {
        return db(TABLES.REVIEWS)
            .select('reviews.*',
                'products.name as productName', 'products.type as productType'
            ).innerJoin(TABLES.PRODUCTS, 'products.id', '=', 'reviews.productId')
            .where('reviews.id', id)
            .then(rows => rows.map(format.select));
    },
    async create(obj) {
        const payload = format.insert(obj);
        await db(TABLES.REVIEWS).insert(payload);
        return { id: payload.id };
    },
    async update(id, values) {
        const result = await db(TABLES.REVIEWS)
            .where('id', id)
            .update(format.update(values));
        return result === 1;
    },
    async delete(id) {
        const result = await db(TABLES.REVIEWS)
            .where('id', id).delete();
        return result === 1;
    }
};