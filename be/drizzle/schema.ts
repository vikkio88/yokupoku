import { sqliteTable, AnySQLiteColumn, check, integer, numeric, uniqueIndex, text, foreignKey } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const migrations = sqliteTable("migrations", {
	id: integer().primaryKey().notNull(),
	name: text({ length: 255 }),
	batch: integer(),
	migrationTime: numeric("migration_time"),
},
(table) => [
	check("products_check_1", sql``type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'`),
	check("devices_check_2", sql``type` in ('game_console', 'pc', 'reading', 'multimedia', 'other'`),
]);

export const migrationsLock = sqliteTable("migrations_lock", {
	index: integer().primaryKey().notNull(),
	isLocked: integer("is_locked"),
},
(table) => [
	check("products_check_1", sql``type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'`),
	check("devices_check_2", sql``type` in ('game_console', 'pc', 'reading', 'multimedia', 'other'`),
]);

export const products = sqliteTable("products", {
	id: text({ length: 255 }).primaryKey(),
	type: text().default("other"),
	meta: numeric(),
	name: text({ length: 255 }).notNull(),
	genre: text({ length: 255 }).default("sql`(null)`"),
	tags: text().default("sql`(null)`"),
	links: text().default("sql`(null)`"),
	notes: text().default("sql`(null)`"),
	released: numeric().default(sql`(null)`),
	consumed: numeric().default(sql`(null)`),
	createdAt: numeric().default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: numeric().default(sql`(CURRENT_TIMESTAMP)`),
	slug: text({ length: 255 }),
	image: text(),
},
(table) => [
	uniqueIndex("products_slug_unique").on(table.slug),
	check("products_check_1", sql``type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'`),
	check("devices_check_2", sql``type` in ('game_console', 'pc', 'reading', 'multimedia', 'other'`),
]);

export const devices = sqliteTable("devices", {
	id: text({ length: 255 }).primaryKey(),
	name: text({ length: 255 }).notNull(),
	type: text().default("other"),
	meta: numeric(),
	links: text().default("sql`(null)`"),
	notes: text().default("sql`(null)`"),
	ownedFrom: numeric().default(sql`(null)`),
},
(table) => [
	check("products_check_1", sql``type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'`),
	check("devices_check_2", sql``type` in ('game_console', 'pc', 'reading', 'multimedia', 'other'`),
]);

export const reviews = sqliteTable("reviews", {
	id: text({ length: 255 }).primaryKey(),
	slug: text({ length: 255 }).notNull(),
	productId: text({ length: 255 }).notNull().references(() => products.id, { onDelete: "cascade" } ),
	deviceId: text({ length: 255 }).default("sql`(null)`").references(() => devices.id, { onDelete: "set null" } ),
	title: text({ length: 255 }).notNull(),
	subtitle: text({ length: 255 }).notNull(),
	image: text().notNull(),
	content: text().notNull(),
	pros: text().default("sql`(null)`"),
	cons: text().default("sql`(null)`"),
	tags: text().default("sql`(null)`"),
	rating: integer(),
	bsi: integer(),
	suggested: numeric<"number">().default(0),
	spoiler: numeric<"number">().default(0),
	published: numeric<"number">().default(0),
	createdAt: numeric().default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: numeric().default(sql`(CURRENT_TIMESTAMP)`),
},
(table) => [
	uniqueIndex("reviews_slug_unique").on(table.slug),
	check("products_check_1", sql``type` in ('game', 'movie', 'book', 'tv', 'music', 'comic_book', 'other'`),
	check("devices_check_2", sql``type` in ('game_console', 'pc', 'reading', 'multimedia', 'other'`),
]);

