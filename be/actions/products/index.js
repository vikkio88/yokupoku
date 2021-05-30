const { response } = require('../formatters');
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


module.exports = {
    games: {
        get: getGames
    }
};