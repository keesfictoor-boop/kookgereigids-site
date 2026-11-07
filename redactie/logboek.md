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

## 03-11-2026 – beste-pannenmerken (H1.S06, lokale sessie op verzoek eigenaar)

- **Onderwerp:** Welke pannenmerken zijn het beste in Nederland? Slug `beste-pannenmerken`, URL: /blog/beste-pannenmerken/
- **Bronnen:** zie redactie/briefs/H1.S06-beste-pannenmerken.md. Masterchef niet behandeld (geen bron voor de Nederlandse uitzending). Geen onafhankelijke openbare test van Action-pannen gevonden; behandeld als waar je op let plus wettelijke garantie.
- **Producten:** geen productblok; twee kaarten met bestaande producten (demeyere-comfort3-5, bk-universe-koekenpan-24).
- **Foto's:** 8031137, 8027678, 2201193; afgewezen 7655184.
- **Interne links toegevoegd in:** pannen-langst-mee en hoeveel-uitgeven-aan-een-pannenset.
- OFFICIEEL: url=https://www.rijksoverheid.nl/onderwerpen/pfas/vraag-en-antwoord/er-zitten-pfas-in-mijn-antiaanbakpan-moet-ik-deze-weggooien | artikel=beste-pannenmerken | bewering=PFAS zitten in teflonpannen met een antiaanbaklaag. | formulering=In teflonpannen zitten PFAS.
- OFFICIEEL: url=https://consument.acm.nl/garantie-reparatie-geld-terug/garantie | artikel=beste-pannenmerken | bewering=Wettelijke garantie heeft geen vaste termijn; een product moet zo lang meegaan als je redelijkerwijs mag verwachten, je gaat naar de verkoper, en van heel goedkope producten mag je niet verwachten dat ze lang meegaan. | formulering=Ook zonder fabrieksgarantie heb je in Nederland recht op een product dat zo lang meegaat als je redelijkerwijs mag verwachten. Daarvoor ga je naar de winkel, niet naar de fabrikant.
- **Controle:** ronde 1 GOEDGEKEURD (0 moet; natuurlijkheid 8). Alle bronnen geopend (curl, pdftotext).
- **Uitslag:** gepubliceerd op `main` zoals beoordeeld.
- **Beter-punten (niet verwerkt):** (1) goedkope pan: ACM zegt 'minder verwachten', beter '…mag je wel minder verwachten dan van een dure pan'; (2) eigenaarsbron voor Zwilling (Demeyere, Staub, Ballarini) in de brief zetten; (3) 'keramische lagen zijn meestal zonder PFAS' heeft geen eigen bron in de brief (wel in run-02-onderzoek P6), eventueel 'merken van keramische pannen zeggen…'; (4) Dagelijkse Kost: 'veel van die pannen hebben een keramische laag' (er zijn ook kookpannen zonder vermelde coating); (5) 'meest gekozen basis' → 'veelgekozen basis'; (6) 'dikkere bodem' en 'duidelijke informatie' bij duurdere merken zonder bron, opgevangen door 'vaak'; (7) uitsluiting slijtage niet nagekeken voor WMF en de Buyer; (8) 'PTFE' bij de Action-checklist uitleggen als 'PTFE (teflon)'.

## 04-11-2026 – pan-trekt-krom (H1.S07, cloudroutine)

