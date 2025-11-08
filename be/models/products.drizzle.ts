import { and, asc, count, desc, eq, like, ne, not } from "drizzle-orm";
import { PRODUCT_TYPES, SLUGEABLE_STORES } from "yokupoku-shared/enums/db";
import db from "../db";
import { products, reviews } from "../drizzle/schema";
import type { Range } from "../libs/params";
import { csl, generateId, now, slugify } from "../libs/utils";

const format = {
  generateProductSlug(prod: any) {
    const info = [
      prod.name,
      prod.type,
      prod.device,
      SLUGEABLE_STORES.includes(prod.store) ? prod.store : null,
    ].filter(Boolean);
    return slugify(info.join(" "));
  },
  insert(obj: any, type: string) {
    const slug = this.generateProductSlug(
      genericProductsFormat.selectForSlug(obj)
    );
    const meta = JSON.stringify(obj?.meta ?? null);
    return {
      ...obj,
      id: obj.id || generateId(),
      slug,
      type,
      meta,
      tags: csl.toString(obj.tags),
    };
  },
  update(obj: any) {
    if (obj.id) delete obj.id;
    return {
      ...obj,
      meta: JSON.stringify(obj?.meta ?? null),
      tags: csl.toString(obj.tags),
      updatedAt: now(),
    };
  },
  select(obj: any) {
    const meta =
      typeof obj.meta === "string" ? JSON.parse(obj.meta) : obj.meta ?? null;
    return {
      ...obj,
      meta,
      tags: csl.toString(obj.tags),
    };
  },
};

const genericProductsFormat = {
  select(obj: any) {
    const meta =
      typeof obj.meta === "string" ? JSON.parse(obj.meta) : obj.meta ?? null;
    return {
      ...obj,
      name: `${obj.name} (${obj.type}${
        meta?.device ? ` ${meta?.device}` : ""
      })`,
      meta,
      tags: csl.toString(obj.tags),
    };
  },
  selectForCMS(obj: any) {
    const meta =
      typeof obj.meta === "string" ? JSON.parse(obj.meta) : obj.meta ?? null;
    return {
      ...obj,
      meta,
      tags: csl.toString(obj.tags),
    };
  },
  selectForSlug(obj: any) {
    let meta = null;
    try {
      meta = JSON.parse(obj?.meta ?? null);
    } catch {
      meta = obj?.meta;
    }
    return {
      id: obj.id,
      name: obj.name,
      type: obj.type,
      device: meta?.device || null,
      store: meta?.store || null,
    };
  },
  feDataSelect(obj: any, reviewsMap: Record<string, any[]>) {
    const meta =
      typeof obj.meta === "string" ? JSON.parse(obj.meta ?? "{}") : obj.meta;
    const tags = csl.toString(obj.tags);
    return { ...obj, meta, tags, reviews: reviewsMap[obj.id] || [] };
  },
  feDataReview(obj: any) {
    const { id, slug, title, productId, subtitle, updatedAt, spoiler } = obj;
    return {
      id,
      slug,
      title,
      subtitle,
      updatedAt,
      spoiler,
      productId,
      tags: csl.toString(obj.tags),
    };
  },
};

export const productsRepo = {
  async total({ filter }: { filter?: string }) {
    const conditions = [] as any[];
    if (filter) conditions.push(like(products.name, `%${filter}%`));
    const [{ count: total }] = await db
      .select({ count: count(products.id) })
      .from(products)
      .where(and(...conditions));
    return total;
  },

  async getBySlug(slug: string) {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug));
    const mapped = rows.map(genericProductsFormat.select);
    return mapped.length ? mapped.pop() : null;
  },

  async find(id: string) {
    const rows = await db.select().from(products).where(eq(products.id, id));
    const mapped = rows.map(genericProductsFormat.selectForCMS);
    return mapped.length ? mapped.pop() : null;
  },

  async getAll() {
    return db
      .select({
        id: products.id,
        name: products.name,
        type: products.type,
        meta: products.meta,
      })
      .from(products)
      .then((rows) => rows.map(genericProductsFormat.selectForSlug));
  },

  async get({
    range = [0, 9],
    sort = ["id", "asc"],
    filter = null,
  }: {
    range?: [number, number];
    sort?: [string, "asc" | "desc"];
    filter?: string | null;
  }) {
    const [lower, upper] = range;
    const limit = upper - lower;
    const offset = lower;
    const conditions = [] as any[];
    if (filter) conditions.push(like(products.name, `%${filter}%`));

    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        image: products.image,
        type: products.type,
        meta: products.meta,
        slug: products.slug,
      })
      .from(products)
      .where(and(...conditions))
      .orderBy(
        sort[1] === "asc"
          ? asc((products as any)[sort[0]])
          : desc((products as any)[sort[0]])
      )
      .limit(limit)
      .offset(offset);

    return rows.map(genericProductsFormat.select);
  },

  async getWithAtLeastOneReview() {
    const reviewRows = await db.query.reviews.findMany({
      where: not(eq(reviews.published, 0)),
      with: { product: { columns: { slug: true, id: true, name: true } } },
    });
    return reviewRows.map((r) => r.product);
  },
  async getWithCompactReviewsOrdered() {
    return db.query.products.findMany({
      with: {
        reviews: {
          columns: {
            id: true,
            productId: true,
            slug: true,
            title: true,
            subtitle: true,
          },
        },
      },
      orderBy: [desc(products.createdAt), desc(products.updatedAt)],
    });
  },
};

