const games = require('../data/games.json');
const { TABLES } = require('../enums');
const { format, TYPES } = require('../../models/products');

exports.seed = async (knex) => {
    return knex(TABLES.PRODUCTS).del()
        .then(async () => {
            const formattedGames = games.map(g => format.insert(g, TYPES.GAME));
            return knex(TABLES.PRODUCTS).insert(formattedGames);
        });
};