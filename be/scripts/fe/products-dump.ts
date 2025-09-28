import fs from "fs";
import { execSync } from "child_process";
import { now } from "../../libs/utils";
import { productsRepo as products } from "../../models/products.drizzle";
import { DUMP_DIR } from "./const";

const dump = async (): Promise<void> => {
  console.log("Saving New FE Product Dump");
  const data = await products.getWithReviewsOrdered();

  for (const type in data) {
    const rows = data[type as keyof typeof data];
    console.log(
      `\t saving ${type} products (${rows.length} rows) to ${type}s.json`
    );
    fs.writeFileSync(
      `${DUMP_DIR}/${type}s.json`,
      JSON.stringify(rows, null, 2)
    );
  }

  const meta = {
    lastUpdated: now(),
    version: execSync("git rev-parse HEAD").toString().trim(),
  };

  console.log(`\t dump meta meta.json`);
  fs.writeFileSync(`${DUMP_DIR}/meta.json`, JSON.stringify(meta, null, 2));

  process.exit(0);
};

dump();
