// Redactie: pagina's van kookgereigids.nl zelf aanpassen in de browser.
//
//   npm run redactie
//
// Start de Astro-ontwikkelserver (voorbeeld op http://localhost:4321) en een editor op
// http://localhost:4400. Links kies je een pagina, in het midden pas je de tekst aan,
// rechts zie je het resultaat. Bij opslaan (knop of Ctrl+S) wordt het bestand bijgewerkt
// en komt een overzicht van de wijziging (woord-diff) in
// ../seo-pijplijn/redactie/wijzigingen.md. Claude leest dat logboek automatisch
// (hook in .claude/settings.json, zie scripts/redactie-melding.mjs).
//
// Alleen bereikbaar vanaf deze computer (127.0.0.1). Er wordt niets gepubliceerd:
// publiceren gaat pas via git push, na akkoord.

import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logDir = path.resolve(siteDir, '..', 'seo-pijplijn', 'redactie');
const logFile = path.join(logDir, 'wijzigingen.md');
const EDITOR_PORT = 4400;
const PREVIEW_PORT = 4321;

// Welke bestanden je kunt bewerken, en bij welke URL ze horen.
function pages() {
  const list = [];
  const blogDir = path.join(siteDir, 'src', 'content', 'blog');
  for (const f of fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).sort()) {
    const slug = f.replace(/\.md$/, '');
    list.push({ id: `blog/${slug}`, group: 'Artikelen', file: `src/content/blog/${f}`, url: `/blog/${slug}/`, title: titleOf(path.join(blogDir, f)) ?? slug });
  }
  const hubDir = path.join(siteDir, 'src', 'hubs');
  for (const f of fs.existsSync(hubDir) ? fs.readdirSync(hubDir).filter((f) => f.endsWith('.md')).sort() : []) {
    const slug = f.replace(/\.md$/, '');
    list.push({ id: `hub/${slug}`, group: 'Gidsen', file: `src/hubs/${f}`, url: `/${slug}/`, title: titleOf(path.join(hubDir, f)) ?? slug });
  }
  const names = { index: 'Home', 'over-ons': 'Over ons', koopadvies: 'Koopadvies', keuzehulp: 'Keuzehulp', contact: 'Contact' };
  for (const [name, title] of Object.entries(names)) {
    const file = `src/pages/${name}.astro`;
    if (fs.existsSync(path.join(siteDir, file))) list.push({ id: `pagina/${name}`, group: 'Vaste pagina’s (HTML)', file, url: name === 'index' ? '/' : `/${name}/`, title });
  }
  return list;
}

function titleOf(file) {
  const m = fs.readFileSync(file, 'utf8').match(/^title:\s*"(.*)"\s*$/m);
  return m?.[1];
}

// Controles vóór opslaan, zodat een tekstwijziging de pagina niet kapotmaakt.
function check(page, oldText, newText) {
  if (page.file.endsWith('.md')) {
    if (!/^---\r?\n[\s\S]*?\r?\n---\r?\n/.test(newText)) return 'De gegevens bovenaan (tussen de twee regels ---) zijn beschadigd. Zet de regels --- terug.';
    for (const key of ['title', 'description', 'intro']) {
      if (!new RegExp(`^${key}:\\s*".*"\\s*$`, 'm').test(newText)) return `De regel "${key}: "…"" bovenaan ontbreekt of mist een aanhalingsteken.`;
      if (!new RegExp(`^${key}:\\s*"[^"]*"\\s*$`, 'm').test(newText)) return `In de regel "${key}" bovenaan staat een " midden in de tekst. Gebruik daar ‘enkele’ aanhalingstekens.`;
    }
    return null;
  }
  // .astro: alleen tekst wijzigen, dus de opmaaktekens moeten gelijk blijven.
  for (const ch of ['<', '>', '{', '}', '---']) {
    const count = (s) => s.split(ch).length - 1;
    if (count(oldText) !== count(newText)) return `Het aantal "${ch}" is veranderd. Op deze pagina mag je alleen tekst aanpassen, geen HTML-tags of codetekens.`;
  }
  return null;
}

// Woord-diff via git, alleen voor het logboek.
function wordDiff(oldText, newText) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'redactie-'));
  const a = path.join(dir, 'oud');
  const b = path.join(dir, 'nieuw');
  fs.writeFileSync(a, oldText);
  fs.writeFileSync(b, newText);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--word-diff=plain', '-U1', a, b], { encoding: 'utf8' });
  fs.rmSync(dir, { recursive: true, force: true });
  return r.stdout.split('\n').filter((l) => !/^(diff --git|index |--- |\+\+\+ )/.test(l)).join('\n').trim();
}

