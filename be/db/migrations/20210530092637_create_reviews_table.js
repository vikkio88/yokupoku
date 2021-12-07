const { TABLES } = require('../enums');

exports.up = function (knex) {
    return knex.schema.createTable(TABLES.REVIEWS, function (table) {
        table.string('id', 255).primary();
        table.string('slug', 255).unique().notNullable();
        table.string('productId', 255).notNullable()
            .references('id')
            .inTable(TABLES.PRODUCTS)
            .onDelete('CASCADE');
        table.string('title', 255).notNullable();
        table.string('subtitle', 255).notNullable();
        table.text('image').notNullable();
        table.text('content').notNullable();

        // comma separates lists
        table.text('pros').defaultTo(null);
        table.text('cons').defaultTo(null);
        table.text('tags').defaultTo(null);


        table.integer('rating');
        // boredom speed index
        table.integer('bsi');
        table.bool('suggested').defaultTo(false);

        table.bool('published').defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    knex.schema.dropTableIfExists(TABLES.REVIEWS);
};
