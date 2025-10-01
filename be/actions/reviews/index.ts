import type { Context } from "hono";

import { notFound, unprocessable } from "../formatters";
import model from "../../models/reviews.drizzle";
import type { Range, Sort } from "../../libs/params";

export const get = async (c: Context) => {
  const sortParam = c.req.query("sort");
  const filter = c.req.query("q");
  const rangeStart: string | undefined = c.req.query("rs");
  const rangeEnd: string | undefined = c.req.query("re");
  const range = (
    rangeStart && rangeEnd ? [rangeStart, rangeEnd] : [0, 10]
  ) as Range;
  const sort: Sort = sortParam ? JSON.parse(sortParam) : ["id", "desc"];

  const total = await model.total({ filter });
  const reviews = await model.get({ filter, range, sort });
  c.res.headers.append("Content-Range", `${range[0]}-${range[1]} / ${total}`);
  return c.json(reviews);
};

export const find = async (c: Context) => {
  const id = c.req.param("id");
  const result = await model.find(id);
  let review = null;
  if (Array.isArray(result) && result.length) {
    review = result.pop();
  }

  if (!review) return notFound(c);

  return c.json(review);
};

export const create = async (c: Context) => {
  const body = await c.req.json();
  if (!body) return unprocessable(c);

  const result = await model.create(body);

  if (!result) return unprocessable(c);
  return c.json(result);
};

export const update = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  if (!id || !body) return unprocessable(c);

  const result = await model.update(id, body);

  if (!result) return unprocessable(c);
  return c.json({ id, ...body });
};

export const del = async (c: Context) => {
  const id = c.req.param("id");
  if (!id) return notFound(c);

  const result = await model.delete(id);

  if (!result) return unprocessable(c);

  return c.json({ id });
};

export const purge = async (c: Context) => {
  const result = await model.purge();

  if (!result) return unprocessable(c);

  return c.json({});
};

export default {
  get,
  find,
  create,
  update,
  del,
  purge,
};
