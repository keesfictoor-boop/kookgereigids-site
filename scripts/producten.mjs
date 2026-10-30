// Producten van bol ophalen via de Marketing Catalog API.
//
//   npm run producten -- test
//   npm run producten -- zoek "rvs pannenset" [--aantal 10]
//   npm run producten -- toon <bol-url|bol-productnummer|ean>
//   npm run producten -- haal <bol-url|bol-productnummer|ean> <product-id> --naam "Korte naam" --kort "Eén zin" [--droog]
//   npm run producten -- ververs [product-id ...] [--alleen-met-foto] [--schrijf]
//
// `haal` zet een nieuw product in src/data/producten.json. Een id of bol-product dat er al in staat wordt
// geweigerd: een foto toevoegen aan een bestaand product laat het productblok terugkomen op bestaande pagina's.
// `ververs` controleert bol-producten en schrijft alleen met --schrijf. Een product zonder aanbod of foto
// krijgt dan afbeelding null, zodat het uit het productblok verdwijnt.
//
// Voorwaarden van bol: de foto blijft op de server van bol staan (we bewaren de url, niet het bestand) en
// wordt niet bewerkt. Prijs en levertijd komen niet in producten.json, want die moeten altijd actueel zijn.
//
// Sleutels staan in .env (nooit committen) of als omgevingsvariabele: BOL_CLIENT_ID en BOL_CLIENT_SECRET.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productenPad = path.join(root, 'src/data/producten.json');
const basis = 'https://api.bol.com/marketing/catalog/v1';

function loadEnv() {
  const file = path.join(root, '.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

const vlaggen = new Set(['droog', 'schrijf', 'alleen-met-foto']);

function parseArgs(argv) {
  const pos = [];
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) pos.push(argv[i]);
    else if (vlaggen.has(argv[i].slice(2))) opts[argv[i].slice(2)] = true;
    else opts[argv[i].slice(2)] = argv[++i];
  }
  return { pos, opts };
}

function fail(msg) {
  console.error(`Fout: ${msg}`);
  process.exit(1);
}

function leesProducten() {
  return JSON.parse(fs.readFileSync(productenPad, 'utf8'));
}

function schrijfProducten(data) {
  fs.writeFileSync(productenPad, `${JSON.stringify(data, null, 2)}\n`);
}

