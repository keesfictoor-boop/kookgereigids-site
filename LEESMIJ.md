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
- `src/components/` — blogkaart en `Head.astro` (gedeelde kop van alle pagina's).
- `src/layouts/Home.astro` en `public/home.css` — eigen opmaak van de homepagina (ontwerp versie 6). De andere pagina's gebruiken `Base.astro` en `styles.css`.
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

Alle artikelen staan automatisch op `/blog/` en in de sitemap. De drie gidsen op de homepage staan vast in `src/pages/index.astro`; nieuwe artikelen verschijnen daar niet vanzelf.

## Zelf tekst aanpassen (redactie)

Dubbelklik op **`Redactie starten.bat`** in de projectmap, of typ in `site/`:

```bash
npm run redactie
```

De editor opent in je browser op http://localhost:4400:

- **Links** kies je een pagina: artikelen, gidsen (zoals Pannenset kiezen) en de vaste pagina's.
- **In het midden** pas je de tekst aan. Opslaan met de knop of **Ctrl+S**. In het vak erboven kun je een korte opmerking voor Claude typen.
- **Rechts** zie je de pagina zoals hij op de site komt. Het voorbeeld ververst na het opslaan vanzelf.

Bij opslaan gebeurt dit:

1. Het bestand wordt bijgewerkt.
2. De wijziging wordt als woord-diff (`[-oud-]` en `{+nieuw+}`) toegevoegd aan `seo-pijplijn/redactie/wijzigingen.md`, samen met je opmerking.
3. Bij je volgende bericht aan Claude krijgt Claude die nieuwe wijzigingen automatisch te zien, via een hook in `.claude/settings.json`.

**Waar je op let:**

- **Artikelen en gidsen (Markdown):**
  - Laat het blok bovenaan tussen de twee regels `---` heel. Daar staan de titel, de beschrijving en de intro tussen aanhalingstekens.
  - `##` maakt een kopje, `**tekst**` maakt tekst vet, en een link schrijf je als `[linktekst](/adres/)`.
  - De editor weigert op te slaan als het blok bovenaan beschadigd is.
- **Vaste pagina's (HTML):**
  - Verander alleen de leesbare tekst tussen de tags.
  - De editor weigert op te slaan als het aantal tekens `<`, `>`, `{` of `}` verandert.

Er wordt niets gepubliceerd. Publiceren gaat pas via een push, na akkoord.

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
