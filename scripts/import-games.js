const fs = require('fs');
const axios = require('axios');
const args = process.argv.slice(2);

async function main(filePath) {
    console.log(`Adding games from ${filePath}`);
    const games = JSON.parse(fs.readFileSync(filePath));
    console.log(`${games.length} games to add`);
    for (const g of games) {
        if (!Boolean(g.name)) {
            console.log('Missing title, skipping...');
            continue;
        }
        console.log(`Adding ${g.name}...`);
        const response = await axios.post(`http://localhost:3001/api/games`, g);
        console.log(response.data);
    }
}


main(args[0]);
