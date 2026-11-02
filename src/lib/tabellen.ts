// Tabellen met vier of meer kolommen worden op de telefoon kaartjes (zie .tabel-kaarten in styles.css).
// Elke cel krijgt daarvoor de tekst van zijn kolomkop mee.
export function tabelKaarten(html: string) {
  return html.replace(/<table>[\s\S]*?<\/table>/g, (tabel) => {
    const thead = tabel.match(/<thead>[\s\S]*?<\/thead>/)?.[0] ?? '';
    const koppen = [...thead.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)]
      .map((kop) => kop[1].replace(/<[^>]+>/g, '').replaceAll('"', '&quot;').trim());
    if (koppen.length < 4) return tabel;
    const metKoppen = tabel.replace(/<tr>([\s\S]*?)<\/tr>/g, (rij) => {
      let kolom = 0;
      return rij.replace(/<td([^>]*)>/g, (_, kenmerken: string) => `<td${kenmerken} data-kop="${koppen[kolom++]}">`);
    });
    return metKoppen.replace('<table>', '<table class="tabel-kaarten">');
  });
}
