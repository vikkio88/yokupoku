import type { Context } from "hono";
import { notFound, unprocessable } from "../formatters";

import model from "../../models/products.drizzle";
import type { Sort, Range } from "../../libs/params";

const games = {
  get: async (c: Context) => {
    const sortParam = c.req.query("sort");
    const filter = c.req.query("q");
    const rangeStart: string | undefined = c.req.query("rs");
    const rangeEnd: string | undefined = c.req.query("re");
    const range = (
      rangeStart && rangeEnd ? [rangeStart, rangeEnd] : [0, 10]
    ) as unknown as Range;
    const sort: Sort = sortParam ? JSON.parse(sortParam) : ["id", "desc"];

    const total = await model.games.total({ filter });
    const games = await model.games.get({ range, sort, filter });

    const topRange = Math.min(games.length, range[1]);
    c.res.headers.append("Content-Range", `${range[0]}-${topRange} / ${total}`);
    return c.json(games);
  },
  find: async (c: Context) => {
    const id = c.req.param("id");
    const result = await model.games.find(id);
    return c.json(result);
  },
  create: async (c: Context) => {
    const body = await c.req.json();
    if (!body) return unprocessable(c);
    const result = await model.games.create(body);
    if (!result) return unprocessable(c);
    return c.json(result);
  },
  update: async (c: Context) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    if (!id || !body) return unprocessable(c);

    const result = await model.games.update(id, body);

    if (!result) return unprocessable(c);
    return c.json({ id, ...body });
  },
  del: async (c: Context) => {
    const id = c.req.param("id");
    if (!id) return notFound(c);

    const result = await model.games.delete(id);

    if (!result) return unprocessable(c);

    return c.json({ id });
  },
};

const nonGamesProducts = {
  get: async (c: Context) => {
    const rangeParam: string | number[] | undefined = c.req.query("range");
    const sortParam = c.req.query("sort");
    let filter = c.req.query("q");
    const range = (rangeParam ? JSON.parse(rangeParam) : [0, 10]) as Range;
    const sort: Sort = sortParam ? JSON.parse(sortParam) : ["id", "desc"];

    const total = await model.nonGamesProducts.total({ filter });
    const products = await model.nonGamesProducts.get({ range, sort, filter });

    const topRange = Math.min(products.length, range[1]);
    c.res.headers.append("Content-Range", `${range[0]}-${topRange} / ${total}`);
    return c.json(products);
  },
  find: async (c: Context) => {
    const id = c.req.param("id");
    const result = await model.nonGamesProducts.find(id);
    return c.json(result);
  },
  create: async (c: Context) => {
    const body = await c.req.json();
    if (!body) return unprocessable(c);
    const result = await model.nonGamesProducts.create(body);
    if (!result) return unprocessable(c);
    return c.json(result);
  },
  update: async (c: Context) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    if (!id || !body) return unprocessable(c);

    const result = await model.nonGamesProducts.update(id, body);

    if (!result) return unprocessable(c);
    return c.json({ id, ...body });
  },
  del: async (c: Context) => {
    const id = c.req.param("id");
    if (!id) return notFound(c);

    const result = await model.nonGamesProducts.delete(id);

    if (!result) return unprocessable(c);

    return c.json({ id });
  },
};

const products = {
  get: async (c: Context) => {
    let sortParam = c.req.query("sort");
    const filter = c.req.query("q");
    const rangeStart: string | undefined = c.req.query("rs");
    const rangeEnd: string | undefined = c.req.query("re");
    const range = (
      rangeStart && rangeEnd ? [rangeStart, rangeEnd] : [0, 30]
    ) as Range;
    const sort = (sortParam ? JSON.parse(sortParam) : ["id", "desc"]) as Sort;

    const total = await model.products.total({ filter });
    const products = await model.products.get({ range, sort, filter });

    const topRange = Math.min(products.length, range[1]);
    c.res.headers.append("Content-Range", `${range[0]}-${topRange} / ${total}`);
    return c.json(products);
  },
  find: async (c: Context) => {
    const id = c.req.param("id");
    const result = await model.products.find(id);
    return c.json(result);
  },
};

export default {
  games,
  nonGamesProducts,
  products,
};
