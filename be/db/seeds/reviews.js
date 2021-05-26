const games = require('../data/games.json');

const slugify = text => text.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');

exports.seed = async (knex) => {
    return knex('reviews').del()
        .then(async () => {
            const formattedGames = games.map(g => ({ ...g, type: 'game', slug: slugify(g.name) }));
            return knex('reviews').insert(formattedGames);
        });
};