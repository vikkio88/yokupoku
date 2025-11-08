import { and, asc, count, desc, eq, getTableColumns, like } from "drizzle-orm";
import db from "../db";
import { products, reviews } from "../drizzle/schema";
import { csl, generateId, nBoolean, now, slugify } from "../libs/utils";

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;

const MAX_LATEST_REVIEWS = 15;

const format = {
  insert(obj: Partial<NewReview>, product: { name: string }) {
    const payload: NewReview = {
      ...obj,
      id: generateId(),
      deviceId: obj.deviceId === "" ? null : obj.deviceId,
      slug: slugify(`${product.name} ${obj.title ?? ""}`),
      tags: csl.toString(obj.tags),
      pros: csl.toString(obj.pros),
      cons: csl.toString(obj.cons),
    } as NewReview;
    return payload;
  },
  selectMany(obj: any) {
    const formatted = {
      ...obj,
      product: {
        id: obj.productId,
        name: obj.productName ?? null,
        type: obj.productType ?? null,
        slug: obj.productSlug ?? null,
        ...(obj.product || {}),
      },
    };
    delete formatted.productName;
    delete formatted.productType;
    delete formatted.productSlug;
    return formatted;
  },
  select(obj: any) {
    const base = format.selectMany(obj);
    return {
      ...base,
      tags: csl.toString(obj.tags),
      pros: csl.toString(obj.pros),
      cons: csl.toString(obj.cons),
      suggested: nBoolean(obj.suggested),
      spoiler: nBoolean(obj.spoiler),
      published: nBoolean(obj.published),
    };
  },
  update(obj: Partial<NewReview>) {
    const payload: Partial<NewReview> = {
      ...obj,
      tags: csl.toString(obj.tags),
      pros: csl.toString(obj.pros),
      cons: csl.toString(obj.cons),
      updatedAt: now(),
    };
    delete (payload as any).id;
    delete (payload as any).product;
    return payload;
  },
};

export const reviewsRepo = {
  format,
  async getBySlug(slug: string) {
    const rows = await db
      .select({
        ...getTableColumns(reviews),
        productName: products.name,
        productType: products.type,
        productSlug: products.slug,
      })
      .from(reviews)
      .innerJoin(products, eq(products.id, reviews.productId))
      .where(eq(reviews.slug, slug));

    return rows.length ? format.select(rows[0]) : null;
  },
  async find(id: string) {
    return await db.query.reviews.findFirst({
      where: eq(reviews.id, id),
      with: { product: true },
    });
  },

  async get({
    range = [0, 9],
    sort = ["id", "asc"],
    titleFilter = null,
    productNameFilter = null,
  }: {
    range?: [number, number];
    sort?: [string, "asc" | "desc"];
    titleFilter?: string | null;
    productNameFilter?: string | null;
  }) {
    const [lower, upper] = range;
    const limit = upper - lower;
    const offset = lower;
    const conditions = [] as any[];
    if (titleFilter) conditions.push(like(reviews.title, `%${titleFilter}%`));

    const rows = await db.query.reviews.findMany({
      where: and(...conditions),
      orderBy:
        sort[1] === "asc"
          ? asc((reviews as any)[sort[0]])
          : desc((reviews as any)[sort[0]]),
      limit,
      offset,
      with: { product: true },
    });

    return rows.map(format.select);
  },

  async total({ titleFilter }: { titleFilter?: string }) {
    const conditions = [];
    if (titleFilter) conditions.push(like(reviews.title, `%${titleFilter}%`));
    const [{ count: total }] = await db
      .select({ count: count(products.id) })
      .from(reviews)
      .where(and(...conditions));
    return total;
  },

  async getPublished() {
    const rows = await db
      .select({
        ...getTableColumns(reviews),
        productName: products.name,
        productType: products.type,
        productSlug: products.slug,
      })
      .from(reviews)
      .innerJoin(products, eq(products.id, reviews.productId))
      .where(eq(reviews.published, 1))
      .orderBy(desc(reviews.createdAt));
    return rows.map(format.select);
  },

  async getLatest() {
    const rows = await db
      .select({
        ...getTableColumns(reviews),
        productName: products.name,
        productType: products.type,
        productSlug: products.slug,
      })
      .from(reviews)
      .innerJoin(products, eq(products.id, reviews.productId))
      .where(eq(reviews.published, 1))
      .orderBy(desc(reviews.createdAt))
      .limit(MAX_LATEST_REVIEWS);
    return rows.map(format.select);
  },

  async create(obj: Partial<NewReview>) {
    const product = await db.query.products.findFirst({
      where: eq(products.id, obj.productId!),
    });
    if (!product) throw Error(`Can't find product ${obj.productId}`);
    const payload = format.insert(obj, product);
    await db.insert(reviews).values(payload);
    return { id: payload.id };
  },

  async update(id: string, values: Partial<NewReview>) {
    const result = await db
      .update(reviews)
      .set(format.update(values))
      .where(eq(reviews.id, id));
    return result.rowsAffected === 1;
  },

  async delete(id: string) {
    const result = await db.delete(reviews).where(eq(reviews.id, id));
    return result.rowsAffected === 1;
  },

  async purge() {
    await db.delete(reviews);
    return true;
  },

  async getByProductId(productId: string) {
    return await db.query.reviews.findMany({
      where: eq(reviews.productId, productId),
    });
  },
};

export default {
  format,
  find: reviewsRepo.find,
  get: reviewsRepo.get,
  total: reviewsRepo.total,
  getByProductId: reviewsRepo.getByProductId,
  getBySlug: reviewsRepo.getBySlug,
  getPublished: reviewsRepo.getPublished,
  getLatest: reviewsRepo.getLatest,
  create: reviewsRepo.create,
  update: reviewsRepo.update,
  delete: reviewsRepo.delete,
  purge: reviewsRepo.purge,
};
