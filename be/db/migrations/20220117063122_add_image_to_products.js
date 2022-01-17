
const { TABLES } = require("yokupoku-shared/enums/db");

exports.up = function (knex) {
    return knex.schema.alterTable(TABLES.PRODUCTS, function (table) {
        table.text('image');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable(TABLES.PRODUCTS, function (table) { table.dropColumn('image'); });
};
