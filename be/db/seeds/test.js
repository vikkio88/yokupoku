const games = require('../data/games.json');
const { TABLES } = require('../enums');
const { format } = require('../../models/products');

exports.seed = async (knex) => {
    return knex(TABLES.PRODUCTS).del()
        .then(async () => {
            const formattedGames = games.map(format.insert);
            return knex(TABLES.PRODUCTS).insert(formattedGames);
        });
};