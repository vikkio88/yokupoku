export const reviewValidators = {
  id: {},
  slug: {},
  productId: { required: true },
  deviceId: {},
  title: { required: true },
  subtitle: { required: true },
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
    valueAsNumber: true,
    validate: (value: number | null) => {
      if (value == null) return true;
      if (isNaN(value)) return "Rating must be a number";
      if (value < 0 || value > 100) return "Rating must be between 0 and 10";
      return true;
    },
  },
  bsi: {
    valueAsNumber: true,
    validate: (value: number | null) => {
      if (value == null) return true;
      if (isNaN(value)) return "BSI must be a number";
      if (value < 0 || value > 100) return "BSI must be between 0 and 10";
      return true;
    },
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
