const { response, notFound } = require('../formatters');
const model = require('../../models/products');

const getGames = async (req, res) => {
    let { range, sort } = req.query;
    range = range ? JSON.parse(range) : undefined;
    sort = sort ? JSON.parse(sort) : undefined;

    const total = await model.games.total();
    const games = await model.games.get({ range, sort });

    res.setHeader('Content-Range', `games ${range[0]}-${range[1]} / ${total}`);
    return response(res, games);
};

const getGame = async (req, res) => {
    const { id } = req.params;
    const result = await model.games.find(id);
    let game = null;
    if (Array.isArray(result) && result.length) {
        game = result.pop();
    }

    if (!game) return notFound(res);
    
    return response(res, game);
};


module.exports = {
    games: {
        get: getGames,
        find: getGame
    }
};