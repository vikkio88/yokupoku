import type { Context } from "hono";
import { uploadFile } from "../../libs/uploader";

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

export async function upload(c: Context) {
  const formData = await c.req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return c.json({ error: "No file uploaded" }, 422);
  }

  const result = await uploadFile(file);

  if (!result) {
    return c.json({ error: "Could not upload" }, 422);
  }

  return c.json({ ...result }, 201);
}

export default {
  pong,
  meta,
  fallback,
};
