const { generateId, csl, now, slugify } = require('../libs/utils');
const db = require('../db');
const { TABLES, PRODUCT_TYPES, GAMES_STORES } = require('yokupoku-shared/enums/db');
const { getBySlug } = require('./reviews');

const prodTable = TABLES.PRODUCTS;

const SLUGEABLE_STORES = GAMES_STORES.slice(0, 8);

const format = {
    generateProductSlug(prod) {
        const info = [
            prod.name, prod.type,
            prod.device,
            SLUGEABLE_STORES.includes(prod.store) ? prod.store : null
        ].filter(i => Boolean(i));
        return slugify(info.join(' '));
    },
    insert(obj, type) {
        const slug = this.generateProductSlug(genericProductsFormat.selectForSlug(obj));
        const meta = JSON.stringify(obj?.meta ?? null);
        return {
            ...obj,
            // in case we need to load them
            id: obj.id || generateId(),
            slug,
            type,
            meta,
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

const genericProductsFormat = {
    select(obj) {
        const meta = JSON.parse(obj?.meta ?? null);
        return {
            ...obj,
            // NB this is used in slug generation of review too
            name: `${obj.name} (${obj.type} ${meta?.device || ''})`,
            meta,
            tags: csl.toString(obj.tags)
        };
    },
    selectForSlug(obj) {
        let meta = null;
        try { meta = JSON.parse(obj?.meta ?? null); } catch (err) { meta = obj?.meta; }
        console.log({ name: obj.name, meta });
        return {
            id: obj.id,
            // this is used only in the slug generation
            name: obj.name,
            type: obj.type,
            device: meta?.device || null,
            store: meta?.store || null,
        };
    },
    feDataSelect(obj, reviews) {
        reviews = reviews[obj.id] || [];
        const meta = JSON.parse(obj?.meta ?? null);
        const tags = csl.toString(obj.tags);
        const result = { ...obj, meta, tags, reviews };

        return result;
    },
    feDataReview(obj) {
        const { id, slug, title, productId, subtitle, updatedAt, spoiler } = obj;
        return {
            id, slug, title, subtitle, updatedAt, spoiler, productId,
            tags: csl.toString(obj.tags)
        };
    }
};

const products = {
    async total({ filter }) {
        const query = db(prodTable).count('*', { as: 'total' });
        for (const f of Object.keys(filter)) {
            query.where(f, 'LIKE', `%${filter[f]}%`);
        }
        const result = await query;
        return result ? result[0].total : 0;
    },
    async getBySlug(slug) {
        const result = await db(prodTable).where('slug', slug)
            .then(rows => rows.map(genericProductsFormat.select));

        let prod = null;
        if (Array.isArray(result) && result.length) {
            prod = result.pop();
        }

        return prod;
    },
    async find(id) {
        const result = await db(prodTable).where('id', id)
            .then(rows => rows.map(genericProductsFormat.select));

        let prod = null;
        if (Array.isArray(result) && result.length) {
            prod = result.pop();
        }

        return prod;
    },
    //this is only used in slug generation migration
    getAll() {
        return db(prodTable)
            .select('id', 'name', 'type', 'meta').then(rows => rows.map(genericProductsFormat.selectForSlug));
    },
    get({ range = [0, 9], sort = ['id', 'asc'], filter = {} }) {
        const [lower, upper] = range;
        const limit = upper - lower;
        const offset = lower;
        const query = db(prodTable)
            .select('id', 'name', 'type', 'meta', 'slug');

        for (const f of Object.keys(filter)) {
            query.where(f, 'LIKE', `%${filter[f]}%`);
        }

        return query.orderBy(sort[0], sort[1])
            .limit(limit).offset(offset)
            .then(rows => rows.map(genericProductsFormat.select));
    },
    async getWithReviews() {
        const reviews = await db(TABLES.REVIEWS).where('published', true).then(rows => rows.map(genericProductsFormat.feDataReview));
        const indexedReviews = {};
        for (const review of reviews) {
            if (Array.isArray(indexedReviews[review.productId])) {
                indexedReviews[review.productId].push(review);
                continue;
            }

            indexedReviews[review.productId] = [review];
        }
        const result = await db(TABLES.PRODUCTS).select(
            'products.*'
        ).then(rows => rows.map(row => genericProductsFormat.feDataSelect(row, indexedReviews)));

        return result;
    },
    async getIndexedByTypeWithReviews() {
        const reviews = await db(TABLES.REVIEWS).where('published', true).then(rows => rows.map(genericProductsFormat.feDataReview));
        const indexedReviews = {};
        for (const review of reviews) {
            if (Array.isArray(indexedReviews[review.productId])) {
                indexedReviews[review.productId].push(review);
                continue;
            }

            indexedReviews[review.productId] = [review];
        }
        const result = await db(TABLES.PRODUCTS).select(
            'products.*'
        ).then(rows => rows.map(row => genericProductsFormat.feDataSelect(row, indexedReviews)));

        // indexing results by type
        const indexedResult = {};
        for (const product of result) {
            if (Array.isArray(indexedResult[product.type])) {
                indexedResult[product.type].push(product);
                continue;
            }
            indexedResult[product.type] = [product];

        }

        return indexedResult;
    },
    async getWithReviewsOrdered() {
        const reviews = await db(TABLES.REVIEWS).where('published', true).then(rows => rows.map(genericProductsFormat.feDataReview));
        const indexedReviews = {};
        for (const review of reviews) {
            if (Array.isArray(indexedReviews[review.productId])) {
                indexedReviews[review.productId].push(review);
                continue;
            }

            indexedReviews[review.productId] = [review];
        }
        const result = await db(TABLES.PRODUCTS).select(
            'products.*'
        ).orderBy('updatedAt', 'desc').then(rows => rows.map(row => genericProductsFormat.feDataSelect(row, indexedReviews)));

        // indexing results by type
        const indexedResult = {};
        for (const product of result) {
            if (Array.isArray(indexedResult[product.type])) {
                indexedResult[product.type].push(product);
                continue;
            }
            indexedResult[product.type] = [product];

        }

        return indexedResult;
    }
};

const nonGamesProducts = {
    async total({ filter }) {
        const query = db(prodTable).count('*', { as: 'total' }).whereNot('type', 'game');
        for (const f of Object.keys(filter)) {
            query.where(f, 'LIKE', `%${filter[f]}%`);
        }
        const result = await query;
        return result ? result[0].total : 0;
    },
    async find(id) {
        const result = await db(prodTable).where('id', id)
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
            .select('id', 'name', 'type', 'meta')
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
    nonGamesProducts,
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
            const result = await db(prodTable).where('id', id)
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