export const nonGamesProductsRepo = {
  async total({ filter }: { filter?: string }) {
    const conditions = [ne(products.type, PRODUCT_TYPES.GAME)];
    if (filter) conditions.push(like(products.name, `%${filter}%`));
    const [{ count: total }] = await db
      .select({ count: count(products.id) })
      .from(products)
      .where(and(...conditions));
    return total;
  },

  async find(id: string) {
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.id, id), ne(products.type, PRODUCT_TYPES.GAME)));
    const mapped = rows.map(format.select);
    return mapped.length ? mapped.pop() : null;
  },

  async get({
    range = [0, 9],
    sort = ["id", "asc"],
    filter = null,
  }: {
    range?: [number, number];
    sort?: [string, "asc" | "desc"];
    filter?: string | null;
  }) {
    const [lower, upper] = range;
    const limit = upper - lower;
    const offset = lower;
    const conditions = [ne(products.type, PRODUCT_TYPES.GAME)];
    if (filter) conditions.push(like(products.name, `%${filter}%`));

    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        type: products.type,
        meta: products.meta,
      })
      .from(products)
      .where(and(...conditions))
      .orderBy(
        sort[1] === "asc"
          ? asc((products as any)[sort[0]])
          : desc((products as any)[sort[0]])
      )
      .limit(limit)
      .offset(offset);

    return rows.map(format.select);
  },

  async create(obj: any) {
    const payload = format.insert(obj, obj.type);
    await db.insert(products).values(payload);
    return { id: payload.id };
  },

  async update(id: string, values: any) {
    const result = await db
      .update(products)
      .set(format.update(values))
      .where(and(eq(products.id, id), ne(products.type, PRODUCT_TYPES.GAME)));
    return result.rowsAffected === 1;
  },

  async delete(id: string) {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowsAffected === 1;
  },
};

export const gamesRepo = {
  async total({ filter }: { filter?: string }) {
    const conditions = [eq(products.type, PRODUCT_TYPES.GAME)];
    if (filter) conditions.push(like(products.name, `%${filter}%`));
    const [{ count: total }] = await db
      .select({ count: count(products.id) })
      .from(products)
      .where(and(...conditions));
    return total;
  },

  async find(id: string) {
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.id, id), eq(products.type, PRODUCT_TYPES.GAME)));
    const mapped = rows.map(format.select);
    return mapped.length ? mapped.pop() : null;
  },

  async get({
    range = [0, 9],
    sort = ["id", "asc"],
    filter = null,
  }: {
    range?: Range;
    sort?: [string, "asc" | "desc"];
    filter?: string | null;
  }) {
    const [lower, upper] = range;
    const limit = upper - lower;
    const offset = lower;
    const conditions = [eq(products.type, PRODUCT_TYPES.GAME)];
    if (filter) conditions.push(like(products.name, `%${filter}%`));

    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        meta: products.meta,
      })
      .from(products)
      .where(and(...conditions))
      .orderBy(
        sort[1] === "asc"
          ? asc((products as any)[sort[0]])
          : desc((products as any)[sort[0]])
      )
      .limit(limit)
      .offset(offset);

    return rows.map(format.select);
  },

  async create(obj: any) {
    const payload = format.insert(obj, PRODUCT_TYPES.GAME);
    await db.insert(products).values(payload);
    return { id: payload.id };
  },

  async update(id: string, values: any) {
    const result = await db
      .update(products)
      .set(format.update(values))
      .where(and(eq(products.id, id), eq(products.type, PRODUCT_TYPES.GAME)));
    return result.rowsAffected === 1;
  },

  async delete(id: string) {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowsAffected === 1;
  },
};

export default {
  format,
  PRODUCT_TYPES,
  products: productsRepo,
  nonGamesProducts: nonGamesProductsRepo,
  games: gamesRepo,
};