function logChange(page, diff, note) {
  fs.mkdirSync(logDir, { recursive: true });
  if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, '# Redactiewijzigingen\n\nWijzigingen die de eigenaar zelf heeft opgeslagen via `npm run redactie`. In de diff staat [-oud-] en {+nieuw+}.\n');
  }
  const when = new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });
  const noteLine = note ? `\nOpmerking van de eigenaar: ${note}\n` : '';
  fs.appendFileSync(logFile, `\n## ${when} · ${page.title} (\`${page.file}\`)\n${noteLine}\n\`\`\`diff\n${diff}\n\`\`\`\n`);
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 5_000_000) req.destroy(); });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${EDITOR_PORT}`);
  try {
    if (req.method === 'GET' && url.pathname === '/') return send(res, 200, PAGE, 'text/html; charset=utf-8');
    if (req.method === 'GET' && url.pathname === '/api/pages') return send(res, 200, { pages: pages(), preview: `http://localhost:${PREVIEW_PORT}` });
    const page = pages().find((p) => p.id === url.searchParams.get('id'));
    if (url.pathname === '/api/page' && !page) return send(res, 404, { error: 'Onbekende pagina.' });
    const file = page && path.join(siteDir, page.file);
    if (req.method === 'GET' && url.pathname === '/api/page') return send(res, 200, { ...page, text: fs.readFileSync(file, 'utf8') });
    if (req.method === 'POST' && url.pathname === '/api/page') {
      const body = JSON.parse(await readBody(req));
      const oldText = fs.readFileSync(file, 'utf8');
      // De browser werkt met \n; behoud de regeleinden die het bestand al had (Windows: \r\n).
      const text = oldText.includes('\r\n') ? body.text.replace(/\r?\n/g, '\r\n') : body.text;
      const note = body.note;
      if (text === oldText) return send(res, 200, { ok: true, message: 'Geen wijzigingen.' });
      const problem = check(page, oldText, text);
      if (problem) return send(res, 422, { error: problem });
      fs.writeFileSync(file, text);
      logChange(page, wordDiff(oldText, text), (note ?? '').trim());
      return send(res, 200, { ok: true, message: 'Opgeslagen en doorgegeven aan Claude.' });
    }
    send(res, 404, { error: 'Niet gevonden.' });
  } catch (err) {
    send(res, 500, { error: String(err.message ?? err) });
  }
});

server.listen(EDITOR_PORT, '127.0.0.1', () => {
  console.log(`\nRedactie staat klaar: http://localhost:${EDITOR_PORT}`);
  console.log(`Voorbeeld van de site: http://localhost:${PREVIEW_PORT}`);
  console.log('Stoppen: Ctrl+C in dit venster.\n');
  const opener = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', `http://localhost:${EDITOR_PORT}`]] : [process.platform === 'darwin' ? 'open' : 'xdg-open', [`http://localhost:${EDITOR_PORT}`]];
  if (!process.argv.includes('--niet-openen')) spawn(opener[0], opener[1], { stdio: 'ignore', detached: true }).unref();
});

