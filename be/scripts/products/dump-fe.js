const fs = require('fs');
const { products } = require('../../models/products');
const DUMP_DIR = `${__dirname}/../../../fe/public/data-providers`;

const dump = async () => {
    console.log('Saving New FE Product Dump');
    const data = await products.getWithReviews();
    for (const type in data) {
        const rows = data[type];
        console.log(`\t saving ${type} products (${rows.length} rows) to ${type}s.json`);
        fs.writeFileSync(`${DUMP_DIR}/${type}s.json`, JSON.stringify(rows, null, 2));
    }
    process.exit(0);

};

dump();