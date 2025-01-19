export const GAMES_STORES = [
  "steam",
  "gog",
  "origin",
  "epic",
  "battle.net",
  "ubi",
  "itch.io",
  "nintendo:eshop",
  "playstation:store",
  "xbox:store",
  // used for slug
  "other",
  "physicalsupport",
  "amazon",
  "amazon:used",
] as const;

export const PRODUCT_TYPES = {
  GAME: "game",
  MOVIE: "movie",
  BOOK: "book",
  TV: "tv",
  MUSIC: "music",
  COMIC_BOOK: "comic_book",
  OTHER: "other",
};

export const productValidators = {
  id: { required: true },
  type: {
    required: true,
    validate: (value: string) =>
      Object.values(PRODUCT_TYPES).includes(value) ||
      `Type must be one of: ${Object.values(PRODUCT_TYPES).join(", ")}`,
  },
  meta: {
    required: true,
    validate: (value: string) => {
      try {
        const parsed = JSON.parse(value);
        return (typeof parsed.device === "string" &&
          GAMES_STORES.includes(
            parsed.store as (typeof GAMES_STORES)[number]
          ) &&
          typeof parsed.played === "number" &&
          (parsed.edition === null || typeof parsed.edition === "string") &&
          typeof parsed.refunded === "boolean" &&
          typeof parsed.price === "number") as boolean;
      } catch {
        return `Meta must be a valid JSON with the required structure and store must be one of: ${GAMES_STORES.join(
          ", "
        )}`;
      }
    },
  },
  name: { required: true },
  genre: {},
  tags: {
    pattern: /^[^,]+(,[^,]+)*$/,
    message: "Tags must be a comma-separated list of values",
  },
  links: {
    pattern:
      /^((https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?)(,((https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?))*$/,
    message:
      "Links must be a valid URL or a comma-separated list of valid URLs",
  },
  notes: {},
  slug: { required: true },
  image: {
    required: true,
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    message: "Image must be a valid URL",
  },
  released: {},
  consumed: {},
  createdAt: {
    required: true,
    validate: (value: string) =>
      !isNaN(Date.parse(value)) ||
      "Created At must be a valid date or parseable string",
  },
  updatedAt: {
    required: true,
    validate: (value: string) =>
      !isNaN(Date.parse(value)) ||
      "Updated At must be a valid date or parseable string",
  },
};
