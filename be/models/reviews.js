
// model for REVIEWS table
const { products } = require('./products');
const { generateId, slugify, csl, nBoolean, now } = require('../libs/utils');
const db = require('../db');
const { TABLES } = require('yokupoku-shared/enums/db');

const MAX_LATEST_REVIEWS = 15;

const format = {
    insert(obj, product) {
        if (obj.product) delete obj.product;

        return {
            ...obj,
            id: generateId(),
            slug: slugify(`${product.name} ${obj.title}`),
            productId: obj.productId,
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
                slug: obj.productSlug || null,
            },
        };

        formatted.productName && delete formatted.productName;
        formatted.productType && delete formatted.productType;
        formatted.productSlug && delete formatted.productSlug;

        return formatted;
    },
    select(obj) {
        const base = format.selectMany(obj);
        const formatted = {
            ...base,
            tags: csl.toString(obj.tags),
            pros: csl.toString(obj.pros),
            cons: csl.toString(obj.cons),
            suggested: nBoolean(obj.suggested),
            spoiler: nBoolean(obj.spoiler),
            published: nBoolean(obj.published),
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
            updatedAt: now()
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
            .where('reviews.slug', slug)
            .then(rows => rows.map(format.select));

        let review = null;
        if (Array.isArray(result) && result.length) {
            review = result.pop();
        }

        return review;
    },
    async getPublished() {
        const result = await db(TABLES.REVIEWS).select('reviews.*',
            'products.name as productName', 'products.type as productType', 'products.slug as productSlug'
        ).innerJoin(TABLES.PRODUCTS, 'products.id', '=', 'reviews.productId')
            .where('published', true).orderBy('updatedAt', 'desc')
            .then(rows => rows.map(format.select));
        return result;
    },
    async getLatest() {
        const result = await db(TABLES.REVIEWS).select('reviews.*',
            'products.name as productName', 'products.type as productType'
        ).innerJoin(TABLES.PRODUCTS, 'products.id', '=', 'reviews.productId')
            .where('published', true).orderBy('createdAt', 'desc').limit(MAX_LATEST_REVIEWS)
            .then(rows => rows.map(format.select));
        return result;
    },
    async get() {
        const result = await db(TABLES.REVIEWS).select('reviews.*',
            'products.name as productName', 'products.type as productType'
        ).innerJoin(TABLES.PRODUCTS, 'products.id', '=', 'reviews.productId')
            .where('published', true).orderBy('createdAt', 'desc')
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
    async getByProductId(productId) {
        return db(TABLES.REVIEWS)
            .select()
            .where('productId', productId)
            .then(rows => rows.map(format.selectMany));
    },
    async create(obj) {
        const result = await products.find(obj.productId);
        const product = Array.isArray(result) ? result.pop() : result;
        if (!Boolean(product)) throw Error(`Can't find product ${obj.productId}`);

        const payload = format.insert(obj, product);
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
    },
    async purge() {
        await db(TABLES.REVIEWS).delete();
        return true;
    }
};