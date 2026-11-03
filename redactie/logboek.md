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

## 02-11-2026 – pannenset-rvs (H1.S08, lokale sessie op verzoek eigenaar)

- **Onderwerp:** beste RVS-pannenset. Slug `pannenset-rvs`, URL: /blog/pannenset-rvs/
- **Planning:** H2 (gids Pannen voor inductie) op 'afgedekt door /blog/pannen-inductie/' gezet: die pagina en pannenset-inductie-pfas-vrij dekken de vragen van de gids. H1.S08 was daarmee de eerste open regel.
- **Bronnen:** zie redactie/briefs/H1.S08-pannenset-rvs.md.
- **Producten:** Demeyere Comfort 3 toegevoegd (demeyere-comfort3-5). `ververs`: demeyere-classico3-5 had geen aanbod meer en verdwijnt uit de blokken en de kaart op set-of-los; de tekst over die set op set-of-los, hoeveel-uitgeven en /pannensets/ is niet aangepast.
- **Foto's:** 2383332, 5342898, 2474181. Afgewezen staat in fotobronnen.md.
- **Interne links toegevoegd in:** /pannensets/ en hoeveel-uitgeven-aan-een-pannenset.
- BRON: doi=10.2903/j.efsa.2020.6268 | artikel=pannenset-rvs | toegang=volledige_tekst | claim=Nikkelafgifte uit RVS van goede kwaliteit is waarschijnlijk klein ten opzichte van nikkel in voeding; nikkelgevoelige mensen zijn de gevoeligste groep.
- **Controle:** ronde 1 AFGEKEURD (2 moet: "eten veel soep" ging verder dan de toegestane feiten; koele WMF-grepen gelden niet in de oven; natuurlijkheid 8,5). Ronde 2 AFGEKEURD (1 moet: aantal deksels BK Q-linair stelliger dan de bron; natuurlijkheid 8). Ronde 3 AFGEKEURD (2 moet: "in de regel niet magnetisch" ging verder dan de bronnen; productkaart Tefal noemde vier kookpannen met deksel; natuurlijkheid 8).
- **Uitslag:** niet gepubliceerd. Na 3 rondes afgekeurd, dus volgens de regels concept: branch `concept/pannenset-rvs`. De moet-punten en de meeste beter-punten uit ronde 3 zijn daarna op de branch verwerkt, maar niet meer onafhankelijk gecontroleerd.
- **Op de branch ook:** tekst productkaart Tefal Duetto+ verbeterd in producten.json (staat ook op basis-pannen, hoeveel-uitgeven en set-of-los) en demeyere-classico3-5 uit de blokken. Deze twee raken bestaande pagina's en wachten dus op akkoord eigenaar.
- **Te doen voor de eigenaar:** kiezen tussen een vierde controle gevolgd door publicatie, of zelf nalezen en mergen. Daarnaast: "RVS bevat nikkel" op /pannensets/ en pannenset-inductie-pfas-vrij is volgens de controle te absoluut; op de branch staat in het nieuwe artikel "RVS-pannen bevatten vaak nikkel".
- **Vervolg 02-11-2026:** op verzoek van de eigenaar gepubliceerd zoals het op de branch stond, zonder vierde controle (merge naar `main`). De eigenaar vroeg ook om een iets minder strenge controle; zie de README, sectie Onafhankelijke kwaliteitscontrole.

## 03-11-2026 – pannen-langst-mee (H1.S03, lokale sessie op verzoek eigenaar)

- **Onderwerp:** Welke pannen gaan het langst mee? Slug `pannen-langst-mee`, URL: /blog/pannen-langst-mee/
- **Bronnen:** zie redactie/briefs/H1.S03-pannen-langst-mee.md. Masterchef-vraag uit het cluster niet behandeld: geen controleerbare bron.
- **Producten:** geen productblok; twee kaarten met bestaande producten (bk-profiline-5, debuyer-mineralb-koekenpan-24). Verbinding bol getest: werkt.
- **Foto's:** 4813261, 3238173, 934905.
- **Interne links toegevoegd in:** hoeveel-uitgeven-aan-een-pannenset en koekenpan-kiezen.
- BRON: doi=10.1007/s11998-022-00611-3 | artikel=pannen-langst-mee | toegang=volledige_tekst | claim=Een keramische (sol-gel) antiaanbaklaag verliest na slijtage en vaatwasserbeurten sneller zijn antiaanbakwerking dan PTFE en is brosser.
- **Controle:** ronde 1 GOEDGEKEURD (0 moet; natuurlijkheid 8). Alle bronnen geopend, ook de pdf van de Buyer en de volledige tekst van het wetenschappelijke artikel.
- **Uitslag:** gepubliceerd op `main` zoals beoordeeld.
- **Beter-punten (niet verwerkt):** (1) 'bij alle merken' buiten garantie: Le Creuset noemt alleen normale slijtage en verkeerd gebruik, beter 'bij deze merken'; (2) 'een paar jaar geleden' → 'zo'n tien jaar geleden' (bron); (3) Demeyere 'goedkopere lijnen' → 'de lijnen Classic 3 en Resto 3'; (4) zin over 'wat er loskomt in het eten van mijn kinderen' licht suggestief, eventueel neutraler; (5) alt-tekst emaillefoto: of het geëmailleerd gietijzer is, is niet te zien (mogelijk aardewerk), beter 'Kleine oranjerode pan met deksel op een houten tafel'; (6) 'de laag laat minder lang goed los' kan als afbladderen gelezen worden, beter 'eten laat er minder lang goed los' (ook in de tabel).