function bolNummer(url) {
  return url.match(/\/(\d{10,})\/?(?:[?#].*)?$/)?.[1] ?? null;
}

let token = null;

async function haalToken() {
  if (token) return token;
  const { BOL_CLIENT_ID: id, BOL_CLIENT_SECRET: secret } = process.env;
  if (!id || !secret) fail('BOL_CLIENT_ID en/of BOL_CLIENT_SECRET ontbreekt (in .env of als omgevingsvariabele).');
  const res = await fetch('https://login.bol.com/token?grant_type=client_credentials', {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`, Accept: 'application/json' },
  });
  if (!res.ok) fail(`bol geeft geen token (HTTP ${res.status}). Controleer de sleutels.`);
  token = (await res.json()).access_token;
  return token;
}

// Verzoeken na elkaar: bol staat 10 per seconde per endpoint toe en wil dat je stopt bij een 429.
async function api(pad) {
  const res = await fetch(basis + pad, {
    headers: { Authorization: `Bearer ${await haalToken()}`, Accept: 'application/json', 'Accept-Language': 'nl' },
  });
  await new Promise((klaar) => setTimeout(klaar, 150));
  if (res.status === 429) fail('bol geeft HTTP 429 (limiet bereikt). Gestopt; probeer het later opnieuw.');
  if (res.status === 404) return null;
  if (!res.ok) fail(`bol geeft HTTP ${res.status} op ${pad.split('?')[0]}`);
  return res.json();
}

const velden = 'country-code=NL&include-image=true&include-offer=true';

async function naarEan(invoer) {
  const code = /^https?:/.test(invoer) ? bolNummer(invoer) : invoer;
  if (!code || !/^\d+$/.test(code)) fail(`Geen bol-url, bol-productnummer of EAN: ${invoer}`);
  if (code.length <= 13) return code;
  return (await api(`/products/${code}/to-ean?country-code=NL`))?.ean ?? null;
}

async function product(invoer) {
  const ean = await naarEan(invoer);
  return ean ? api(`/products/${ean}?${velden}`) : null;
}

function regel(p) {
  return [
    p.title,
    `  ean: ${p.ean} | bol-nummer: ${p.bolProductId}`,
    `  aanbod: ${p.offer ? `ja, € ${p.offer.price} (alleen ter info, niet op de site)` : 'nee'} | foto: ${p.image?.url ? 'ja' : 'nee'}`,
    `  ${p.url}`,
  ].join('\n');
}

async function test() {
  await haalToken();
  const z = await api(`/products/search?search-term=pannenset&${velden}&page=1&page-size=1`);
  console.log(`Verbinding met bol werkt (${z?.totalResults ?? 0} resultaten voor 'pannenset').`);
}

async function zoek(pos, opts) {
  const term = pos[0];
  if (!term) fail('Geef een zoekterm op.');
  const aantal = Math.min(Number(opts.aantal ?? 10), 50);
  const z = await api(`/products/search?search-term=${encodeURIComponent(term)}&${velden}&page=1&page-size=${aantal}`);
  for (const p of z?.results ?? []) console.log(`${regel(p)}\n`);
}

async function toon(pos) {
  if (!pos[0]) fail('Geef een bol-url, bol-productnummer of EAN op.');
  const p = await product(pos[0]);
  if (!p) fail('Product niet gevonden.');
  console.log(regel(p));
  if (p.description) console.log(`\n${p.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()}`);
}

async function haal(pos, opts) {
  const [invoer, id] = pos;
  if (!invoer || !id) fail('Gebruik: haal <bol-url|nummer|ean> <product-id> --naam "..." --kort "..."');
  if (!/^[a-z0-9-]+$/.test(id)) fail('Product-id: alleen kleine letters, cijfers en streepjes.');
  if (!opts.naam || !opts.kort) fail('--naam en --kort zijn verplicht.');

  const data = leesProducten();
  if (data.producten[id]) fail(`Product-id ${id} bestaat al.`);
  const p = await product(invoer);
  if (!p) fail('Product niet gevonden.');
  if (!p.offer) fail('Dit product heeft nu geen aanbod bij bol.');
  if (!p.image?.url) fail('Dit product heeft geen foto; het mag niet in een productblok.');
  const dubbel = Object.entries(data.producten).find(([, b]) => b.ean === p.ean || (b.winkel === 'bol' && bolNummer(b.url) === p.bolProductId));
  if (dubbel) fail(`Dit bol-product staat er al in als ${dubbel[0]}.`);

  const nieuw = { naam: opts.naam, kort: opts.kort, winkel: 'bol', url: p.url, afbeelding: p.image.url, ean: p.ean };
  if (opts.droog) {
    console.log(`Droog, niets opgeslagen:\n${JSON.stringify({ [id]: nieuw }, null, 2)}`);
    return;
  }
  data.producten[id] = nieuw;
  schrijfProducten(data);
  console.log(`Toegevoegd: ${id}. Zet het id in 'producten' in de frontmatter van het artikel.`);
}

async function ververs(pos, opts) {
  const data = leesProducten();
  const ids = pos.length ? pos : Object.keys(data.producten);
  let gewijzigd = 0;
  for (const id of ids) {
    const b = data.producten[id];
    if (!b) fail(`Onbekend product: ${id}`);
    if (b.winkel !== 'bol' || (opts['alleen-met-foto'] && !b.afbeelding)) continue;
    const p = await product(b.ean ?? b.url);
    const foto = p?.offer ? (p.image?.url ?? null) : null;
    const status = !p ? 'niet gevonden' : !p.offer ? 'geen aanbod' : !foto ? 'geen foto' : 'ok';
    console.log(`${id}: ${status}${foto && foto !== b.afbeelding ? ' (foto nieuw of gewijzigd)' : ''}`);
    if (foto !== b.afbeelding) gewijzigd++;
    if (opts.schrijf) {
      b.afbeelding = foto;
      if (p) {
        b.ean = p.ean;
        b.url = p.url;
      }
    }
  }
  if (opts.schrijf) {
    schrijfProducten(data);
    console.log(`Klaar: ${gewijzigd} foto('s) gewijzigd.`);
  } else {
    console.log(`Droog, niets opgeslagen. Met --schrijf zouden ${gewijzigd} foto('s) wijzigen.`);
  }
}

loadEnv();
const [opdracht, ...rest] = process.argv.slice(2);
const { pos, opts } = parseArgs(rest);
const opdrachten = { test, zoek, toon, haal, ververs };
if (!opdrachten[opdracht]) fail('Gebruik: test, zoek, toon, haal of ververs (zie de uitleg bovenaan scripts/producten.mjs).');
await opdrachten[opdracht](pos, opts);
