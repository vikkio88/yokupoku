const fs = require('fs');
const GAMES_CSV = __dirname + '/games.csv';

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
    g.released = g.released ? g.released.split('/').reverse().join('-') : null;
    // not loading consumed
    g.consumed = null;
    g.meta = meta;
}



fs.writeFileSync(GAMES_CSV.replace('.csv', '.json'), JSON.stringify(games));