import { eq, like, ne, desc, asc, and, not } from "drizzle-orm";
import db from "../db"; // drizzle db instance

import { generateId, csl, now, slugify } from "../libs/utils";
import { PRODUCT_TYPES, SLUGEABLE_STORES } from "yokupoku-shared/enums/db";
import { products, reviews } from "../drizzle/schema";

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
    return {
      ...obj,
      meta: JSON.parse(obj?.meta ?? null),
      tags: csl.toString(obj.tags),
    };
  },
};

const genericProductsFormat = {
  select(obj: any) {
    const meta = JSON.parse(obj?.meta ?? null);
    return {
      ...obj,
      name: `${obj.name} (${obj.type}${
        meta?.device ? ` ${meta?.device}` : ""
      })`,
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
    const meta = JSON.parse(obj?.meta ?? null);
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

export const productsApi = {
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
    const mapped = rows.map(genericProductsFormat.select);
    return mapped.length ? mapped.pop() : null;
  },

  getAll() {
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

  async getWithReviews() {
    const reviewRows = await db.query.reviews.findMany({
      where: not(eq(reviews.published, 0)),
    });
    const reviewsMap: Record<string, any[]> = {};
    for (const r of reviewRows.map(genericProductsFormat.feDataReview)) {
      if (!reviewsMap[r.productId]) reviewsMap[r.productId] = [];
      reviewsMap[r.productId].push(r);
    }
    const prodRows = await db.select().from(products);
    return prodRows.map((row) =>
      genericProductsFormat.feDataSelect(row, reviewsMap)
    );
  },
};

// --- nonGamesProducts (same structure) ---
export const nonGamesProductsApi = {
  async total({ filter }: { filter?: string }) {
    const conditions = [ne(products.type, PRODUCT_TYPES.GAME)];
    if (filter) conditions.push(like(products.name, `%${filter}%`));
    const [{ count }] = await db
      .select({ count: db.fn.count(products.id).as("count") })
      .from(products)
      .where(and(...conditions));
    return count;
  },

  async find(id: string) {
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.id, id), ne(products.type, PRODUCT_TYPES.GAME)));
    const mapped = rows.map(format.select);
    return mapped.length ? mapped.pop() : null;
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
