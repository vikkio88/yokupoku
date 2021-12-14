const { format } = require('../../models/products');
const { TABLES } = require('yokupoku-shared/enums/db');

const db = require('../../db');
const DATA_DIR = `${__dirname}/../../db/data`;
const DUMP_DIR = `${DATA_DIR}/dumps`;



const loadDump = async () => {
    const rows = require(`${DUMP_DIR}/products_dump.json`);
    console.log(`Loading ${rows.length} rows`);
    for (const index in rows) {
        const row = rows[index];
        console.log(`\t${parseInt(index) + 1} -  inserting ${row.name} (${row.id} | ${row.type})`);
        try {

            const query = db(TABLES.PRODUCTS).insert(format.insert(row, row.type));
            await query;
        } catch (error) {
            console.error('Error', error);
            process.exit(1);
        }
    }

    process.exit(0);
};

loadDump();