- **Onderwerp:** Waarom trekt een pan krom en hoe voorkom je dat? Slug `pan-trekt-krom`, URL: /blog/pan-trekt-krom/
- **Bronnen:** zie redactie/briefs/H1.S07-pan-krom.md (Zwilling/Demeyere-onderhoud, -FAQ en -garantie, De Schouw, Radar, Keukenloods, Siemens, id.nl). Geen gezondheidsclaims, dus geen BRON- of OFFICIEEL-regels. Wetenschapsscript (profiel H1, Europe PMC + OpenAlex, sleutel werkte) gaf geen bruikbare publicaties; fabrikantdocumentatie gebruikt, zoals het profiel aanraadt. Clustervragen over olijfolie in een keramische pan en het gezondste materiaal niet behandeld (horen bij gids H4).
- **Producten:** geen productblok en geen kaart. `npm run producten -- test` werkt; `ververs --alleen-met-foto --schrijf` gaf geen wijzigingen.
- **Foto's:** Pixabay werkte. 554072 (hoofdfoto), 883036, 5580691, 5979722; afgewezen 3513464, 3857475.
- **Interne links toegevoegd in:** pannen-langst-mee en pannen-inductie.
- **Controle:** ronde 1 AFGEKEURD (1 moet: verzonnen gewoonte "de boosterstand gebruik ik alleen voor een pan vol water"; natuurlijkheid 8). Verwerkt, plus beter-punten (bol/hol eenduidig uitgelegd, aanbakzin zonder bron afgezwakt). Ronde 2 GOEDGEKEURD (0 moet; natuurlijkheid 8). Alle bronnen geopend.
- **Uitslag:** gepubliceerd op `main` zoals beoordeeld.
- **Beter-punten (niet verwerkt):** (1) losse zin "Wij koken zelf ook op een AEG-inductiekookplaat." voegt weinig toe; schrappen of koppelen aan het advies ("juist daar valt een kromme bodem op"); (2) "70 tot 80 procent …, ook als je wilt bakken" loopt niet; beter "Verwarm de pan voor het bakken op ongeveer 70 tot 80 procent"; (3) garantievoorbeeld met Zwilling-merken eventueel algemener; (4) categorie "Pannen kiezen" bij een onderhoudsvraag; (5) vier lijsten met vette labels, één omzetten naar lopende tekst.
## 04-11-2026 – pannenset-gietijzer (H1.S11, lokale sessie op verzoek eigenaar)

- **Onderwerp:** Beste gietijzeren pannenset. Slug `pannenset-gietijzer`, URL: /blog/pannenset-gietijzer/. H1.S09 en H1.S10 overgeslagen omdat de routine die vandaag om 13:00 en 19:00 maakt.
- **Bronnen:** zie redactie/briefs/H1.S11-pannenset-gietijzer.md (Zwilling/Staub FAQ en onderhoud, Lodge cast-iron-myths, Radar twee artikelen, Voedingscentrum roerbakken). Geen gezondheidsclaims en geen wetenschappelijke bronnen.
- OFFICIEEL: url=https://www.voedingscentrum.nl/nl/gezonde-recepten/kookhulp/roerbakken-hoe-roerbak-of-wok-ik-.aspx | artikel=pannenset-gietijzer | bewering=Gietijzer is zwaar, het duurt lang voor het heet is en het blijft lang warm (gezegd over woks van gietijzer). | formulering=Een gietijzeren pan heeft tijd nodig om heet te worden en blijft daarna lang warm.
- **Producten:** productblok met lodge-gietijzer-5, hage-gietijzer-3, bk-bourgogne-4, vevor-gietijzer-4 (nieuw via bol-API, alle met foto en aanbod). Kaarten: lodge-gietijzer-5 en hage-gietijzer-3. Lodge Combo Cooker niet opgenomen (te weinig productinformatie).
- **Foto's:** 1476093 (hoofdfoto), 3766592, 7624743; zie fotobronnen.md.
- **Interne links toegevoegd in:** pannenset-rvs en hoeveel-uitgeven-aan-een-pannenset.
- **Controle:** ronde 1 GOEDGEKEURD (0 moet; natuurlijkheid 8). Alle bronnen en ean's geopend.
- **Uitslag:** gepubliceerd op `main` zoals beoordeeld.
- **Beter-punten (niet verwerkt):** (1) 'koelt nauwelijks af … mooie korst' is een afleiding, voorzichtiger 'koelt minder snel af'; (2) tabel zuur, emaille: 'geen inbrandlaag die kan slijten' klopt niet helemaal (mat emaille van Staub krijgt wel een laag), beter 'Zuur is geen probleem voor het emaille'; (3) 'Gietijzer buigt niet, het breekt' iets stelliger dan Lodge ('breekt eerder dan het buigt'); (4) BK-rij: 'Een braadpan en cocottes van 10 cm' om misverstand over de maat te voorkomen; (5) prijsbandbreedte 50 tot ruim 300 euro kan verschuiven; (6) Hage-kaart liever na de alinea over gebarsten emaille.

## 04-11-2026 – pan-per-gerecht (H1.S09, cloudroutine 13:00)

