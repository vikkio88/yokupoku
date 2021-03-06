const { json } = require('micro');
const { response, notFound, unprocessable } = require('../formatters');
const model = require('../../models/products');

const games = {
    get: async (req, res) => {
        let { range, sort, filter } = req.query;
        filter = filter ? JSON.parse(filter) : {};
        range = range ? JSON.parse(range) : [0, 10];
        sort = sort ? JSON.parse(sort) : ['id', 'asc'];

        const total = await model.games.total({ filter });
        const games = await model.games.get({ range, sort, filter });

        const topRange = Math.min(games.length, range[1]);
        res.setHeader('Content-Range', `games ${range[0]}-${topRange} / ${total}`);
        return response(res, games);
    },
    find: async (req, res) => {
        const { id } = req.params;
        const result = await model.games.find(id);
        return response(res, result);
    },
    create: async (req, res) => {
        const body = await json(req);
        if (!body) return unprocessable(res);
        const result = await model.games.create(body);
        if (!result) return unprocessable(res);
        return response(res, result);
    },
    update: async (req, res) => {
        const { id } = req.params;
        const body = await json(req);
        if (!id || !body) return unprocessable(res);

        const result = await model.games.update(id, body);

        if (!result) return unprocessable(res);
        return response(res, { id, ...body });
    },
    del: async (req, res) => {
        const { id } = req.params;
        if (!id) return notFound(res);

        const result = await model.games.delete(id);

        if (!result) return unprocessable(res);

        return response(res, { id });
    }
};



const nonGamesProducts = {
    get: async (req, res) => {
        let { range, sort, filter } = req.query;
        filter = filter ? JSON.parse(filter) : {};
        range = range ? JSON.parse(range) : [0, 10];
        sort = sort ? JSON.parse(sort) : ['id', 'asc'];

        const total = await model.nonGamesProducts.total({ filter });
        const products = await model.nonGamesProducts.get({ range, sort, filter });

        const topRange = Math.min(products.length, range[1]);
        res.setHeader('Content-Range', `ngproducts ${range[0]}-${topRange} / ${total}`);
        return response(res, products);
    },
    find: async (req, res) => {
        const { id } = req.params;
        const result = await model.nonGamesProducts.find(id);
        return response(res, result);
    },
    create: async (req, res) => {
        const body = await json(req);
        if (!body) return unprocessable(res);
        const result = await model.nonGamesProducts.create(body);
        if (!result) return unprocessable(res);
        return response(res, result);
    },
    update: async (req, res) => {
        const { id } = req.params;
        const body = await json(req);
        if (!id || !body) return unprocessable(res);

        const result = await model.nonGamesProducts.update(id, body);

        if (!result) return unprocessable(res);
        return response(res, { id, ...body });
    },
    del: async (req, res) => {
        const { id } = req.params;
        if (!id) return notFound(res);

        const result = await model.nonGamesProducts.delete(id);

        if (!result) return unprocessable(res);

        return response(res, { id });
    }
};

const products = {
    get: async (req, res) => {
        let { range, sort, filter } = req.query;
        filter = filter ? JSON.parse(filter) : {};
        range = range ? JSON.parse(range) : [0, 10];
        sort = sort ? JSON.parse(sort) : ['id', 'asc'];

        const total = await model.products.total({ filter });
        const products = await model.products.get({ range, sort, filter });

        const topRange = Math.min(products.length, range[1]);
        res.setHeader('Content-Range', `products ${range[0]}-${topRange} / ${total}`);
        return response(res, products);
    },
    find: async (req, res) => {
        const { id } = req.params;
        const result = await model.products.find(id);
        return response(res, result);
    },
};

module.exports = {
    games, nonGamesProducts, products
};