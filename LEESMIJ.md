# Kookgereigids — website (Astro)

Statische site voor kookgereigids.nl, gebouwd met [Astro](https://astro.build) en gehost op Cloudflare Pages. Elke push naar `main` bouwt en publiceert de site automatisch.

## Lokaal werken

```bash
npm install
npm run dev      # ontwikkelserver op http://localhost:4321
npm run build    # bouwt de site naar dist/
npm run preview  # bekijk de gebouwde site
```

Node.js 22.23 of nieuwer is nodig (zie `.node-version`).

## Mappen

- `src/pages/` — de pagina's. De bestandsnaam bepaalt de URL (`about.astro` → `/about/`).
- `src/layouts/Base.astro` — gedeelde `<head>`, header en footer, canonical, Open Graph en JSON-LD.
- `src/content/blog/` — blogartikelen als Markdown.
- `src/components/` — blogkaart en homepage-slider (vullen zich automatisch met de nieuwste artikelen).
- `public/` — bestanden die ongewijzigd worden meegeleverd: `styles.css`, foto's en lettertypen in `assets/`, `robots.txt`, `_redirects`.

## Een blogartikel toevoegen

Maak een nieuw bestand in `src/content/blog/`, bijvoorbeeld `koekenpan-kiezen.md`. De bestandsnaam wordt de URL: `/blog/koekenpan-kiezen/`.

```markdown
---
title: "Welke koekenpan past bij jou?"
description: "Korte samenvatting voor de blogkaart en zoekmachines."
category: "Koekenpannen"
image: "/assets/skillet.jpg"
imageAlt: "Beschrijving van de foto"
readingTime: 4
pubDate: "2026-11-03"
intro: "De openingsalinea, groot weergegeven boven het artikel."
---

### Tussenkop

Tekst van het artikel in Markdown.
```

Optioneel: `tagWarm: true` (warme labelkleur), `updatedDate`, en `draft: true` om een artikel te verbergen. Artikelen met een `pubDate` in de toekomst verschijnen pas bij de eerste build op of na die datum.

Een notitieblok maak je met HTML in het Markdown-bestand:

```html
<div class="notice"><h3>Titel</h3><p>Tekst met een <a href="/portfolio/">link</a>.</p></div>
```

De nieuwste drie artikelen verschijnen automatisch in de slider op de homepage; alle artikelen staan op `/blog/` en in de sitemap.

## Foto's en lettertypen

- cooking.jpg: Rick Barrett / Ambitious Studio — https://unsplash.com/photos/tXfAH4ixIKk
- kitchen.jpg: Dane Deaner — https://unsplash.com/photos/d9qnD33cBJs
- skillet.jpg: Max Griss — https://unsplash.com/photos/B3b8dsSfoqg
- Fotolicentie: https://unsplash.com/license
- Lettertypen: Lora en Open Sans (lokaal geladen); de OFL-licenties staan in `public/assets/`.
