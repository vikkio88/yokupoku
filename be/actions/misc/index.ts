import type { Context } from "hono";
const { now } = require("../../libs/utils");

const pong = (c: Context) => {
  return c.json({ pong: true, env: process.env.LABEL });
};

const meta = (c: Context) => {
  return c.json({
    lastUpdated: new Date(),
    version: require("child_process")
      .execSync("git rev-parse --short HEAD")
      .toString()
      .trim(),
  });
};

const fallback = (c: Context) => {
  return c.text(
    '<head><meta charset="UTF-8"></head><body style="display:flex;' +
      'flex-direction:column; align-items: center; justify-content: center;">' +
      '(╥﹏╥)<span style="margin-top:30px">Nope!</span></body>'
  );
};

export default {
  pong,
  meta,
  fallback,
};
