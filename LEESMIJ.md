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

- `src/pages/` — de pagina's. De bestandsnaam bepaalt de URL (`over-ons.astro` → `/over-ons/`).
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
<div class="notice"><h3>Titel</h3><p>Tekst met een <a href="/keuzehulp/">link</a>.</p></div>
```

De nieuwste drie artikelen verschijnen automatisch in de slider op de homepage; alle artikelen staan op `/blog/` en in de sitemap.

## Foto's ophalen (Pixabay, of Pexels)

Eenmalig: kopieer `.env.example` naar `.env` en vul `PIXABAY_API_KEY=` in (sleutel staat na inloggen op https://pixabay.com/api/docs/). `.env` wordt nooit gecommit. Met een `PEXELS_API_KEY` kun je ook Pexels gebruiken (`--bron pexels`); Pexels gaf in oktober 2026 geen nieuwe sleutels uit.

```bash
npm run foto -- zoek "gietijzeren pan"
npm run foto -- haal 6660803 gietijzeren-pan --alt "Biefstuk met rozemarijn in een gietijzeren pan" --artikel set-of-los
```

`zoek` toont id, fotograaf, trefwoorden en link (Nederlandse zoektermen werken bij Pixabay). `haal` downloadt de foto (Pixabay: max. 1280 px breed) naar `public/assets/` en zet `image`, `imageAlt`, `imageCredit`, `imageCreditUrl`, `imageSourceUrl` en `imageSource` in het artikel. Een Nederlandse alt-tekst (`--alt`) is verplicht. De site toont de fotograaf onder het artikel en in de bronnenlijst op `/blog/`.

Controleer elke foto via de link voordat je hem ophaalt:
- geen AI-beeld (uploaders moeten AI-beelden bij Pixabay als zodanig aanmerken; kijk daarom op de fotopagina, want de API kan ze niet uitfilteren);
- geen herkenbare merken of logo's, en niets wat suggereert dat iemand ons aanbeveelt;
- een stockfoto is een sfeerbeeld, nooit een eigen producttest.

Pixabay-voorwaarden (oktober 2026): gratis, ook commercieel, naamsvermelding niet verplicht; niet los doorverkopen; geen massale of systematische downloads; zoekresultaten 24 uur cachen (het script doet dat in `.cache/`). Pixabay garandeert niet dat er model- of eigendomsreleases zijn: die verantwoordelijkheid ligt bij jou.

## Foto's en lettertypen

- cooking.jpg: Rick Barrett / Ambitious Studio — https://unsplash.com/photos/tXfAH4ixIKk
- kitchen.jpg: Dane Deaner — https://unsplash.com/photos/d9qnD33cBJs
- skillet.jpg: Max Griss — https://unsplash.com/photos/B3b8dsSfoqg
- Fotolicentie: https://unsplash.com/license
- Lettertypen: Lora en Open Sans (lokaal geladen); de OFL-licenties staan in `public/assets/`.
