// need to update the csv from cms
const fs = require('fs');
const { format } = require('../models/products');
const { TABLES, PRODUCT_TYPES } = require('yokupoku-shared/enums/db');

const db = require('../db');
const DATA_DIR = `${__dirname}/../db/data`;

const metas = ['device', 'store', 'played', 'edition', 'refunded', 'price'];
const dump = async () => {
    const query = db(TABLES.PRODUCTS).select()
        .where('type', PRODUCT_TYPES.GAME).then(rows => rows.map(format.select));
    const data = await query;

    const lines = [];
    for (const r of data) {
        const { id, name, genre, tags, links, notes, released, consumed, meta } = r;
        const newMeta = [];
        for (const m of metas) {
            newMeta.push(meta[m]);
        }
        const lineContent = [
            id,
            name.replace(/,/g, '~'),
            genre,
            ...newMeta,
            tags.replace(/,/g, '|'),
            links.replace(/,/g, '|'),
            notes,
            released,
            consumed
        ];

        lines.push(lineContent.join(','));
    }

    const head = ['id', 'name', 'genre', ...(metas.map(m => `meta.${m}`)), 'tags', 'links', 'notes', 'released', 'consumed'];
    lines.unshift(head);
    fs.writeFileSync(`${DATA_DIR}/dump.json`, JSON.stringify(data));
    fs.writeFileSync(`${DATA_DIR}/dump.csv`, lines.join('\n'));
    

    console.log('written dumps in db/data')
    process.exit(0);
};

dump();