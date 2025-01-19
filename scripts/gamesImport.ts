const fs = require("fs");
const args = process.argv.slice(2);

async function main(filePath: string) {
  console.log(`Adding games from ${filePath}`);
  const games = JSON.parse(fs.readFileSync(filePath));
  console.log(`${games.length} games to add`);
  for (const g of games) {
    if (!Boolean(g.name)) {
      console.log("Missing title, skipping...");
      continue;
    }
    console.log(`Adding ${g.name}...`);
    const response = await fetch(`http://localhost:3001/api/games`, {
      method: "POST",
      body: JSON.stringify(g),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
  }
}

main(args[0]);
