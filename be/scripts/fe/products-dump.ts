import { execSync } from "child_process";
import fs from "fs";
import { now } from "../../libs/utils";
import { productsRepo as products } from "../../models/products.drizzle";
import { DUMP_DIR } from "./const";

// A little bit simplified version
const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

const dump = async (): Promise<void> => {
  console.log("Saving New FE Product Dump");
  const productsDump = await products.getWithCompactReviewsOrdered();
  const parsedProductsDump = productsDump.map((p) => ({
    ...p,
    meta: typeof p.meta === "string" ? JSON.parse(p.meta) : p.meta,
  }));
  console.log(typeof parsedProductsDump[0].meta);
  const data: Record<string, typeof parsedProductsDump> = groupBy(
    parsedProductsDump,
    (r) => r.type || "unknown"
  );

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
