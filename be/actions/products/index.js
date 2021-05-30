const { response } = require('../formatters');
const model = require('../../models/products');

const getGames = async (req, res) => {
    const games = await model.games.get();
    return response(res, { games });
};


module.exports = {
    games: {
        get: getGames
    }
};