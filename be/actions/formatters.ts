import type { Context } from "hono";

export const unauthorized = (c: Context, message = "Unauthorized") => {
  return c.json(
    {
      message,
    },
    401
  );
};

export const notFound = (c: Context, message = "NotFound") => {
  return c.json(
    {
      message,
    },
    404
  );
};

export const unprocessable = (
  c: Context,
  message = "Wrong Payload",
  errors: string[] = []
) => {
  return c.json(
    {
      message,
      errors,
    },
    422
  );
};
