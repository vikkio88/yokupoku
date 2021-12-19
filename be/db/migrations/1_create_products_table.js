const { TABLES, PRODUCT_TYPES } = require('yokupoku-shared/enums/db');

exports.up = function (knex) {
    return knex.schema.createTable(TABLES.PRODUCTS, function (table) {
        table.string('id', 255).primary();
        table.enu('type', Object.values(PRODUCT_TYPES)).defaultTo(PRODUCT_TYPES.OTHER);
        // GAME:
        // store, edition, price, played, refunded
        table.json('meta');
        table.string('name', 255).notNullable();
        table.string('genre', 255).defaultTo(null);

        // comma separates lists
        table.text('tags').defaultTo(null);
        table.text('links').defaultTo(null);

        table.text('notes').defaultTo(null);

        table.timestamp('released').defaultTo(null);
        table.timestamp('consumed').defaultTo(null);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    knex.schema.dropTableIfExists(TABLES.PRODUCTS);
};
