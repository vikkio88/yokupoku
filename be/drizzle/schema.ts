import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";
import {
  check,
  integer,
  numeric,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import type { Meta } from "yokupoku-shared";

export const products = sqliteTable(
  "products",
  {
    id: text("id", { length: 255 }).primaryKey(),
    type: text("type").default("other"),
    meta: text("meta", { mode: "json" }).$type<Meta>(),
    name: text("name", { length: 255 }).notNull(),
    genre: text("genre", { length: 255 }),
    tags: text("tags"),
    links: text("links"),
    notes: text("notes"),
    released: numeric("released").default(sql`null`),
    consumed: numeric("consumed").default(sql`null`),
    createdAt: numeric("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: numeric("updatedAt").default(sql`CURRENT_TIMESTAMP`),
    slug: text("slug", { length: 255 }),
    image: text("image"),
  },
  (table) => [
    uniqueIndex("products_slug_unique").on(table.slug),
    check(
      "products_type_check",
      sql`${table.type} in ('game','movie','book','tv','music','comic_book','other')`
    ),
  ]
);

export const devices = sqliteTable(
  "devices",
  {
    id: text("id", { length: 255 }).primaryKey(),
    name: text("name", { length: 255 }).notNull(),
    type: text("type").default("other"),
    meta: numeric("meta"),
    links: text("links"),
    notes: text("notes"),
    ownedFrom: numeric("owned_from").default(sql`null`),
  },
  (table) => [
    check(
      "devices_type_check",
      sql`${table.type} in ('game_console','pc','reading','multimedia','other')`
    ),
  ]
);

export const reviews = sqliteTable(
  "reviews",
  {
    id: text("id", { length: 255 }).primaryKey(),
    slug: text("slug", { length: 255 }).notNull(),
    productId: text("productId", { length: 255 })
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    deviceId: text("deviceId", { length: 255 }).references(() => devices.id, {
      onDelete: "set null",
    }),
    title: text("title", { length: 255 }).notNull(),
    subtitle: text("subtitle", { length: 255 }).notNull(),
    image: text("image").notNull(),
    content: text("content").notNull(),
    pros: text("pros"),
    cons: text("cons"),
    tags: text("tags"),
    rating: integer("rating"),
    bsi: integer("bsi"),
    suggested: integer("suggested").default(0),
    spoiler: integer("spoiler").default(0),
    published: integer("published").default(0),
    createdAt: numeric("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: numeric("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("reviews_slug_unique").on(table.slug)]
);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  device: one(devices, {
    fields: [reviews.deviceId],
    references: [devices.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const devicesRelations = relations(devices, ({ many }) => ({
  reviews: many(reviews),
}));

export const productsRelations = relations(products, ({ many }) => ({
  reviews: many(reviews),
}));
