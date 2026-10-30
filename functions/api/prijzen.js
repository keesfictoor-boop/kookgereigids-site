// Cloudflare Pages Function: actuele bol-prijzen voor de productblokken.
//
//   GET /api/prijzen?ean=3168430299214,8710704151565  ->  { "prijzen": { "3168430299214": 64.99, ... } }
//
// De prijs staat niet in de HTML: bol eist dat een getoonde prijs altijd klopt. Daarom haalt de browser hem op
// het moment van bezoek op. Sleutels: BOL_CLIENT_ID en BOL_CLIENT_SECRET in de instellingen van Cloudflare Pages.
// Alleen EAN's uit producten.json worden doorgegeven. Geen prijs of een fout geeft null; het blok toont dan alleen de knop.

import data from '../../src/data/producten.json';

const basis = 'https://api.bol.com/marketing/catalog/v1';
const bekend = new Set(Object.values(data.producten).map((p) => p.ean).filter(Boolean));
const maxPerVerzoek = 12;
const bewaarSeconden = 600;

// Blijft tussen verzoeken bewaard: bol wil niet per verzoek een nieuw token.
let token = null;
let tokenTot = 0;

async function haalToken(env) {
  if (token && Date.now() < tokenTot) return token;
  const res = await fetch('https://login.bol.com/token?grant_type=client_credentials', {
    method: 'POST',
    headers: { Authorization: `Basic ${btoa(`${env.BOL_CLIENT_ID}:${env.BOL_CLIENT_SECRET}`)}`, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  const { access_token, expires_in } = await res.json();
  token = access_token;
  tokenTot = Date.now() + (expires_in - 30) * 1000;
  return token;
}

async function haalPrijs(ean, env) {
  const res = await fetch(`${basis}/products/${ean}/offers/best?country-code=NL`, {
    headers: { Authorization: `Bearer ${await haalToken(env)}`, Accept: 'application/json', 'Accept-Language': 'nl' },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`aanbod ${res.status}`);
  const { price } = await res.json();
  return typeof price === 'number' ? price : null;
}

async function prijsVoor(ean, env, waitUntil) {
  const cache = caches.default;
  const sleutel = new Request(`https://prijzen.kookgereigids.nl/${ean}`);
  const bewaard = await cache.match(sleutel);
  if (bewaard) return (await bewaard.json()).prijs;
  const prijs = await haalPrijs(ean, env);
  const antwoord = new Response(JSON.stringify({ prijs }), { headers: { 'Cache-Control': `public, max-age=${bewaarSeconden}` } });
  waitUntil(cache.put(sleutel, antwoord));
  return prijs;
}

export async function onRequestGet({ request, env, waitUntil }) {
  const gevraagd = (new URL(request.url).searchParams.get('ean') ?? '').split(',');
  const eans = [...new Set(gevraagd)].filter((ean) => bekend.has(ean)).slice(0, maxPerVerzoek);
  const prijzen = {};
  for (const ean of eans) {
    try {
      prijzen[ean] = await prijsVoor(ean, env, waitUntil);
    } catch {
      prijzen[ean] = null;
    }
  }
  return Response.json({ prijzen }, { headers: { 'Cache-Control': 'no-store' } });
}
