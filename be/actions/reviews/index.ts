import type { Context } from "hono";

import { notFound, unprocessable } from "../formatters";
const model = require("../../models/reviews");

export const get = async (c: Context) => {
  let range: string | number[] | undefined = c.req.query("range");
  let sort = c.req.query("sort");
  range = (range ? JSON.parse(range) : [0, 10]) as number[];
  sort = sort ? JSON.parse(sort) : ["products.id", "asc"];

  const total = await model.total();
  const reviews = await model.get({ range, sort });

  c.res.headers.append(
    "Content-Range",
    `reviews ${range[0]}-${range[1]} / ${total}`
  );
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
