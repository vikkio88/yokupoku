import { drizzle } from "drizzle-orm/libsql";
import type { Logger } from "drizzle-orm";
import * as schema from "../drizzle/schema";
const DB_FILE_NAME = "db/data/dev.sqlite3";

class SimpleLog implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log({ query, params });
  }
}

const CONFIG = {
  dbUri: `file:${DB_FILE_NAME}`,
  verbose: false,
};

const db = drizzle(CONFIG.dbUri, {
  schema,
  logger: CONFIG.verbose ? new SimpleLog() : undefined,
});
export default db;