// Astro-ontwikkelserver voor het live voorbeeld (herlaadt vanzelf na opslaan).
const astroBin = path.join(siteDir, 'node_modules', 'astro', 'bin', 'astro.mjs');
const dev = spawn(process.execPath, [astroBin, 'dev', '--port', String(PREVIEW_PORT)], { cwd: siteDir, stdio: 'inherit' });
dev.on('exit', (code) => { if (code) console.log(`\nDe voorbeeldserver is gestopt (code ${code}). Draait er al iets op poort ${PREVIEW_PORT}?`); });
const stop = () => { dev.kill(); process.exit(0); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

const PAGE = `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><title>Redactie · Kookgereigids</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { --bg:#fffbf5; --line:#d8d0c2; --text:#292720; --muted:#625e54; --accent:#c2410c; --green:#365314; }
  * { box-sizing:border-box; }
  body { margin:0; font:15px/1.5 system-ui, sans-serif; color:var(--text); background:var(--bg); height:100vh; display:grid; grid-template-columns:240px 1fr 1fr; grid-template-rows:auto 1fr; }
  header { grid-column:1/-1; display:flex; align-items:center; gap:16px; padding:10px 16px; border-bottom:1px solid var(--line); background:#fff; }
  header strong { font-size:16px; }
  header .status { margin-left:auto; color:var(--muted); }
  header .status.ok { color:var(--green); } header .status.fout { color:#b91c1c; font-weight:600; }
  nav { overflow:auto; border-right:1px solid var(--line); padding:8px 0; background:#fff; }
  nav h2 { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); margin:14px 16px 4px; }
  nav button { display:block; width:100%; text-align:left; border:0; background:none; padding:7px 16px; font:inherit; cursor:pointer; color:var(--text); }
  nav button:hover { background:#f3ecdf; } nav button.actief { background:#f3ecdf; font-weight:600; border-left:3px solid var(--accent); }
  main { display:flex; flex-direction:column; min-width:0; border-right:1px solid var(--line); }
  .balk { display:flex; gap:8px; align-items:center; padding:8px 12px; border-bottom:1px solid var(--line); flex-wrap:wrap; }
  .balk .tip { color:var(--muted); font-size:13px; }
  textarea { flex:1; width:100%; border:0; padding:16px; font:15px/1.6 Consolas, ui-monospace, monospace; resize:none; outline:none; background:var(--bg); color:var(--text); }
  input.notitie { flex:1; min-width:180px; padding:7px 10px; border:1px solid var(--line); border-radius:6px; font:inherit; }
  button.opslaan { background:var(--accent); color:#fff; border:0; border-radius:6px; padding:8px 16px; font:inherit; font-weight:600; cursor:pointer; }
  button.opslaan:disabled { opacity:.5; cursor:default; }
  iframe { width:100%; height:100%; border:0; background:#fff; }
  @media (max-width: 1000px) { body { grid-template-columns:200px 1fr; grid-template-rows:auto 1fr 50vh; } section { grid-column:1/-1; border-top:1px solid var(--line); } }
  .leeg { padding:24px; color:var(--muted); }
</style></head>
<body>
<header><strong>Redactie · Kookgereigids</strong><span class="tip" id="bestand"></span><span class="status" id="status">Kies links een pagina.</span></header>
<nav id="lijst"></nav>
<main>
  <div class="balk"><input class="notitie" id="notitie" placeholder="Optioneel: korte opmerking voor Claude (bijv. 'graag ook in andere artikelen zo')"><button class="opslaan" id="opslaan" disabled>Opslaan (Ctrl+S)</button></div>
  <div class="balk"><span class="tip" id="uitleg">Pas alleen tekst aan. Laat de regels tussen --- bovenaan, de # voor kopjes en de [linktekst](adres)-vorm staan.</span></div>
  <textarea id="tekst" spellcheck="true" lang="nl" disabled></textarea>
</main>
<section><iframe id="voorbeeld" title="Voorbeeld van de pagina"></iframe></section>
<script>
  const $ = (id) => document.getElementById(id);
  let huidig = null, opgeslagen = '', preview = '';
  const status = (t, cls = '') => { const s = $('status'); s.textContent = t; s.className = 'status ' + cls; };
  const gewijzigd = () => huidig && $('tekst').value !== opgeslagen;
  const bijwerken = () => { $('opslaan').disabled = !gewijzigd(); if (gewijzigd()) status('Niet opgeslagen wijzigingen.'); };

  async function laadLijst() {
    const r = await fetch('/api/pages').then((r) => r.json());
    preview = r.preview;
    const groepen = {};
    for (const p of r.pages) (groepen[p.group] ??= []).push(p);
    $('lijst').innerHTML = '';
    for (const [g, ps] of Object.entries(groepen)) {
      const h = document.createElement('h2'); h.textContent = g; $('lijst').append(h);
      for (const p of ps) {
        const b = document.createElement('button'); b.textContent = p.title; b.dataset.id = p.id;
        b.onclick = () => open(p.id); $('lijst').append(b);
      }
    }
    const start = new URLSearchParams(location.search).get('pagina');
    if (start) open(start);
  }

  async function open(id) {
    if (gewijzigd() && !confirm('Je hebt niet opgeslagen wijzigingen. Toch wisselen?')) return;
    const p = await fetch('/api/page?id=' + encodeURIComponent(id)).then((r) => r.json());
    if (p.error) return status(p.error, 'fout');
    huidig = p;
    $('tekst').value = p.text; $('tekst').disabled = false;
    opgeslagen = $('tekst').value;
    $('bestand').textContent = p.file;
    $('uitleg').textContent = p.file.endsWith('.md')
      ? 'Pas alleen tekst aan. Laat de regels tussen --- bovenaan, de # voor kopjes en de [linktekst](adres)-vorm staan.'
      : 'Dit is een HTML-pagina: verander alleen de leesbare tekst tussen de tags. Tekens als < > { } worden gecontroleerd.';
    $('voorbeeld').src = preview + p.url;
    document.querySelectorAll('nav button').forEach((b) => b.classList.toggle('actief', b.dataset.id === id));
    history.replaceState(null, '', '?pagina=' + encodeURIComponent(id));
    status('Geopend.'); bijwerken();
  }

  async function opslaan() {
    if (!gewijzigd()) return;
    $('opslaan').disabled = true; status('Bezig met opslaan…');
    const r = await fetch('/api/page?id=' + encodeURIComponent(huidig.id), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: $('tekst').value, note: $('notitie').value }) }).then((r) => r.json());
    if (r.error) { status(r.error, 'fout'); $('opslaan').disabled = false; return; }
    opgeslagen = $('tekst').value; $('notitie').value = '';
    status(r.message, 'ok'); bijwerken();
    setTimeout(() => { $('voorbeeld').src = $('voorbeeld').src; }, 1200);
  }

  $('tekst').addEventListener('input', bijwerken);
  $('opslaan').onclick = opslaan;
  document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); opslaan(); } });
  window.addEventListener('beforeunload', (e) => { if (gewijzigd()) e.preventDefault(); });
  laadLijst();
</script>
</body></html>`;
