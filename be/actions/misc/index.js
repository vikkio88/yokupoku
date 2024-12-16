const { now } = require("../../libs/utils");
const { response } = require("../formatters");

const pong = (c) => {
  return c.json({ pong: true, env: process.env.LABEL });
};

const meta = (c) => {
  return c.json({
    lastUpdated: now(),
    version: require("child_process")
      .execSync("git rev-parse --short HEAD")
      .toString()
      .trim(),
  });
};

const fallback = (c) => {
  return c.text(
    '<head><meta charset="UTF-8"></head><body style="display:flex;' +
    'flex-direction:column; align-items: center; justify-content: center;">' +
    '(╥﹏╥)<span style="margin-top:30px">Nope!</span></body>'
  );
};

module.exports = {
  pong,
  meta,
  fallback,
};
