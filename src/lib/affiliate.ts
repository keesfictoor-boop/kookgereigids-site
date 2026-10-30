import data from '../data/producten.json';
import partners from '../data/affiliate.json';

export interface Product {
  id: string;
  naam: string;
  kort: string;
  winkel: string;
  winkelLabel: string;
  href: string;
  affiliate: boolean;
  afbeelding: string | null;
  ean?: string;
}

// 'toegestaan': alleen bol, Amazon.nl en winkels met een eigen affiliateprogramma (bijv. via Daisycon)
// mogen in een productblok staan (afspraak eigenaar 29-10-2026).
interface Winkel { label: string; toegestaan?: boolean; siteId?: string; tag?: string }

// Deeplink van het bol partnerprogramma. Controleer dit formaat in het partnerportaal
// zodra er een site-ID is.
function bolLink(url: string, naam: string, siteId: string) {
  const q = new URLSearchParams({ p: '2', t: 'url', s: siteId, f: 'TXL', url, name: naam });
  return `https://partner.bol.com/click/click?${q}`;
}

// Amazon Associates: de partnertag gaat als 'tag'-parameter achter de productlink.
function amazonLink(url: string, tag: string) {
  const u = new URL(url);
  u.searchParams.set('tag', tag);
  return u.toString();
}

function partnerLink(winkel: string, w: Winkel, url: string, naam: string): string | null {
  if (winkel === 'bol' && w.siteId) return bolLink(url, naam, w.siteId);
  if (winkel === 'amazon' && w.tag) return amazonLink(url, w.tag);
  return null;
}

// Geeft alleen producten terug die in een productblok mogen: van een toegestane winkel én met een productfoto.
// Zonder zulke producten toont de pagina geen productblok.
export function getProducten(ids: string[] = []): Product[] {
  const alle = data.producten as Record<string, { naam: string; kort: string; winkel: string; url: string; afbeelding: string | null; ean?: string }>;
  const winkels = partners.winkels as Record<string, Winkel>;
  return ids.flatMap((id) => {
    const p = alle[id];
    if (!p) throw new Error(`Onbekend product in frontmatter: ${id}`);
    const w = winkels[p.winkel] ?? { label: p.winkel };
    if (!w.toegestaan || !p.afbeelding) return [];
    const link = partnerLink(p.winkel, w, p.url, p.naam);
    return [{ id, ...p, winkelLabel: w.label, href: link ?? p.url, affiliate: link !== null }];
  });
}

function tekst(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function productTip(p: Product) {
  const prijs = p.winkel === 'bol' && p.ean ? `<p class="product-prijs" data-bol-ean="${p.ean}" hidden></p>` : '';
  const herkomst = p.winkel === 'bol' ? ' · foto en prijs van bol' : '';
  const rel = p.affiliate ? 'sponsored nofollow noopener' : 'nofollow noopener';
  return `<aside class="product-tip"><img src="${tekst(p.afbeelding ?? '')}" alt="${tekst(p.naam)}" width="110" height="110" loading="lazy" decoding="async"><div class="product-tip-tekst"><p class="product-tip-naam">${tekst(p.naam)}</p><p>${tekst(p.kort)}</p>${prijs}<p class="product-tip-melding">${p.affiliate ? 'Affiliate-link' : 'Winkellink'}${herkomst}</p></div><a class="button button-outline" href="${tekst(p.href)}" rel="${rel}" target="_blank">Bekijk bij ${tekst(p.winkelLabel)}</a></aside>`;
}

// Zet een regel [[product:id]] in de Markdown om in een compacte productkaart midden in de tekst.
// Een product dat niet getoond mag worden, verdwijnt; een onbekend id laat de build mislukken.
export function plaatsProducten(html: string) {
  return html.replace(/<p>\[\[product:([a-z0-9-]+)\]\]<\/p>/g, (_, id: string) => {
    const [p] = getProducten([id]);
    return p ? productTip(p) : '';
  });
}
