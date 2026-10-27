// Foto's zoeken en ophalen via Pixabay (standaard) of Pexels.
//
//   npm run foto -- zoek "gietijzeren pan" [--aantal 10] [--richting liggend|staand] [--bron pixabay|pexels]
//   npm run foto -- haal <id> <bestandsnaam> --alt "Nederlandse alt-tekst" [--artikel <slug>] [--bron pixabay|pexels]
//
// `haal` downloadt de foto naar public/assets/<bestandsnaam>.jpg en zet image, imageAlt, imageCredit,
// imageCreditUrl, imageSourceUrl en imageSource in de frontmatter van src/content/blog/<slug>.md
// (met --artikel), of print die regels zodat je ze zelf plakt.
//
// Sleutels staan in .env (nooit committen): PIXABAY_API_KEY=... en/of PEXELS_API_KEY=...
// Zonder --bron wordt Pixabay gebruikt als daar een sleutel voor is, anders Pexels.
// Pixabay vraagt zoekresultaten 24 uur te cachen; dat gebeurt in .cache/ (niet in git).

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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

function requireKey(name) {
  const key = process.env[name];
  if (!key) fail(`geen ${name} gevonden. Zet in html-site/.env de regel: ${name}=jouw-sleutel`);
  return key;
}

async function getJson(url, init, label) {
  const res = await fetch(url, init);
  if (res.status === 400 && label === 'Pixabay') fail('Pixabay weigert het verzoek. Controleer PIXABAY_API_KEY in .env en de zoekterm (max. 100 tekens).');
  if (res.status === 401 || res.status === 403) fail(`${label} weigert de API-sleutel. Controleer de sleutel in .env.`);
  if (res.status === 429) fail(`limiet van ${label} bereikt. Probeer het later opnieuw.`);
  if (!res.ok) fail(`${label} antwoordde met HTTP ${res.status}.`);
  const remaining = res.headers.get('x-ratelimit-remaining');
  if (remaining !== null && Number(remaining) < 10) console.warn(`Let op: nog ${remaining} ${label}-verzoeken over in deze periode.`);
  return res.json();
}

// Eén vorm voor beide bronnen: { id, width, height, page, photographer, photographerUrl, description, download }
const sources = {
  pixabay: {
    label: 'Pixabay',
    license: 'https://pixabay.com/service/license-summary/',
    async request(params) {
      const url = new URL('https://pixabay.com/api/');
      url.searchParams.set('key', requireKey('PIXABAY_API_KEY'));
      for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, v);
      // Pixabay: resultaten 24 uur cachen.
      const dir = path.join(root, '.cache', 'pixabay');
      const file = path.join(dir, crypto.createHash('sha1').update(JSON.stringify(params)).digest('hex') + '.json');
      if (fs.existsSync(file) && Date.now() - fs.statSync(file).mtimeMs < 24 * 3600 * 1000) return JSON.parse(fs.readFileSync(file, 'utf8'));
      const data = await getJson(url, {}, 'Pixabay');
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(data));
      return data;
    },
    normalize: (h) => ({
      id: h.id,
      width: h.imageWidth,
      height: h.imageHeight,
      page: h.pageURL,
      photographer: h.user,
      photographerUrl: `https://pixabay.com/users/${h.user}-${h.user_id}/`,
      description: h.tags,
      download: h.largeImageURL, // max. 1280 px zonder 'full API access'
    }),
    async search(query, opts) {
      const data = await this.request({
        q: query.slice(0, 100),
        lang: opts.taal ?? 'nl',
        image_type: 'photo',
        orientation: opts.richting === 'staand' ? 'vertical' : 'horizontal',
        safesearch: 'true',
        per_page: Math.max(3, Number(opts.aantal ?? 10)),
      });
      return { total: data.totalHits, photos: data.hits.map(this.normalize) };
    },
    async get(id) {
      const data = await this.request({ id });
      if (!data.hits?.length) fail(`geen Pixabay-foto met id ${id}.`);
      return this.normalize(data.hits[0]);
    },
  },
  pexels: {
    label: 'Pexels',
    license: 'https://www.pexels.com/license/',
    request(endpoint, params = {}) {
      const url = new URL('https://api.pexels.com/v1' + endpoint);
      for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, v);
      return getJson(url, { headers: { Authorization: requireKey('PEXELS_API_KEY') } }, 'Pexels');
    },
    normalize: (p) => {
      const download = new URL(p.src.original);
      download.searchParams.set('auto', 'compress');
      download.searchParams.set('cs', 'tinysrgb');
      download.searchParams.set('w', '1600');
      return { id: p.id, width: p.width, height: p.height, page: p.url, photographer: p.photographer, photographerUrl: p.photographer_url, description: p.alt, download: download.href };
    },
    async search(query, opts) {
      const data = await this.request('/search', {
        query,
        per_page: opts.aantal ?? 10,
        orientation: opts.richting === 'staand' ? 'portrait' : 'landscape',
        locale: opts.taal,
      });
      return { total: data.total_results, photos: data.photos.map(this.normalize) };
    },
    async get(id) {
      return this.normalize(await this.request(`/photos/${id}`));
    },
  },
};

