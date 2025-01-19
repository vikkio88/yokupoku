import { $ } from "bun";

const MAIN_DB_FILE = "./db/data/dev.sqlite3";
const BACKUP_FILE = "./db/data/dumps/backup_%DATE.sqlite3";
const formatDate = (date: Date): string =>
  `${date.getDate()}_${
    date.getMonth() + 1
  }_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}`;

async function main() {
  const dateString = formatDate(new Date());
  const backupFilePath = BACKUP_FILE.replace("%DATE", dateString);
  const backupExists = await Bun.file(backupFilePath).exists();
  const mainExists = await Bun.file(MAIN_DB_FILE).exists();

  if (backupExists) {
    console.log(`Backup file "${backupFilePath}" exists already.`);
    process.exit(0);
  }

  if (!mainExists) {
    console.log(`Main Db file "${MAIN_DB_FILE}}" does not exist.`);
    process.exit(1);
  }

  await $`cp ${MAIN_DB_FILE} ${backupFilePath}`;
  console.log(`Backup file written: "${backupFilePath}"`);
}

main();
