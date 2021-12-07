const fs = require('fs');
const DATA_DIR = `${__dirname}/../db/data`;
const GAMES_CSV = `${DATA_DIR}/dump.csv`;

let data = fs.readFileSync(GAMES_CSV, 'utf-8');
let lines = data.split(/\r?\n/);
lines = lines.map(l => l.split(/, ?/));

const headers = lines.shift();
data = [];
for (const line of lines) {
    data.push(line);
}
const games = [];
for (const l of data) {
    let row = {};
    for (const i in headers) {
        row[headers[i]] = l[i].trim();
    }

    games.push(row);
}

const genres = new Set;
const tags = new Set;
const metas = ['meta.device', 'meta.store', 'meta.played', 'meta.edition', 'meta.refunded', 'meta.price'];
for (const g of games) {
    const meta = {};
    for (const m of metas) {
        const sub = m.split('.')[1];
        meta[sub] = g[m];
        delete g[m];
    }
    g.name = g.name.replace(/~/g, ',');
    g.tags = g.tags.replace(/\|/g, ',');
    g.links = g.links.replace(/\|/g, ',');
    const tagsList = g.tags.split(',');
    for (const t of tagsList) {
        tags.add(t.trim());
    }

    g.released = g.released ? g.released.split('/').reverse().join('-') : null;
    // not loading consumed
    g.consumed = null;
    g.meta = meta;
    genres.add(g.genre);
}




fs.writeFileSync(`${DATA_DIR}/genres.json`, JSON.stringify([...genres]));
fs.writeFileSync(`${DATA_DIR}/tags.json`, JSON.stringify([...tags]));
fs.writeFileSync(GAMES_CSV.replace('.csv', '.json'), JSON.stringify(games));