- **Onderwerp:** Welke pan is het beste voor eieren, vis, vlees of pannenkoeken? Slug `pan-per-gerecht`, URL: /blog/pan-per-gerecht/. Niet 'afgedekt' door koekenpan-kiezen: die vergelijkt materialen, dit artikel gaat per gerecht (warmte, vet, omdraaien, fouten).
- **Bronnen:** zie redactie/briefs/H1.S09-pan-per-gerecht.md (Zwilling/Demeyere: RVS of antikleef, wat bak je in RVS, bakken in RVS, bakken in keramiek, pannenkoekenpannen, pannenkoeken; de Buyer Mineral B (pdf); VRT; Radar; Voedingscentrum roerbakken, oliën en PFAS; Rijksoverheid; BfR). Gezondheidsbeweringen alleen via vaste formuleringen uit officiele-bronnen.json (opnieuw geopend, geen afwijkingen), dus geen nieuwe OFFICIEEL- of BRON-regels. Wetenschapsscript: profiel H1 gedraaid en één zoekopdracht (Europe PMC + OpenAlex, sleutel werkte); geen publicatie nodig.
- **Producten:** geen productblok; twee kaarten met bestaande producten (bk-universe-koekenpan-24, tefal-virtuoso-koekenpan-24). `npm run producten -- test` werkt; `ververs --alleen-met-foto --schrijf` gaf geen wijzigingen.
- **Foto's:** Pixabay werkte. 9310290 (hoofdfoto), 6233959, 3873890, 8031139; afgewezen 5883820.
- **Interne links toegevoegd in:** koekenpan-kiezen en /pannensets/.
- **Controle:** ronde 1 GOEDGEKEURD (0 moet; natuurlijkheid 8). Alle 14 bronnen en beide ean's geopend.
- **Uitslag:** gepubliceerd op `main` zoals beoordeeld.
- **Beter-punten (niet verwerkt):** (1) 'Wordt zo'n pan te heet … PFAS' geldt voor PTFE (teflon), niet voor keramisch; beter 'een pan met een PTFE-laag (teflon)'; (2) Tefal Virtuoso-kaart bij vlees: fabrikant zegt laag tot middelhoog vuur, terwijl tabel 'hoog tot middelhoog' zegt; voorzichtiger formuleren; (3) vis-tips 'in elk soort pan' komen uit RVS-bronnen (twee minuten is ruim voor een dunne filet in antiaanbak); (4) 'RVS is het makkelijkst in onderhoud' zonder eigen bron, eventueel 'hoeft niet ingebrand te worden'; (5) 'houdt de warmte beter vast' → 'geeft de warmte gelijkmatiger af' (dichter bij de bron); weekendzinnetje leest wat ingevoegd.
## 04-11-2026 – pannen-hoge-temperatuur (H1.S12, lokale sessie op verzoek eigenaar)

- **Onderwerp:** Welke pannen kunnen tegen hoge temperaturen, ook in de oven? Slug `pannen-hoge-temperatuur`, URL: /blog/pannen-hoge-temperatuur/. H1.S10 overgeslagen omdat de routine die vandaag om 19:00 maakt. Vlees en aanbakken kort gehouden met een link naar pan-per-gerecht (H1.S09), om overlap te voorkomen.
- **Bronnen:** zie redactie/briefs/H1.S12-pannen-hoge-temperatuur.md. Officiële bronnen uit het register (vaste formuleringen): bfr_ptfe, rijksoverheid_antiaanbakpan, voedingscentrum_olien; geen nieuwe OFFICIEEL-regels. Geen wetenschappelijke bronnen. Oventemperaturen uit bol-productinfo; de Buyer via debuyer-usa.com.
- **Producten:** geen productblok (vraagartikel); kaarten debuyer-mineralb-koekenpan-24 en bk-profiline-5 (bestaand).
- **Foto's:** 1303315 (hoofdfoto), 602841, 3010450; zie fotobronnen.md.
- **Interne links toegevoegd in:** koekenpan-kiezen en pannenset-gietijzer.
- **Controle:** ronde 1 AFGEKEURD (1 moet: tegenstrijdig advies 'opwarmen met olie of boter en daarna hoger' terwijl boter niet geschikt is voor heet bakken; natuurlijkheid 8). Verwerkt, plus beter-punten (RVS in de intro voorzichtiger, emaille in de tabel, Mineral B en BK Universe preciezer, RVS-alinea zonder 'de ene maker…'). Ronde 2 GOEDGEKEURD (0 moet; natuurlijkheid 8). debuyer-usa.com en lodgecastiron.com gaven bij de controleur 429; de Buyer via opgeslagen kopie, Lodge via bol-productinfo.
- **Uitslag:** gepubliceerd op `main` zoals beoordeeld.
- **Beter-punten (niet verwerkt):** (1) bron voor 'roerbakolie' staat op de roerbakpagina van het Voedingscentrum, niet op de oliënpagina; in de brief zetten of alleen zonnebloemolie noemen; (2) emaille in de tabel: 'Pas na rustig opwarmen' iets ruimer dan de bron, beter 'Liever niet; alleen met vloeistof erin'; (3) bron voor kunststof en bakeliet als zwak punt in de oven ontbreekt in de brief; (4) VEVOR: siliconen hoezen eraf in de oven; (5) 'zoals woks' steunt op één product, en de Apollo 7-zin direct erna leest als impliciete bevestiging; 'we' i.p.v. 'wij'; (6) 'Grepen worden heet' iets stelliger dan 'kunnen warm worden'; (7) uitleggen waarom een antiaanbakpan wel tot 250 °C de oven in mag maar niet op hoog vuur; (8) 'Daarom:' en 'Een paar voorbeelden uit de productinformatie…' wat schools.

