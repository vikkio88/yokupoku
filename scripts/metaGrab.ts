import { $ } from "bun";
import { imageUploader } from "./imgUploader.ts";
const axios = require("axios");
const cheerio = require("cheerio");

export const reupImage = async (image: string | URL) => {
  try {
    console.log(`Getting Image from: ${image}\n\n`);
    await $`wget -O downloaded.jpg ${image}`;
    let fileToUpload = "downloaded.jpg";
    const result = await imageUploader(fileToUpload);
    await $`rm ${fileToUpload}`;
    console.log("\n\n");
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getInfoFromSteam = async (url: string) => {
  const page = await axios.get(url, {
    headers: { "User-Agent": "Twitterbot/1.0" },
  });
  const ch = cheerio.load(page.data);

  let title =
    ch('meta[property="og:title"]').attr("content") ||
    ch("title").text() ||
    ch('meta[name="title"]').attr("content");
  title = title.replace("on Steam", "").trim();
  const image =
    ch('meta[property="og:image"]').attr("content") ||
    ch('meta[property="og:image:url"]').attr("content");
  const tagsItems = ch(".app_tag") as cheerio.Cheerio;
  const tags: cheerio.TagElement[] = [];
  tagsItems.each(function () {
    const a = ch(this as cheerio.TagElement)
      .text()
      .trim()
      .toLocaleLowerCase();
    tags.push(a);
  });

  tags.pop();

  const result = { title, image, tags };

  return result;
};
