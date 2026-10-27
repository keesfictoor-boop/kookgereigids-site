# Kookgereigids — lokale HTML/CSS-website

Open index.html in een browser. Alle zes pagina’s, foto’s en lettertypen werken vanuit deze map, zonder installatie of internetverbinding. De externe bronvermeldingen, sociale deelacties en e-mailfuncties hebben uiteraard hun eigen verbinding of programma nodig.

## De zes pagina’s
- index.html — homepage met handmatig bedienbare blogslider
- about.html — over Kookgereigids, werkwijze en affiliate-uitleg
- services.html — koopadvies en negen onderwerpen
- portfolio.html — keuzehulp, vergelijkingstabel en aankoopchecklist
- blog.html — drie blogkaarten en drie volledige korte artikelen
- contact.html — contactformulier via je mailprogramma en uitleg over privacy

Er is één gedeeld styles.css. Bovenaan staan de CSS-variabelen voor kleuren, lettertypen, afstanden en afrondingen. De vormgeving is gebaseerd op het aangeleverde MarketNest-design: Lora, Open Sans, terracotta, crème en bosgroen. Er zijn geen frameworks, externe bibliotheken of uitvoerbare JavaScript-bestanden. De script-elementen in de HTML bevatten uitsluitend schema.org JSON-LD-gegevens voor zoekmachines.

## Bediening
- Op kleine schermen opent het menu met het native HTML-element details.
- De blogslider gebruikt horizontaal scrollen en CSS scroll-snap. De knoppen 01, 02 en 03 brengen je naar het bijbehorende verhaal. Hij start niet automatisch.
- Veelgestelde vragen werken met details/summary.
- De keuzehulp bevat lokale vinkvakjes. Ze worden niet verstuurd of opgeslagen door de site.
- Het contactformulier gebruikt HTML5-validatie en mailto. De knop opent je eigen mailprogramma; de bezoeker verstuurt de e-mail zelf. Ondersteuning voor het overnemen van velden verschilt per browser en mailprogramma. Daarom staat er ook een rechtstreekse e-maillink. Er is geen formulierbackend en geen schijnbevestiging van verzending.
- De sociale iconen zijn deelacties voor de domeinnaam; ze verwijzen niet naar verzonnen sociale profielen. Deelacties promoten de bestaande domeinnaam en niet dit lokale HTML-voorbeeld.

## Inhoud en scope
Alle zichtbare teksten zijn ingevuld. Er staan geen fictieve producten, prijzen, testimonials, testuitslagen, auteursbiografieën of affiliate-bestemmingen in. De primaire route is ‘Vind jouw pan’: zonder geverifieerde producten of echte winkellinks is een werkelijke ‘Koop nu’-knop niet zinvol. Koopadvies en verwijzingen zijn volledig navigeerbaar binnen de zes pagina’s.

De nieuwe HTML-opdracht vraagt om uitgewerkte teksten; daarom bevat dit lokale ontwerp echte algemene teksten in plaats van de conceptmarkeringen uit de eerdere WordPress-opdracht. De oorspronkelijke WordPress-plannen en -instellingen zijn niet gewijzigd.

## Foto’s en lettertypen
De opgegeven source.unsplash.com-dienst antwoordde tijdens de bouw met HTTP 503. De eigenaar heeft vaste, lokaal meegeleverde Unsplash-foto’s goedgekeurd.
- cooking.jpg: Rick Barrett / Ambitious Studio — https://unsplash.com/photos/tXfAH4ixIKk
- kitchen.jpg: Dane Deaner — https://unsplash.com/photos/d9qnD33cBJs
- skillet.jpg: Max Griss — https://unsplash.com/photos/B3b8dsSfoqg
- Fotolicentie: https://unsplash.com/license
- Lettertypen: Lora en Open Sans, via Google Fonts; de OFL-licenties staan in assets.

Foto’s zijn sfeerbeelden en illustreren geen eigen producttests. Elk img-element heeft beschrijvende alt-tekst, afmetingen en loading="lazy". Ook de lettertypen worden lokaal geladen.

## SEO en vóór een eventuele publicatie
Elke pagina heeft een eigen titel en beschrijving, lang="nl", semantische structuur, Open Graph-gegevens en JSON-LD. Alle interne pagina-, anker-, stylesheet- en assetlinks zijn relatief. Bronvermeldingen en sociale deelacties zijn externe links; e-mail gebruikt mailto.

Voor publicatie: stel definitieve openbare URL’s en canonicals vast, maak Open Graph-afbeeldings-URL’s absoluut, controleer de definitieve inhoud en juridische gegevens, en sluit desgewenst een echte formulierbackend aan. Er is niets naar WordPress, staging of live geüpload.
