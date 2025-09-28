import fs from "fs";
import { EnumChangefreq, SitemapStream, streamToPromise, type SitemapItemLoose } from "sitemap";
import reviewModel from "../../models/reviews.drizzle";
import { productsRepo as productModel } from "../../models/products.drizzle";
import { DUMP_DIR } from "./const";

const HOST = "https://yokupoku.surge.sh/";
const SITEMAPS = {
  MAIN: "sitemap.xml",
  REVIEWS: "sitemap-reviews.xml",
  PRODUCTS: "sitemap-products.xml",
} as const;

const MAIN_LINKS: SitemapItemLoose[] = [
  { url: "/", changefreq: EnumChangefreq.DAILY, priority: 0.9, img: `${HOST}backdrop.png` },
  {
    url: "/about",
    changefreq: EnumChangefreq.MONTHLY,
    priority: 0.3,
    img: `${HOST}backdrop.png`,
  },
  {
    url: "/products",
    changefreq: EnumChangefreq.DAILY,
    priority: 0.9,
    img: `${HOST}backdrop.png`,
  },
  {
    url: "/reviews",
    changefreq: EnumChangefreq.WEEKLY,
    priority: 0.7,
    img: `${HOST}backdrop.png`,
  },
  {
    url: "/coming-soon",
    changefreq: EnumChangefreq.YEARLY,
    priority: 0.1,
    img: `${HOST}backdrop.png`,
  },
];

const sitemapMainGen = async (): Promise<string> => {
  try {
    const smStream = new SitemapStream({ hostname: HOST });
    for (const link of MAIN_LINKS) {
      smStream.write(link);
    }
    smStream.end();
    return (await streamToPromise(smStream)).toString();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const sitemapReviewsGen = async (): Promise<string> => {
  try {
    const smStream = new SitemapStream({ hostname: HOST });
    const reviews = await reviewModel.getPublished();

    reviews.forEach((review: { slug: string; image: string }) => {
      smStream.write({
        url: `/reviews/${review.slug}`,
        changefreq: "weekly",
        img: review.image,
        priority: 0.9,
      });
    });
    smStream.end();

    return (await streamToPromise(smStream)).toString();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const sitemapProductsGen = async (): Promise<string> => {
  try {
    const smStream = new SitemapStream({ hostname: HOST });
    const products = await productModel.getWithReviews();

    products.forEach((prod: { slug: string; image: string }) => {
      smStream.write({
        url: `/products/${prod.slug}`,
        changefreq: "weekly",
        img: prod.image,
        priority: 0.9,
      });
    });
    smStream.end();

    return (await streamToPromise(smStream)).toString();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
const generate = async (): Promise<void> => {
  console.log("Generating FE static content:");

  console.log(`\t saving ${SITEMAPS.MAIN}`);
  let data = await sitemapMainGen();
  fs.writeFileSync(`${DUMP_DIR}/${SITEMAPS.MAIN}`, data);

  console.log(`\t saving ${SITEMAPS.REVIEWS}`);
  data = await sitemapReviewsGen();
  fs.writeFileSync(`${DUMP_DIR}/${SITEMAPS.REVIEWS}`, data);

  console.log(`\t saving ${SITEMAPS.PRODUCTS}`);
  data = await sitemapProductsGen();
  fs.writeFileSync(`${DUMP_DIR}/${SITEMAPS.PRODUCTS}`, data);

  console.log("\t generating robots.txt");
  try {
    const robots = `Sitemap: ${HOST}${SITEMAPS.MAIN}
Sitemap: ${HOST}${SITEMAPS.PRODUCTS}
Sitemap: ${HOST}${SITEMAPS.REVIEWS}
User-agent: *
Allow: /*
Allow: /reviews/*
        
User-agent: Twitterbot
Allow: /
        
User-agent: facebookexternalhit
Allow: /`;

    fs.writeFileSync(`${DUMP_DIR}/robots.txt`, robots);
  } catch (error) {
    console.error(error);
  }

  process.exit(0);
};

generate();