import { $ } from "bun";

const MAIN_DB_FILE = "./db/data/dev.sqlite3";
const REMOTE = "pi4";
const REMOTE_PATH = "~/usb/yokupokubackups";
const localPath = Bun.argv[2];

if (!localPath) {
  console.error("Missing destination path.\nUsage: bun restore.ts <localPath>");
  process.exit(1);
}

async function downloadLatest() {
  const { stdout } = await $`
    ssh ${REMOTE} "ls ${REMOTE_PATH}/backup_*.sqlite3"
    `;

  const files = stdout
    .toString()
    .trim()
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);

  if (files.length === 0) {
    console.error("No backup files found.");
    process.exit(1);
  }
  const parseDateFromName = (path: string) => {
    const name = path.split("/").pop()!;
    const parts = name
      .replace("backup_", "")
      .replace(".sqlite3", "")
      .split("_");
    const [day, month, year, hour, minute] = parts.map(Number);
    return new Date(year, month - 1, day, hour, minute);
  };

  const latestFile = files
    .map((f) => ({ f, d: parseDateFromName(f) }))
    .sort((a, b) => b.d.getTime() - a.d.getTime())[0]?.f;

  if (!latestFile) {
    console.error("Could not determine latest backup.");
    process.exit(1);
  }

  console.log("Latest backup:", latestFile);

  await $`scp ${REMOTE}:${latestFile} ${localPath}`;
  console.log(`Restored ${localPath}`);
  return localPath;
}

async function replaceDb(restoredPath: string) {
  const dbFile = Bun.file(MAIN_DB_FILE);

  if (!(await dbFile.exists())) {
    console.log("No existing dev DB found, restoring fresh copy.");
    await $`cp ${restoredPath} ${MAIN_DB_FILE}`;
    console.log(`Restored new DB: ${MAIN_DB_FILE}`);
    return;
  }

  const devStat = await dbFile.stat();
  const restoredStat = await Bun.file(restoredPath).stat();

  if (
    devStat.mtime &&
    restoredStat.mtime &&
    devStat.mtime > restoredStat.mtime
  ) {
    console.log(
      "Local DB was modified more recently than backup. Aborting restore."
    );
    process.exit(0);
  }

  await $`cp ${restoredPath} ${MAIN_DB_FILE}`;
  console.log(`Replaced ${MAIN_DB_FILE} with restored version`);
}
async function main() {
  const resultPath = await downloadLatest();
  await replaceDb(resultPath);
}

await main();
