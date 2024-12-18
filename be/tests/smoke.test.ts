import { describe, test, expect } from "bun:test";

const endpoints = [
  { method: "GET", url: "/api/reviews" },
  { method: "GET", url: "/api/reviews/:id" },
  { method: "POST", url: "/api/reviews" },
  { method: "PUT", url: "/api/reviews/:id" },
  { method: "DELETE", url: "/api/reviews/:id" },
  //This is disabled  as it purges the db
  //   { method: "DELETE", url: "/api/reviews" },
  { method: "GET", url: "/api/products" },
  { method: "GET", url: "/api/products/:id" },
  { method: "GET", url: "/api/ngproducts" },
  { method: "GET", url: "/api/ngproducts/:id" },
  { method: "PUT", url: "/api/ngproducts/:id" },
  { method: "POST", url: "/api/ngproducts" },
  { method: "DELETE", url: "/api/ngproducts/:id" },
  { method: "GET", url: "/api/games" },
  { method: "GET", url: "/api/games/:id" },
  { method: "PUT", url: "/api/games/:id" },
  { method: "POST", url: "/api/games" },
  { method: "DELETE", url: "/api/games/:id" },
  { method: "GET", url: "/api/ping" },
  { method: "GET", url: "/provider/meta" },
  { method: "GET", url: "/provider/reviews" },
  { method: "GET", url: "/provider/reviews/latest" },
  { method: "GET", url: "/provider/reviews/:slug" },
  { method: "GET", url: "/provider/products" },
  { method: "GET", url: "/provider/products/:slug" },
  { method: "GET", url: "/provider/reviewed-products" },
  { method: "GET", url: "/" },
  { method: "ALL", url: "/*" },
  // this kills the app
  //   { method: "POST", url: "/stop" },
];

describe("API Endpoints", () => {
  endpoints.forEach(({ method, url }) => {
    test(`${method} ${url} should not return 500`, async () => {
      const resolvedUrl = url.replace(/:id|:slug/, "test-id-or-slug");
      const response = await fetch(`http://localhost:3001${resolvedUrl}`, {
        method,
      });
      expect(response.status).not.toBe(500);
    });
  });
});
