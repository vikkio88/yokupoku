const fs = require('fs');
const { format } = require('../../models/products');
const { TABLES } = require('yokupoku-shared/enums/db');

const db = require('../../db');
const DATA_DIR = `${__dirname}/../../db/data`;
const DUMP_DIR = `${__dirname}/../../db/data/dumps`;

const PRODUCT_FILE_NAME = 'products_dump';


const dump = async () => {
    console.log('Saving Product Dump');
    if (fs.existsSync(`${DUMP_DIR}/${PRODUCT_FILE_NAME}.json`)) {
        const dateString = (new Date()).toISOString().replace(/:/gm, '.');
        console.log(`\tbacking up old dump to _${dateString}.json`);
        fs.renameSync(`${DUMP_DIR}/${PRODUCT_FILE_NAME}.json`, `${DUMP_DIR}/${PRODUCT_FILE_NAME}_${dateString}.json`);
    }

    const query = db(TABLES.PRODUCTS).select().then(rows => rows.map(format.select));
    const data = await query;
    console.log(`\t saving ${data.length} rows to ${PRODUCT_FILE_NAME}.json`);
    fs.writeFileSync(`${DUMP_DIR}/${PRODUCT_FILE_NAME}.json`, JSON.stringify(data, null, 2));
    process.exit(0);
};

dump();