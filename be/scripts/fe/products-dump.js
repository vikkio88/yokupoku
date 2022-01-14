const fs = require('fs');
const { now } = require('../../libs/utils');
const { products } = require('../../models/products');
const DUMP_DIR = `${__dirname}/../../../fe/public/data-providers`;

const dump = async () => {
    console.log('Saving New FE Product Dump');
    const data = await products.getWithReviewsOrdered();
    for (const type in data) {
        const rows = data[type];
        console.log(`\t saving ${type} products (${rows.length} rows) to ${type}s.json`);
        fs.writeFileSync(`${DUMP_DIR}/${type}s.json`, JSON.stringify(rows, null, 2));
    }


    const meta = {
        lastUpdated: now(),
        version: require('child_process')
        .execSync('git rev-parse HEAD')
        .toString().trim()      
    };

    console.log(`\t dump meta meta.json`);
    fs.writeFileSync(`${DUMP_DIR}/meta.json`, JSON.stringify(meta, null, 2));


    process.exit(0);

};

dump();