# Logboek wekelijkse schrijfroutine

Per run: datum, onderwerp en slug, gebruikte bronnen (kort), aantal controlerondes en uitslag (moet-punten, natuurlijkheid), gepubliceerd op `main` of als concept-branch, en bijzonderheden (bijv. Pixabay niet bereikbaar).

## Eerder gepubliceerd (handmatig, oktober 2026)

- Pannensets: /pannensets/, set-of-los, hoeveel-uitgeven-aan-een-pannenset, pannenset-inductie-pfas-vrij
- Basis: basis-pannen, pannen-inductie
- Woks: /wokpan/, wokpan-inductie, wok-inbranden, roerbakken

## 29-10-2026 – koekenpan-kiezen (koopgids)

- **Onderwerp:** Welke koekenpan past bij jou? Slug `koekenpan-kiezen`, URL na publicatie: /blog/koekenpan-kiezen/
- **Bronnen (zelf geopend):** Zwilling/Demeyere-koopgids koekenpannen; Rijksoverheid (PFAS in antiaanbakpan); Voedingscentrum (PFAS); BfR (PTFE); Consumentenbond /koekenpan (alleen openbare introtekst) en /inductiekookplaat/inductie-pannen; De Buyer-gebruiksaanwijzing (pdf); Lodge (seasoning).
- **Producten (5):** Tefal Duetto On 28 (RVS), Demeyere Industry 5 28 (RVS), Tefal Experience Ceram 28 (keramisch), de Buyer Mineral B Element 28 (plaatstaal), Petromax FP30-T (gietijzer). Geen bol.com: bol.com weigert automatische toegang (HTTP 403), dus de productpagina's waren daar niet te openen. Daarom gekozen voor fabrikant- en winkelpagina's die wel te controleren zijn (Tefal, Zwilling, Meesterslijpers, Knivesandtools); winkellabels toegevoegd in `src/data/affiliate.json`. Geen PTFE-pan opgenomen; dat staat in de tekst.
- **Foto's:** Pixabay werkte. 3766548, 2618192, 1694991; afgewezen 2969649 (merknaam op snijplank).
- **Interne links toegevoegd in:** basis-pannen, set-of-los.
- **Controle:** ronde 1 AFGEKEURD (1 moet: prijsbandbreedte "bijna €200" klopte niet; natuurlijkheid 8). Ronde 2 GOEDGEKEURD (0 moet; 8). Daarna kleine beter-punten verwerkt, dus opnieuw laten controleren: ronde 3 AFGEKEURD (1 moet: "de maat op de doos is de bovenrand" was gegeneraliseerd uit een bron die alleen over Demeyere gaat; natuurlijkheid 8).
- **Uitslag:** niet gepubliceerd. Na 3 rondes was de laatste uitslag afgekeurd, dus volgens de regels concept. Het moet-punt uit ronde 3 is daarna op de branch wel verwerkt, maar niet meer onafhankelijk gecontroleerd. Branch: `concept/koekenpan-kiezen`. Te doen voor de eigenaar: tekst nalezen en mergen naar `main`, of een volgende run laten hercontroleren.
- **Vervolg 29-10-2026 (lokale sessie):** ronde 4 door een nieuwe onafhankelijke agent: GOEDGEKEURD (0 moet; natuurlijkheid 8). Op verzoek van de eigenaar gepubliceerd zoals het is (merge naar `main`). **Verbeterpunten voor later** (niet verwerkt): (1) Ceraforce-uitspraak van Demeyere niet veralgemenen naar alle keramische lagen; (2) Consumentenbond: "kwaliteit verschilt sterk per pan" i.p.v. per laag, eventueel 'alle geteste keramische pannen zonder PFAS'; (3) onderhoud in de tabel ('met de hand', 'geen metalen spatel') onderbouwen of 'volg de fabrikant'; (4) 'soorten waar normaal geen PTFE in zit' herformuleren naar materialen zonder coating; (5) uitleggen waarom er geen PTFE-pan in het overzicht staat, of er één toevoegen; (6) gietijzer 'houdt warmte lang vast' / plaatstaal 'lichter' onderbouwen of afzwakken; (7) 'Mijn tip' bij opbergen → 'Een simpele oplossing'; (8) bronverwijzingen variëren (Zwilling 6x), iets meer luchtigheid of een korte persoonlijke noot.
