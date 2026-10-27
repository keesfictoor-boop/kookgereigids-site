// Foto's zoeken en ophalen via de Pexels API.
//
//   npm run foto -- zoek "cast iron skillet" [--aantal 10] [--richting landscape] [--taal nl-NL]
//   npm run foto -- haal <pexels-id> <bestandsnaam> [--artikel <slug>] [--alt "eigen alt-tekst"]
//
// `haal` downloadt de foto (max. 1600 px breed) naar public/assets/<bestandsnaam>.jpg en zet
// image, imageAlt, imageCredit, imageCreditUrl en imageSourceUrl in de frontmatter van
// src/content/blog/<slug>.md (met --artikel), of print die regels zodat je ze zelf plakt.
//
// De API-sleutel staat in .env als PEXELS_API_KEY=... (nooit committen).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://api.pexels.com/v1';

function loadEnv() {
  const file = path.join(root, '.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

function parseArgs(argv) {
  const pos = [];
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) opts[argv[i].slice(2)] = argv[++i];
    else pos.push(argv[i]);
  }
  return { pos, opts };
}

function fail(msg) {
  console.error(`Fout: ${msg}`);
  process.exit(1);
}

async function pexels(endpoint, params = {}) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) fail('geen PEXELS_API_KEY gevonden. Zet in html-site/.env de regel: PEXELS_API_KEY=jouw-sleutel');
  const url = new URL(API + endpoint);
  for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { Authorization: key } });
  if (res.status === 401 || res.status === 403) fail('Pexels weigert de API-sleutel. Controleer PEXELS_API_KEY in .env.');
  if (res.status === 429) fail('limiet van Pexels bereikt (200 per uur / 20.000 per maand). Probeer het later opnieuw.');
  if (!res.ok) fail(`Pexels antwoordde met HTTP ${res.status}.`);
  const remaining = res.headers.get('x-ratelimit-remaining');
  if (remaining !== null && Number(remaining) < 20) console.warn(`Let op: nog ${remaining} Pexels-verzoeken over in deze periode.`);
  return res.json();
}

async function zoek(query, opts) {
  if (!query) fail('geef een zoekterm, bijvoorbeeld: npm run foto -- zoek "frying pan"');
  const data = await pexels('/search', {
    query,
    per_page: opts.aantal ?? 10,
    orientation: opts.richting ?? 'landscape',
    locale: opts.taal,
  });
  if (!data.photos?.length) return console.log(`Geen foto's gevonden voor "${query}".`);
  console.log(`${data.total_results} resultaten voor "${query}" (eerste ${data.photos.length}):\n`);
  for (const p of data.photos) {
    console.log(`${p.id}  ${p.width}x${p.height}  ${p.photographer}`);
    console.log(`   ${p.alt || '(geen beschrijving)'}`);
    console.log(`   ${p.url}\n`);
  }
  console.log('Bekijk de foto via de link en haal hem op met: npm run foto -- haal <id> <bestandsnaam> --artikel <slug>');
}

function setFrontmatter(file, fields) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) fail(`geen frontmatter gevonden in ${path.relative(root, file)}`);
  let lines = m[1].split(/\r?\n/);
  for (const [k, v] of Object.entries(fields)) {
    const line = `${k}: ${JSON.stringify(v)}`;
    const i = lines.findIndex((l) => l.startsWith(`${k}:`));
    if (i >= 0) lines[i] = line;
    else lines.push(line);
  }
  fs.writeFileSync(file, text.replace(m[0], `---\n${lines.join('\n')}\n---`));
}

async function haal(id, naam, opts) {
  if (!/^\d+$/.test(id ?? '')) fail('geef het Pexels-id (een getal) uit de zoekresultaten.');
  if (!/^[a-z0-9][a-z0-9-]*$/.test(naam ?? '')) fail('geef een bestandsnaam met kleine letters, cijfers en streepjes, zonder .jpg (bijv. gietijzeren-pan).');
  const target = path.join(root, 'public', 'assets', `${naam}.jpg`);
  if (fs.existsSync(target)) fail(`public/assets/${naam}.jpg bestaat al. Kies een andere naam.`);
  const article = opts.artikel && path.join(root, 'src', 'content', 'blog', `${opts.artikel}.md`);
  if (article && !fs.existsSync(article)) fail(`artikel src/content/blog/${opts.artikel}.md bestaat niet.`);

  const p = await pexels(`/photos/${id}`);
  const src = new URL(p.src.original);
  src.searchParams.set('auto', 'compress');
  src.searchParams.set('cs', 'tinysrgb');
  src.searchParams.set('w', '1600');
  const img = await fetch(src);
  if (!img.ok) fail(`downloaden mislukt (HTTP ${img.status}).`);
  fs.writeFileSync(target, Buffer.from(await img.arrayBuffer()));

  const fields = {
    image: `/assets/${naam}.jpg`,
    imageAlt: opts.alt ?? p.alt ?? '',
    imageCredit: p.photographer,
    imageCreditUrl: p.photographer_url,
    imageSourceUrl: p.url,
  };
  console.log(`Opgeslagen: public/assets/${naam}.jpg (foto van ${p.photographer} via Pexels)`);
  if (!fields.imageAlt) console.warn('Let op: Pexels gaf geen beschrijving. Vul imageAlt zelf in (in het Nederlands).');
  else if (!opts.alt) console.warn('Controleer de alt-tekst: Pexels levert die meestal in het Engels. Geef een Nederlandse met --alt "...".');
  if (article) {
    setFrontmatter(article, fields);
    console.log(`Frontmatter bijgewerkt: src/content/blog/${opts.artikel}.md`);
  } else {
    console.log('\nZet deze regels in de frontmatter van het artikel:\n');
    for (const [k, v] of Object.entries(fields)) console.log(`${k}: ${JSON.stringify(v)}`);
  }
}

loadEnv();
const { pos, opts } = parseArgs(process.argv.slice(2));
const [cmd, ...rest] = pos;
if (cmd === 'zoek') await zoek(rest.join(' '), opts);
else if (cmd === 'haal') await haal(rest[0], rest[1], opts);
else {
  console.log('Gebruik:\n  npm run foto -- zoek "zoekterm" [--aantal 10] [--richting landscape|portrait|square] [--taal nl-NL]\n  npm run foto -- haal <pexels-id> <bestandsnaam> [--artikel <slug>] [--alt "alt-tekst"]');
  process.exit(cmd ? 1 : 0);
}
