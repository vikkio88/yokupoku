const { TABLES } = require("yokupoku-shared/enums/db");
const { products, format } = require('../../models/products');

exports.up = async function (knex) {
    await knex.schema.alterTable(TABLES.PRODUCTS, function (table) {
        table.string('slug', 255);
    });
    const prods = await products.getAll();
    for (const prod of prods) {
        const slug = format.generateProductSlug(prod);
        await knex(TABLES.PRODUCTS).where('id', prod.id).update('slug', slug);
    }

    await knex.schema.alterTable(TABLES.PRODUCTS, function (table) {
        table.unique('slug');
    });

};

exports.down = function (knex) {
    return knex.schema.alterTable(TABLES.PRODUCTS, function (table) { table.dropColumn('slug'); });
};
