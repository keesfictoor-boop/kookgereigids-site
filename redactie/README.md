# Redactie kookgereigids.nl – werkwijze voor de wekelijkse schrijfroutine

Deze map wordt niet gebouwd (Astro gebruikt alleen `src/` en `public/`). Hij bevat alles wat een schrijvende agent nodig heeft om zonder verdere context een nieuw artikel te maken.

## Bestanden

- `tone-of-voice.md`: toon en de **enige** toegestane persoonlijke feiten van de schrijver (Kees).
- `planning.md`: **de leidende werklijst**, in de volgorde van de waves (bouwlijst en architectuur). Neem steeds de eerste regel met status `open` waarvan de gids al klaar is.
- `briefs/`: per onderdeel een korte brief (zie 'Brief eerst').
- `onderwerpen.md`: vervallen (oude wachtrij); niet meer gebruiken.
- `logboek.md`: wat er per run gedaan is (onderwerp, bronnen, controle-uitslag, gepubliceerd of niet).
- `fotobronnen.md`: register van alle gebruikte foto's (Pixabay-id, fotograaf, pagina) en afgewezen foto's.

## Onderzoeksdata (privé-repo, alleen lezen)

De cloudroutine kloont ook de privé-repo `kookgereigids-project` (meestal naast deze repo, bijv. `../kookgereigids-project`; zoek anders met `ls ..`). Gebruik die als **bron**, schrijf er niet in:

- `seo-pijplijn/data/architecture.json`: welke vraag/spoke bij welke gids hoort, met zoekwoorden, volumes en geplande interne links (`link_graph`).
- `seo-pijplijn/data/questions.json` en `seo-pijplijn/data/universe.json`: vragen van zoekers, zoekwoorden per subonderwerp; `seo-pijplijn/data/raw/aio_per_question.json`: welke bronnen Google AI-overzichten citeren.
- `seo-pijplijn/data/runs/run-02/`: nieuwere run met ChatGPT-citaties per vraag.
- `seo-pijplijn/output/run-02/content/research/` en `output/run-02/wave3/research/`: al gecontroleerd onderzoek (PFAS, coatings, ECHA, prijzen, wokbronnen). Hergebruik die bronnen, maar open ze zelf opnieuw voordat je ze citeert.
- `seo-pijplijn/data/wetenschap/bronnen.json`: wetenschappelijke publicaties die al gebruikt en beoordeeld zijn.

Zoek het onderwerp in `architecture.json` (op slug of hoofdvraag) en neem de bijbehorende vragen en zoekwoorden mee in je opbouw. Ontbreekt de repo, ga dan door met de zoekwoorden in `planning.md` en meld dat in het logboek.

## Vaste regels (niet onderhandelbaar)

1. **Eerlijk.** Geen aannames als feit. Onderscheid gecontroleerd, schatting en onbekend. Ontbreekt onderbouwing, laat de bewering weg.
2. **Nooit "wij hebben getest"** of iets dat op eigen tests lijkt. We testen geen pannen.
3. **Geen verzonnen ervaringen of anekdotes** van Kees of zijn gezin. Alleen de feiten uit `tone-of-voice.md`.
4. **Gezondheidsclaims** (PFAS, coatings, nikkel, hitte, voedingswaarde): alleen met officiële bron (Voedingscentrum, RIVM, EFSA, Rijksoverheid, BfR) en/of peer-reviewed onderzoek (PubMed, Europe PMC, ScienceDirect, Google Scholar, Semantic Scholar, CORE). Open elke bron zelf. Geen grapjes in die passages. Geen conclusies over een specifiek product uit onderzoek naar alleen een materiaal of een labsituatie. Geen preprints als bewijs.
5. **Geen controledatums** in de sitetekst ("gecontroleerd op …"). Prijzen niet als exact bedrag in de lopende tekst; liever een bandbreedte.
6. **Sitetekst in de jij-vorm.**
7. **Geen sauna- of wellnessonderwerpen.**
8. **Consumentenbond:** alleen openbare informatie, met bron; testuitslagen achter de betaalmuur niet overnemen.
9. **Merken:** partnermerken niet bevoordelen (zie ook de productregels bij 'Een artikel maken', stap 3); kies producten op spreiding van materiaal en prijs en op openbare productinformatie.
10. **Geen geheimen** in commits of logs (de Pixabay-sleutel staat alleen als omgevingsvariabele `PIXABAY_API_KEY`).

## Het wave-systeem

