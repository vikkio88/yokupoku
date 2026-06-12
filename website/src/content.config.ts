import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.string(),
    subtitle: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.string().default(""),
    draft: z.boolean().optional(),
  }),
});

export const collections = { posts };
