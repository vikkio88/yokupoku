import fs from "fs/promises";
import { imgbox } from "imgbox-js";
import os from "os";
import path from "path";

export async function uploadFile(file: File) {
  const tmpPath = path.join(os.tmpdir(), file.name);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(tmpPath, new Uint8Array(buffer));
  const resp = await imgbox([tmpPath]);
  await fs.unlink(tmpPath);

  if (resp.data.success.length && resp.data.success[0].error === undefined) {
    return { url: resp.data.success[0].original_url };
  }

  console.error(
    `Error while uploading image: ${resp.data.success[0].error}, code: ${resp.data.success[0].error_code}`
  );
  return null;
}
