# kookgereigids.nl – site

Astro-site, statisch. Een push naar `main` zet de site live via Cloudflare Pages. Artikelen: `src/content/blog/*.md`; gidsen: `src/hubs/*.md` + `src/pages/<naam>.astro`; producten: `src/data/producten.json`.

Schrijf of wijzig je inhoud, volg dan `redactie/README.md` (werkwijze, wave-systeem en `redactie/planning.md`, regels, onafhankelijke kwaliteitscontrole en publicatievoorwaarden) en `redactie/tone-of-voice.md` (schrijfstijl en SEO-richtlijnen, aantal foto's per lengte, toon en de enige toegestane persoonlijke feiten).

- Eerst `npm run build` laten slagen; nooit `.env` of sleutels committen.
- Sitetekst in het Nederlands, jij-vorm.
