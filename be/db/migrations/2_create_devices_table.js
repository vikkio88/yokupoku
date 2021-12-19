const { TABLES, DEVICE_TYPES } = require('yokupoku-shared/enums/db');

exports.up = function (knex) {
    return knex.schema.createTable(TABLES.DEVICES, function (table) {
        table.string('id', 255).primary();
        table.string('name', 255).notNullable();
        table.enu('type', Object.values(DEVICE_TYPES)).defaultTo(DEVICE_TYPES.OTHER);

        // PC:
        // specs
        table.json('meta');

        // comma separated values
        table.text('links').defaultTo(null);

        table.text('notes').defaultTo(null);

        table.timestamp('ownedFrom').defaultTo(null);
    });
};


exports.down = function (knex) {
    knex.schema.dropTableIfExists(TABLES.DEVICES);
};