## 04-11-2026 – pannen-duurzaam (H1.S10, routine 19:00)

- **Onderwerp:** Welke pannen zijn duurzaam en goed recyclebaar? Slug `pannen-duurzaam`, URL: /blog/pannen-duurzaam/
- **Bronnen:** zie redactie/briefs/H1.S10-pannen-duurzaam.md. Zoekprofiel H1 gedraaid; zoekterm 'cookware life cycle assessment' (Europe PMC en OpenAlex, sleutel werkte) gaf geen bruikbare publicatie, dus geen beweringen over milieubelasting per materiaal en geen BRON-regels.
- **Producten:** geen productblok; twee kaarten met bestaande producten (demeyere-comfort3-5, debuyer-mineralb-koekenpan-24). Verbinding bol getest: werkt. `ververs --alleen-met-foto`: alle producten ok, niets verdwenen.
- **Foto's:** 2202193, 1508237, 5174083; afgewezen staat in fotobronnen.md.
- **Interne links toegevoegd in:** pannen-langst-mee en pannenset-inductie-pfas-vrij.
- OFFICIEEL: url=https://www.afvalscheidingswijzer.nl/alle-afvalproducten/keuken/pan | artikel=pannen-duurzaam | bewering=Een bruikbare pan kan naar de kringloopwinkel; een antiaanbakpan met beschadigde laag is niet meer bruikbaar en moet ingeleverd worden voor recycling (milieustraat of oudijzerhandel); metalen als staal, aluminium en koper zijn oneindig te recyclen. | formulering=Lever hem in bij de milieustraat van je gemeente of bij een oudijzerhandel. Het metaal wordt dan omgesmolten en opnieuw gebruikt.
- OFFICIEEL: url=https://www.milieucentraal.nl/minder-afval/afval-scheiden/blikken-en-ander-metaal/ | artikel=pannen-duurzaam | bewering=Grote stukken metaal kun je als grofvuil inleveren of naar een oudijzerhandel brengen; gescheiden ingeleverde metalen kunnen vaak goed worden gerecycled. | formulering=Staal, ijzer, aluminium en koper zijn waardevolle grondstoffen. Ze kunnen steeds opnieuw worden omgesmolten tot nieuwe producten.
- **Let op bronnen:** de Rijksoverheid zegt dat een pan met beschadigde laag ook bij het restafval mag; de Afvalscheidingswijzer zegt dat hij ingeleverd moet worden. In de tekst: "Het restafval mag, maar bij inleveren kan het metaal gerecycled worden."
- **Controle:** ronde 1 GOEDGEKEURD (0 moet; natuurlijkheid 8). Alle bronnen geopend, productinfo gecontroleerd met `producten toon`, foto's bekeken.
- **Uitslag:** gepubliceerd op `main` zoals beoordeeld.
- **Beter-punten (niet verwerkt):** (1) "Geen enkele pan is er helemaal tegen bestand" is ruimer dan de bron (een test met alleen keramische koekenpannen); beter "Ook een koekenpan met een dikke, stevige bodem kan…"; (2) "zo min mogelijk PFAS in het milieu": de bron zegt "minder"; (3) RVS "vaak vaatwasser, weinig onderhoud" en onderhoud van kaal gietijzer hebben geen eigen bron in de brief; (4) kaart Mineral B liever direct onder de alinea over plaatstaal en gietijzer; (5) het laatste punt onder "beter laten liggen" gaat over vervangen, en de kop "minst schadelijke pannen" kan aan gezondheid doen denken; (6) "Gebruik niet groter dan nodig" → "Gebruik geen grotere pan dan nodig"; "staat niet op het etiket" botst licht met "'PFAS-vrij' is een bewering van de maker"; (7) AI-signalen: "Drie dingen maken het verschil", lijsten van drie met vette labels, "De winnaars zijn duidelijk", "Het materiaal bepaalt allebei".
## 07-11-2026 – koekenpan-rvs (H3.S03, lokale sessie op verzoek eigenaar)

