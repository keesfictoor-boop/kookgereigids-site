# Redactie kookgereigids.nl – werkwijze voor de wekelijkse schrijfroutine

Deze map wordt niet gebouwd (Astro gebruikt alleen `src/` en `public/`). Hij bevat alles wat een schrijvende agent nodig heeft om zonder verdere context een nieuw artikel te maken.

## Bestanden

- `tone-of-voice.md`: toon en de **enige** toegestane persoonlijke feiten van de schrijver (Kees).
- `onderwerpen.md`: de wachtrij. Neem steeds het eerste onderwerp met status `open`.
- `logboek.md`: wat er per run gedaan is (onderwerp, bronnen, controle-uitslag, gepubliceerd of niet).
- `fotobronnen.md`: register van alle gebruikte foto's (Pixabay-id, fotograaf, pagina) en afgewezen foto's.

## Vaste regels (niet onderhandelbaar)

1. **Eerlijk.** Geen aannames als feit. Onderscheid gecontroleerd, schatting en onbekend. Ontbreekt onderbouwing, laat de bewering weg.
2. **Nooit "wij hebben getest"** of iets dat op eigen tests lijkt. We testen geen pannen.
3. **Geen verzonnen ervaringen of anekdotes** van Kees of zijn gezin. Alleen de feiten uit `tone-of-voice.md`.
4. **Gezondheidsclaims** (PFAS, coatings, nikkel, hitte, voedingswaarde): alleen met officiële bron (Voedingscentrum, RIVM, EFSA, Rijksoverheid, BfR) en/of peer-reviewed onderzoek (PubMed, Europe PMC, ScienceDirect, Google Scholar, Semantic Scholar, CORE). Open elke bron zelf. Geen grapjes in die passages. Geen conclusies over een specifiek product uit onderzoek naar alleen een materiaal of een labsituatie. Geen preprints als bewijs.
5. **Geen controledatums** in de sitetekst ("gecontroleerd op …"). Prijzen niet als exact bedrag in de lopende tekst; liever een bandbreedte.
6. **Sitetekst in de jij-vorm.**
7. **Geen sauna- of wellnessonderwerpen.**
8. **Consumentenbond:** alleen openbare informatie, met bron; testuitslagen achter de betaalmuur niet overnemen.
9. **Merken:** partnermerken niet bevoordelen; kies producten op spreiding van materiaal en prijs en op openbare productinformatie.
10. **Geen geheimen** in commits of logs (de Pixabay-sleutel staat alleen als omgevingsvariabele `PIXABAY_API_KEY`).

## Een artikel maken

1. **Onderwerp** uit `onderwerpen.md`. Controleer met `ls src/content/blog src/hubs` dat het niet al bestaat; anders volgende onderwerp.
2. **Onderzoek** met WebSearch/WebFetch. Kijk wat Nederlandse zoekers vragen (de vragen in de wachtrij, "Mensen vragen ook" als je die vindt). Noteer per bewering de bron (URL) die je zelf geopend hebt.
3. **Producten** (bij koopgidsen): 4–6 producten, verspreid over materiaal en prijs, bij voorkeur op bol.com. Open elke productpagina en neem alleen gegevens over die er staan. Voeg ze toe aan `src/data/producten.json` (zelfde vorm als de bestaande items; `afbeelding: null`, winkel `bol`, schone URL zonder trackingparameters) en zet de id's in de frontmatter onder `producten`. Geen productfoto's van winkels kopiëren.
4. **Schrijven** in `src/content/blog/<slug>.md`. Frontmatter zoals de bestaande artikelen (`title`, `description` (max ±160 tekens), `category`, `image`, `imageAlt`, `readingTime`, `pubDate` (vandaag), `intro`, optioneel `producten`). De `intro` geeft meteen het korte antwoord (2–3 zinnen, citeerbaar). Lengte: 1000–1800 woorden, afhankelijk van de vraag. Bronnen als Markdown-links in de tekst. Gebruik tabellen en genummerde stappen waar dat helpt.
5. **Interne links:** minstens 2 links naar bestaande pagina's (zie `src/content/blog/`, `/pannensets/`, `/wokpan/`, `/keuzehulp/`, `/koopadvies/`), en voeg in 1 of 2 bestaande, passende artikelen een natuurlijke link naar het nieuwe artikel toe. Herschrijf bestaande pagina's verder niet.
6. **Foto's:** 3 per artikel, van Pixabay:
   - zoeken: `npm run foto -- zoek "<term>"`
   - ophalen: `npm run foto -- haal <id> <bestandsnaam> --alt "Nederlandse alt-tekst"` (met `--artikel <slug>` voor de hoofdfoto: dat vult de frontmatter).
   - Bekijk elke foto voordat je hem gebruikt (Read op het jpg-bestand): **geen merknamen, logo's of leesbare tekst, geen herkenbare personen, geen AI-gegenereerd beeld** (let op de Pixabay-tags "ai gegenereerd"). Gebruik geen id die al in `fotobronnen.md` staat.
   - De twee extra foto's als Markdown-afbeelding onder een kop: `![alt](/assets/<naam>.jpg)`.
   - Registreer elke foto (en afgewezen kandidaten) in `fotobronnen.md`.
   - Geen zichtbare fotobronvermelding in de tekst.
   - Werkt Pixabay niet (geen sleutel, foutmelding), gebruik dan bestaande foto's uit `public/assets/` die passen, en meld dat in het logboek.
