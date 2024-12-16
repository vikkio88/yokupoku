import { Hono } from "hono";
import { misc, reviews, products, providers } from "./actions";

const app = new Hono();

// Namespace helpers
const api = new Hono();

// Reviews routes
api.get("/reviews", reviews.get);
api.get("/reviews/:id", reviews.find);
api.post("/reviews", reviews.create);
api.put("/reviews/:id", reviews.update);
api.delete("/reviews/:id", reviews.del);
api.delete("/reviews", reviews.purge);

// Products routes
api.get("/products", products.products.get);
api.get("/products/:id", products.products.find);

// Non-Games Products routes
api.get("/ngproducts", products.nonGamesProducts.get);
api.get("/ngproducts/:id", products.nonGamesProducts.find);
api.put("/ngproducts/:id", products.nonGamesProducts.update);
api.post("/ngproducts", products.nonGamesProducts.create);
api.delete("/ngproducts/:id", products.nonGamesProducts.del);

// Games routes
api.get("/games", products.games.get);
api.get("/games/:id", products.games.find);
api.put("/games/:id", products.games.update);
api.post("/games", products.games.create);
api.delete("/games/:id", products.games.del);

// Miscellaneous routes
api.get("/ping", misc.pong);

// Provider routes
const provider = new Hono();
provider.use(async (c, next) => {
  console.log(`provider: [${c.req.method}] ${c.req.path}`);
  await next();
});
provider.get("/meta", misc.meta);
provider.get("/reviews", providers.getPublished);
provider.get("/reviews/latest", providers.getLatestReviews);
provider.get("/reviews/:slug", providers.getReview);
provider.get("/products", providers.getProducts);
provider.get("/products/:slug", providers.getProduct);
provider.get("/reviewed-products", providers.getReviewedProducts);

// Attach namespaces
app.route("/api", api);
app.route("/provider", provider);

// General routes
app.post("/stop", () => process.exit(0));
app.get("/", misc.fallback);
app.all("/*", (c) => c.json({ err: "not found" }, 404));

// Signal handlers
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));

Bun.serve({
  fetch: app.fetch,
  port: 3001,
});