- **Planning:** H3 (gids Koekenpannen) op 'afgedekt door /blog/koekenpan-kiezen/' gezet: materialen, maat, inductie, deksel en checklist staan daar al; die pagina geldt als gids. H3.S01 (beste koekenpan volgens de Consumentenbond) bewust open gelaten: testuitslagen staan achter de betaalmuur en tone-of-voice verbiedt instanties in de tekst; besluit eigenaar gevraagd.
- **Onderwerp:** RVS-koekenpan kiezen. Slug `koekenpan-rvs`, URL: /blog/koekenpan-rvs/
- **Bronnen:** zie redactie/briefs/H3.S03-koekenpan-rvs.md (Demeyere RVS-koekenpan in topconditie en FAQ, America's Test Kitchen fully clad, Radar). 'Zonnebloemolie' volgens vaste formulering voedingscentrum_olien. Geen gezondheidsclaims, geen wetenschappelijke bronnen, geen nieuwe OFFICIEEL-regels.
- **Producten:** productblok met tefal-virtuoso-koekenpan-24 (bestaand), wmf-profi-koekenpan-24, zwilling-pro-koekenpan-24, demeyere-classico3-koekenpan-28, debuyer-affinity-koekenpan-28 (nieuw, alle met foto en aanbod). Kaarten: debuyer-affinity-koekenpan-28 en tefal-virtuoso-koekenpan-24. Korte tekst de Buyer aangepast: productinfo zegt vijf lagen, niet dat ze tot in de wand lopen.
- **Foto's:** 5003273 (hoofdfoto), 9450869, 2424515; afgewezen 4644950, 1271991. Geen RVS-koekenpan op Pixabay gevonden; sfeerfoto's met eerlijke alt-teksten.
- **Interne links toegevoegd in:** koekenpan-kiezen en pannenset-rvs.
- **Controle:** ronde 1 GOEDGEKEURD (0 moet; natuurlijkheid 8). Alle bronnen en ean's geopend.
- **Uitslag:** gepubliceerd op `main` zoals beoordeeld.
- **Beter-punten (niet verwerkt):** (1) 'RVS geeft warmte niet zo goed door': bron zegt 'reageert traag op temperatuurveranderingen'; (2) 'vooral bij sauzen' staat niet in de bron (alleen eten aan de rand); (3) 'zonnebloemolie' in de brief zetten; (4) prijsbandbreedte plus 'de Tefal is de voordeligste' geeft indirect een prijs bij één product; beter algemene bandbreedte of 'voordeligste' weg; (5) bij het sausadvies vermelden dat geen van de vijf pannen volgens de productinfo lagen tot in de wand heeft; (6) zin over inductie in de eerste alinea staat wat los; (7) Tefal-kaart en uienfoto direct onder elkaar; (8) foto's in de tekst tonen antiaanbakpannen in een RVS-artikel; later vervangen door RVS-foto's.

## 07-11-2026 – besluit H3.S01

- **Besluit eigenaar:** H3.S01 'Wat is de beste koekenpan volgens de Consumentenbond?' wordt niet geschreven (status 'overgeslagen' in planning.md). Reden: testuitslagen staan achter de betaalmuur en tone-of-voice verbiedt instanties in de tekst. De routine neemt deze regel niet meer; de volgende open regel is H3.S04 (koekenpan voor inductie).
