import { LOCAL_API_URL } from "yokupoku-shared/config";
import fs from "node:fs";
const args = process.argv.slice(2);

async function main(filePath: string) {
  console.log(`Adding games from ${filePath}`);
  const games = JSON.parse(fs.readFileSync(filePath).toString());
  console.log(`${games.length} games to add`);
  for (const g of games) {
    if (!Boolean(g.name)) {
      console.log("Missing title, skipping...");
      continue;
    }
    console.log(`Adding ${g.name}...`);
    const response = await fetch(`${LOCAL_API_URL}/api/games`, {
      method: "POST",
      body: JSON.stringify(g),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
  }
}

main(args[0]);
