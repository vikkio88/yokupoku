import { Hono, type Context } from "hono";
import misc from "./actions/misc";
import providers from "./actions/providers";
import reviews from "./actions/reviews";
import products from "./actions/products";
import { unprocessable } from "./actions/formatters";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173","http://localhost:3002"] ,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Range"],
    maxAge: 86400,
  })
);

app.use("*", async (c: Context, next) => {
  if (!["post", "put"].includes(c.req.method.toLowerCase())) {
    return await next();
  }

  try {
    c.set("parsedBody", await c.req.json());
    await next();
  } catch (err) {
    return unprocessable(c, "Malformed JSON body");
  }
});

const api = new Hono();

api.get("/reviews", reviews.get);
api.get("/reviews/:id", reviews.find);
api.post("/reviews", reviews.create);
api.put("/reviews/:id", reviews.update);
api.delete("/reviews/:id", reviews.del);
api.delete("/reviews", reviews.purge);

api.get("/products", products.products.get);
api.get("/products/:id", products.products.find);

api.get("/ngproducts", products.nonGamesProducts.get);
api.get("/ngproducts/:id", products.nonGamesProducts.find);
api.put("/ngproducts/:id", products.nonGamesProducts.update);
api.post("/ngproducts", products.nonGamesProducts.create);
api.delete("/ngproducts/:id", products.nonGamesProducts.del);

api.get("/games", products.games.get);
api.get("/games/:id", products.games.find);
api.put("/games/:id", products.games.update);
api.post("/games", products.games.create);
api.delete("/games/:id", products.games.del);

// Misc routes
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

app.route("/api", api);
app.route("/provider", provider);

app.post("/stop", () => process.exit(0));
app.get("/", misc.fallback);
app.all("/*", (c) => c.json({ err: "not found" }, 404));

process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));

Bun.serve({
  fetch: app.fetch,
  port: 3001,
});