function pickSource(opts) {
  const name = opts.bron ?? (process.env.PIXABAY_API_KEY ? 'pixabay' : 'pexels');
  if (!sources[name]) fail(`onbekende bron "${name}". Kies pixabay of pexels.`);
  return sources[name];
}

async function zoek(query, opts) {
  if (!query) fail('geef een zoekterm, bijvoorbeeld: npm run foto -- zoek "gietijzeren pan"');
  const src = pickSource(opts);
  const { total, photos } = await src.search(query, opts);
  if (!photos.length) return console.log(`Geen foto's gevonden voor "${query}" bij ${src.label}.`);
  console.log(`${total} resultaten voor "${query}" bij ${src.label} (eerste ${photos.length}):\n`);
  for (const p of photos) {
    console.log(`${p.id}  ${p.width}x${p.height}  ${p.photographer}`);
    console.log(`   ${p.description || '(geen beschrijving)'}`);
    console.log(`   ${p.page}\n`);
  }
  console.log('Bekijk de foto via de link (controleer of het geen AI-beeld is en er geen merken of logo\'s op staan).');
  console.log('Ophalen: npm run foto -- haal <id> <bestandsnaam> --alt "Nederlandse alt-tekst" --artikel <slug>');
}

function setFrontmatter(file, fields) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) fail(`geen frontmatter gevonden in ${path.relative(root, file)}`);
  const lines = m[1].split(/\r?\n/);
  for (const [k, v] of Object.entries(fields)) {
    const line = `${k}: ${JSON.stringify(v)}`;
    const i = lines.findIndex((l) => l.startsWith(`${k}:`));
    if (i >= 0) lines[i] = line;
    else lines.push(line);
  }
  fs.writeFileSync(file, text.replace(m[0], `---\n${lines.join('\n')}\n---`));
}

async function haal(id, naam, opts) {
  if (!/^\d+$/.test(id ?? '')) fail('geef het foto-id (een getal) uit de zoekresultaten.');
  if (!/^[a-z0-9][a-z0-9-]*$/.test(naam ?? '')) fail('geef een bestandsnaam met kleine letters, cijfers en streepjes, zonder .jpg (bijv. gietijzeren-pan).');
  if (!opts.alt?.trim()) fail('geef een Nederlandse alt-tekst mee met --alt "Beschrijving van de foto".');
  const target = path.join(root, 'public', 'assets', `${naam}.jpg`);
  if (fs.existsSync(target)) fail(`public/assets/${naam}.jpg bestaat al. Kies een andere naam.`);
  const article = opts.artikel && path.join(root, 'src', 'content', 'blog', `${opts.artikel}.md`);
  if (article && !fs.existsSync(article)) fail(`artikel src/content/blog/${opts.artikel}.md bestaat niet.`);

  const src = pickSource(opts);
  const p = await src.get(id);
  const img = await fetch(p.download);
  if (!img.ok) fail(`downloaden mislukt (HTTP ${img.status}).`);
  fs.writeFileSync(target, Buffer.from(await img.arrayBuffer()));

  const fields = {
    image: `/assets/${naam}.jpg`,
    imageAlt: opts.alt.trim(),
    imageCredit: p.photographer,
    imageCreditUrl: p.photographerUrl,
    imageSourceUrl: p.page,
    imageSource: src.label,
  };
  console.log(`Opgeslagen: public/assets/${naam}.jpg (foto van ${p.photographer} via ${src.label})`);
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
  console.log('Gebruik:\n  npm run foto -- zoek "zoekterm" [--aantal 10] [--richting liggend|staand] [--bron pixabay|pexels]\n  npm run foto -- haal <id> <bestandsnaam> --alt "alt-tekst" [--artikel <slug>] [--bron pixabay|pexels]');
  process.exit(cmd ? 1 : 0);
}