- **Volgorde:** `planning.md` volgt de bouwlijst (`build-list.json`): eerst wave 2, dan wave 3, per gids eerst de gids en dan de artikelen eronder. Wijk daar niet van af, behalve:
  - **Afhankelijkheid:** een artikel (spoke) pas als zijn gids gepubliceerd is (`depends_on` in de bouwlijst). Is de gids nog niet klaar, neem dan de gids zelf.
  - **Bestaat al:** staat het onderwerp al (grotendeels) op de site, zet de status op `afgedekt door <url>` en neem de volgende regel.
- **Zoekwoorden en vragen:** zoek de regel op in `architecture.json` (op `spoke_slug` of `hub_slug`). Gebruik `primary_question`, `question_cluster` en `keywords` voor de opbouw; de primaire vraag wordt de H1 of een vroege H2 met een direct antwoord.
- **Interne links volgens de architectuur:** neem de links uit `link_graph` over: elk artikel linkt naar zijn gids (`spoke_to_hub`) en naar de broertjes die `spoke_spoke_links` noemt, als die al bestaan. Een nieuwe gids linkt naar al zijn bestaande artikelen; in die artikelen voeg je één link terug naar de gids toe (dat mag, ook al zijn het bestaande pagina's).
- **Samenvoegen:** sommige koopgidsen in de bouwlijst zijn varianten (bijv. "klein of groot formaat", "elektrisch"). Zou een aparte pagina grotendeels herhalen wat in de gids of een ander artikel staat, maak dan geen aparte pagina maar voeg een korte, bruikbare sectie toe aan de gids. Status: `samengevoegd in <url>`. Ook dat gaat langs de onafhankelijke controle.
- **Brief eerst:** schrijf vóór het artikel een korte brief in `redactie/briefs/<actie-id>-<slug>.md` (doelgroep, primaire vraag, vragencluster, zoekwoorden, opbouw met H2's, interne links, bronnen die je gaat gebruiken), naar het voorbeeld van `kookgereigids-project/seo-pijplijn/output/run-02/wave3/wokpan.md`. Het artikel volgt de brief.

## Een gids maken (type 'gids')

- Tekst in `src/hubs/<slug>.md` (frontmatter zoals `src/hubs/wokpan.md`: title, description, intro, updatedDate, readingTime, image + bronvelden, producten).
- Pagina: kopieer `src/pages/wokpan.astro` naar `src/pages/<slug>.astro` en pas aan: het importpad van de hub, de lijst `spokes` (slugs van bestaande artikelen onder deze gids), het broodkruimelpad, de tag en de koppen in de zijbalk.
- Een gids is breed: het korte antwoord bovenaan, keuzecriteria, een materiaal- of soortentabel, maat, kookplaat, onderhoud en (alleen als het mag, zie stap 3 hieronder) een productblok, met doorverwijzingen naar de artikelen eronder. Lengte 1800–2500 woorden.
- Voeg de gids toe waar hij hoort: de categoriekaart op de homepage (`src/pages/index.astro`) en `src/pages/koopadvies.astro` mogen een link naar de nieuwe gids krijgen (alleen die link aanpassen).

## Een artikel maken

1. **Onderwerp** uit `planning.md` (zie 'Het wave-systeem'). Controleer met `ls src/content/blog src/hubs` dat het niet al bestaat.
2. **Onderzoek** met WebSearch/WebFetch. Kijk wat Nederlandse zoekers vragen (de vragen in de wachtrij, "Mensen vragen ook" als je die vindt). Noteer per bewering de bron (URL) die je zelf geopend hebt.
3. **Producten** (alleen bij koopgidsen, en alleen als het mag): **Productverwijzingen (besluit eigenaar 29-10-2026):** (1) verwijs alleen naar producten bij winkels waarmee we een affiliateprogramma hebben (later via Daisycon, na goedkeuring) of naar bol.com of Amazon.nl; geen links naar andere winkels of productpagina's van fabrikanten. (2) Maak alleen een productoverzicht als er van elk product een foto geplaatst kan worden die we mogen gebruiken. Kan dat niet, dan geen productblok en geen tekst als 'hieronder staan…'; beschrijf dan soorten pannen en waar je op let, zonder specifieke producten aan te wijzen. De code dwingt dit af: `src/lib/affiliate.ts` toont alleen producten van winkels met `toegestaan: true` in `affiliate.json` én met een `afbeelding`. Op dit moment heeft geen enkel product een toegestane foto, en bol.com blokkeert automatische controle; maak daarom **geen** productblok en noem geen specifieke producten als koopadvies, tot de eigenaar meldt dat productfoto's (via het partnerprogramma) beschikbaar zijn.
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
- Zet in `planning.md` de status op `gepubliceerd (<datum>): <url>`, `concept (<reden>)`, `afgedekt door <url>` of `samengevoegd in <url>`, en vul `logboek.md` aan met het actie-id (bijv. H3.S03). Commit de brief, de planning en het logboek mee.
