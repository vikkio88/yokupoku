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

        res.setHeader('Content-Range', `games ${range[0]}-${range[1]} / ${total}`);
        return response(res, games);
    },
    find: async (req, res) => {
        const { id } = req.params;
        const result = await model.games.find(id);
        let game = null;
        if (Array.isArray(result) && result.length) {
            game = result.pop();
        }

        if (!game) return notFound(res);

        return response(res, game);
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
    delete: async (req, res) => {
        const { id } = req.params;
        if (!id) return notFound(res);

        const result = await model.games.delete(id);

        if (!result) return unprocessable(res);

        return response(res, { id });
    }
};



module.exports = {
    games
};