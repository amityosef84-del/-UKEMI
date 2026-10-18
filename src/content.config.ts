import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per board in src/content/products. The file name becomes the URL slug.
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      kanji: z.string().optional(),
      meaning: z.string().optional(),
      tagline: z.string(),
      summary: z.string(),
      level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
      order: z.number().default(0),
      featured: z.boolean().default(false),
      nail: z.object({
        material: z.enum(['Copper', 'Steel', 'Brass']),
        spacing: z.string(),
        count: z.string(),
      }),
      wood: z.string(),
      finish: z.enum(['charcoal', 'ash', 'smoked']).default('charcoal'),
      dimensions: z.string(),
      weight: z.string(),
      highlights: z.array(z.string()).default([]),
      inTheBox: z.array(z.string()).default([]),
      // Nail grid for the generated illustration (used until product photos exist).
      grid: z.object({ cols: z.number().int(), rows: z.number().int() }),
      // Product photos — paths relative to the Markdown file, e.g. ../../assets/products/kihon-1.jpg
      images: z.array(image()).default([]),
      // Optional external "where to buy" link for this board.
      buyUrl: z.url().optional(),
    }),
});

export const collections = { products };
