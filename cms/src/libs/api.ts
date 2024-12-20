import type { Product, Review } from "yokupoku-shared";
const BASE_URL = "http://localhost:3001/api";

type FetchOptions = {
  method: string;
  body?: Review | Product;
};

export type Range = {
  min: number;
  max: number;
  total: number;
};

type Response<T> = {
  result: T;
  range?: Range;
};

function parseRange(headers: Headers): Range | undefined {
  const contentRange = headers.get("Content-Range");
  if (!contentRange) return undefined;

  const match = contentRange.match(/(\d+)-(\d+) \/ (\d+)/);
  if (!match) return undefined;

  const [, min, max, total] = match.map(Number);
  return {
    min,
    max,
    total,
  };
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions
): Promise<Response<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = (await response.json()) as T;
  const range = parseRange(response.headers);
  return { result, range };
}

// Reviews API
export const reviewsApi = {
  getAll: () => {
    return fetchApi("/reviews", { method: "GET" });
  },
  find: (id: string) => fetchApi(`/reviews/${id}`, { method: "GET" }),
  create: (data: Review) =>
    fetchApi("/reviews", { method: "POST", body: data }),
  update: (id: string, data: Review) =>
    fetchApi(`/reviews/${id}`, { method: "PUT", body: data }),
  delete: (id: string) => fetchApi(`/reviews/${id}`, { method: "DELETE" }),
  purge: () => fetchApi("/reviews", { method: "DELETE" }),
};

// Products API
export const productsApi = {
  getAll: (
    page = 0,
    size = 30,
    filter?: string
  ): Promise<Response<Product[]>> => {
    const baseRange = [page * size, (page + 1) * size - 1];
    const filterParam = filter ? `&q=${filter}` : "";
    return fetchApi(
      `/products?rs=${baseRange[0]}&re=${baseRange[1]}${filterParam}`,
      {
        method: "GET",
      }
    );
  },
  find: (id: string): Promise<Response<Product>> =>
    fetchApi(`/products/${id}`, { method: "GET" }),
};

// Non-Games Products API
export const nonGamesProductsApi = {
  getAll: () => fetchApi("/ngproducts", { method: "GET" }),
  find: (id: string) => fetchApi(`/ngproducts/${id}`, { method: "GET" }),
  update: (id: string, data: Product) =>
    fetchApi(`/ngproducts/${id}`, { method: "PUT", body: data }),
  create: (data: Product) =>
    fetchApi("/ngproducts", { method: "POST", body: data }),
  delete: (id: string) => fetchApi(`/ngproducts/${id}`, { method: "DELETE" }),
};

// Games API
export const gamesApi = {
  getAll: (
    page = 0,
    size = 30,
    filter?: string
  ): Promise<Response<Product[]>> => {
    const baseRange = [page * size, (page + 1) * size - 1];
    const filterParam = filter ? `&q=${filter}` : "";
    return fetchApi(
      `/games?rs=${baseRange[0]}&re=${baseRange[1]}${filterParam}`,
      {
        method: "GET",
      }
    );
  },
  find: (id: string) => fetchApi(`/games/${id}`, { method: "GET" }),
  update: (id: string, data: Product) =>
    fetchApi(`/games/${id}`, { method: "PUT", body: data }),
  create: (data: Product) => fetchApi("/games", { method: "POST", body: data }),
  delete: (id: string) => fetchApi(`/games/${id}`, { method: "DELETE" }),
};
