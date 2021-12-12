const games = require('../data/dump.json');
const { TABLES, PRODUCT_TYPES } = require('yokupoku-shared/enums/db');
const { format } = require('../../models/products');

exports.seed = async (knex) => {
    return knex(TABLES.PRODUCTS).del()
        .then(async () => {
            const formattedGames = games.map(g => format.insert(g, PRODUCT_TYPES.GAME));
            return knex(TABLES.PRODUCTS).insert(formattedGames);
        });
};