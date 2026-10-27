import { getCollection } from 'astro:content';

// Gepubliceerde artikelen, nieuwste eerst. Concepten (draft: true) en artikelen met een datum in de toekomst blijven verborgen.
export async function getPosts() {
  const now = new Date();
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.pubDate <= now);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id));
}
