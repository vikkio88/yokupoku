
exports.up = function (knex) {
    return knex.schema.createTable('reviews', function (table) {
        table.string('slug', 255).primary();
        table.enu('type', ['game', 'movie', 'book', 'tv', 'other']).defaultTo('game');
        table.enu('store', ['steam', 'epic', 'gog', 'ubisoft', 'origin', 'other']).defaultTo('steam');
        table.string('name', 255).notNullable();
        table.string('edition', 255);
        table.string('title', 255);
        table.text('review');
        table.integer('rating');
        // boredom speed index
        table.integer('bsi');
        table.bool('suggested').defaultTo(false);
        table.bool('refunded').defaultTo(false);

        table.text('tags');
        table.text('genre');
        table.bool('published').defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    knex.schema.dropTableIfExists('reviews');
};
