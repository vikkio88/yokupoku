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
      let parsed: any;
      try {
        parsed = JSON.parse(value);
      } catch {
        return `Meta must be valid JSON.`;
      }

      if (typeof parsed !== "object" || parsed === null) {
        return `Meta must be a JSON object.`;
      }

      if (typeof parsed.device !== "string") {
        return `Meta.device must be a string.`;
      }

      if (!GAMES_STORES.includes(parsed.store)) {
        return `Meta.store must be one of: ${GAMES_STORES.join(", ")}`;
      }

      if (typeof parsed.played !== "number") {
        return `Meta.played must be a number.`;
      }

      if (parsed.edition !== null && typeof parsed.edition !== "string") {
        return `Meta.edition must be null or a string.`;
      }

      if (typeof parsed.refunded !== "boolean") {
        return `Meta.refunded must be a boolean.`;
      }

      if (typeof parsed.price !== "number") {
        return `Meta.price must be a number.`;
      }

      return true;
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

export const reviewValidators = {
  id: { required: true },
  slug: { required: true },
  productId: { required: true },
  deviceId: {},
  title: { required: true },
  subtitle: {},
  image: {
    required: true,
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    message: "Image must be a valid URL",
  },
  content: { required: true },
  pros: {},
  cons: {},
  tags: {
    pattern: /^[^,]+(,[^,]+)*$/,
    message: "Tags must be a comma-separated list of values",
  },
  rating: {
    validate: (value: number | string) =>
      value === "" ||
      (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 10) ||
      "Rating must be a number between 0 and 10",
  },
  bsi: {
    validate: (value: number | string) =>
      value === "" ||
      (!isNaN(Number(value)) && Number(value) >= 0) ||
      "BSI must be a positive number",
  },
  suggested: {},
  spoiler: {},
  published: {},
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
