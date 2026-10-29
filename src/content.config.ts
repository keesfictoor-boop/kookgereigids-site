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
    // Bronvermelding voor stockfoto's (vult scripts/foto.mjs automatisch in)
    imageCredit: z.string().optional(),
    imageCreditUrl: z.url().optional(),
    imageSourceUrl: z.url().optional(),
    imageSource: z.enum(['Pixabay', 'Pexels']).optional(),
    readingTime: z.number().int().positive(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    intro: z.string(),
    draft: z.boolean().default(false),
    // Producten uit src/data/producten.json die onder het artikel als productblok verschijnen
    producten: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