7. **Build en links:** `npm ci` (eenmalig per run) en `npm run build` moeten slagen. Controleer daarna dat alle interne `href="/…"` en `src="/assets/…"` in `dist/` bestaan.

## Onafhankelijke kwaliteitscontrole (verplicht vóór publicatie)

Start een **aparte agent** (Agent-tool, nieuwe agent zonder jouw context) met de opdracht het artikel te beoordelen. Geef alleen de bestandspaden, deze README en `tone-of-voice.md`, niet je eigen redenering. De controleur:

1. opent **elke** bronlink en kijkt of de bron de bewering echt steunt (niet overdreven);
2. markeert feitelijke beweringen zonder bron;
3. controleert productgegevens tegen de productpagina's;
4. controleert de persoonlijke feiten tegen `tone-of-voice.md` (niets verzonnen) en dat er niets op eigen testen lijkt;
5. beoordeelt of de tekst **natuurlijk en menselijk** leest en niet als AI-tekst voelt. Signalen van AI-tekst: holle openingszinnen ("In de wereld van…", "Of je nu… of…"), "Kortom"/"Al met al", veel opsommingen van precies drie, woorden als "essentieel", "cruciaal", "naadloos", "duik in", overdreven enthousiasme, elke alinea even lang, herhaling van de vraag, retorische vragen achter elkaar, Engelse zinsbouw, veel gedachtestreepjes;
6. geeft per punt een ernst: **moet** (fout, bron steunt het niet, veiligheid/gezondheid, verzonnen persoonlijk detail), **beter**, of **ok**, plus een cijfer 1–10 voor natuurlijkheid;
7. eindigt met een oordeel: **GOEDGEKEURD** (geen moet-punten en natuurlijkheid ≥ 8) of **AFGEKEURD**.

Verwerk alle moet-punten en de zinvolle beter-punten. Na aanpassingen laat je een **nieuwe** onafhankelijke agent de herziene versie opnieuw beoordelen (maximaal 3 rondes).

## Publiceren

- **GOEDGEKEURD en build geslaagd:** commit op `main` en push. Een push naar `main` zet de site automatisch live (Cloudflare Pages). Commitbericht in het Nederlands, eindigend met de regel `Co-Authored-By: Claude <noreply@anthropic.com>`.
- **Na 3 rondes nog AFGEKEURD:** niet op `main`. Push naar een branch `concept/<slug>` en schrijf in het logboek waarom.
- Zet in `onderwerpen.md` de status op `gepubliceerd (<datum>)` of `concept (<reden>)`, en vul `logboek.md` aan. Commit die wijzigingen mee.
