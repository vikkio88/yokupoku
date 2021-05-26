
exports.up = function (knex) {
    return knex.schema.createTable('reviews', function (table) {
        table.string('slug', 255).primary();
        table.enu('type', ['game', 'movie', 'book', 'tv', 'other']).defaultTo('game');
        table.string('name', 255).notNullable();
        table.string('edition', 255);
        table.string('title', 255).notNullable().unique();
        table.text('review').notNullable();
        table.integer('rating');
        // boredom speed index
        table.integer('bsi');
        table.bool('suggested').defaultTo(false);
        table.bool('refunded').defaultTo(false);
        /*
        something indicating how fast it gets boring
        table.specificType('rating', 'tinyint(1)');
        */
        /*
        to move to its own table
        table.json('meta', 255).notNullable().unique();
        table.json('tags').notNullable();
        table.json('genre').notNullable();
        table.json('store').notNullable();
        */
        table.bool('published').defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    knex.schema.dropTableIfExists('reviews');
};
