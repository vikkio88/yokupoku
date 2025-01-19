import type { Context } from "hono";
import { notFound } from "../formatters";

import reviewModel from "../../models/reviews";
const productModels = require("../../models/products");

const getPublished = async (c: Context) => {
  const reviews = await reviewModel.getPublished();
  return c.json(reviews);
};

const getLatestReviews = async (c: Context) => {
  const reviews = await reviewModel.getLatest();
  console.log({ reviews });
  return c.json(reviews);
};

const getReview = async (c: Context) => {
  const slug = c.req.param("slug");
  const review = await reviewModel.getBySlug(slug);
  if (!review) return notFound(c);
  const product = await productModels.products.find(review.productId);
  if (!product) return notFound(c);
  review.product && delete review.product;

  return c.json({ review, product });
};

const getProducts = async (c: Context) => {
  const products = await productModels.products.getIndexedByTypeWithReviews();
  return c.json(products);
};

const getProduct = async (c: Context) => {
  const slug = c.req.param("slug");
  const product = await productModels.products.getBySlug(slug);
  if (!product) return notFound(c);
  const reviews = await reviewModel.getByProductId(product.id);
  product.reviews = reviews;

  return c.json(product);
};

const getReviewedProducts = async (c: Context) => {
  const products = await productModels.products.getOnlyWithReviews();
  return c.json(products);
};

export default {
  getPublished,
  getLatestReviews,
  getReview,
  getProducts,
  getProduct,
  getReviewedProducts,
};
