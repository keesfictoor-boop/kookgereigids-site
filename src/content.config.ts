import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Elk blogartikel is een Markdown-bestand in src/content/blog/. De bestandsnaam wordt de URL: /blog/<bestandsnaam>/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tagWarm: z.boolean().default(false),
    image: z.string(),
    imageAlt: z.string(),
    readingTime: z.number().int().positive(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    intro: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
