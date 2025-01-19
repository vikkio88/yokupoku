import { imgbox } from "imgbox-js";

export const imageUploader = async (path: string) => {
  const resp = await imgbox([path]);
  if (resp.data.success.length && resp.data.success[0].error === undefined) {
    return resp.data.success[0].original_url;
  }

  console.error(
    `Error while uploading image: ${resp.data.success[0].error}, code: ${resp.data.success[0].error_code}`
  );
  return null;
};
