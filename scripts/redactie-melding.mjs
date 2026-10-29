// Geeft nieuwe redactiewijzigingen door aan Claude.
//
// Draait als UserPromptSubmit-hook (zie .claude/settings.json in de projectmap): bij elk bericht
// aan Claude print dit script de wijzigingen die sinds de vorige keer in
// ../seo-pijplijn/redactie/wijzigingen.md zijn bijgekomen. Claude krijgt die tekst als context.
// Wat al is doorgegeven, wordt bijgehouden in .gelezen (een byte-positie, niet in git).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const logDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'seo-pijplijn', 'redactie');
const logFile = path.join(logDir, 'wijzigingen.md');
const markFile = path.join(logDir, '.gelezen');
const MAX = 12000;

if (!fs.existsSync(logFile)) process.exit(0);
const log = fs.readFileSync(logFile);
const from = Number(fs.existsSync(markFile) ? fs.readFileSync(markFile, 'utf8') : 0) || 0;
if (log.length <= from) process.exit(0);

let fresh = log.subarray(from).toString('utf8').trim();
if (!fresh.includes('## ')) { fs.writeFileSync(markFile, String(log.length)); process.exit(0); }
if (fresh.length > MAX) fresh = fresh.slice(0, MAX) + `\n\n[… ingekort; lees de rest in ${logFile}]`;

console.log(
  'De eigenaar heeft via de redactie-editor zelf tekst aangepast en opgeslagen (de bestanden zijn al gewijzigd). ' +
  'Neem deze wijzigingen over als keuze van de eigenaar: draai ze niet terug, en verwerk eventuele opmerkingen. ' +
  'Zie seo-pijplijn/redactie/wijzigingen.md. [-oud-] {+nieuw+}:\n\n' + fresh,
);
fs.writeFileSync(markFile, String(log.length));
