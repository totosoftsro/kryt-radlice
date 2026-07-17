# Kryt Radlice — web výstavy

Statický jednostránkový web studentského projektu Kryt Radlice (SSPŠ a G),
redesign původního krytradlice.cz ve vizuálním stylu ssps.cz.

## Struktura

```
index.html          stránka (jediná)
404.html            chybová stránka pro GitHub Pages (samostatná, bez závislostí)
css/style.css       styly — design tokeny nahoře v :root
js/main.js          mobilní menu + lightbox galerie (vanilla JS, bez závislostí)
fonts/              TT Polls (nadpisy) a Mona Sans (text), woff2
img/background.webp hero fotografie (background-800.webp pro mobil,
                    background.jpg jen pro og:image)
img/gallery/        fotografie galerie v plném rozlišení (1600 px WebP, pro lightbox)
img/gallery/thumbs/ náhledy do mřížky galerie (800 px WebP)
docs/               návštěvnický řád (PDF)
robots.txt          + sitemap.xml
```

Nasazeno na GitHub Pages: https://totosoftsro.github.io/kryt-radlice/
(větev `main`, kořen — push na `main` web automaticky přenasadí)

## Lokální spuštění

Web je čistě statický — stačí jakýkoli HTTP server, např.:

```sh
python3 -m http.server 8741
```

a otevřít http://localhost:8741. (Přímé otevření `index.html` ze souboru
funguje také, jen prohlížeč nemusí načíst fonty kvůli CORS.)

## Design

Barvy a typografie vycházejí z design tokenů ssps.cz:

| token        | hodnota   | použití                              |
|--------------|-----------|--------------------------------------|
| `--navy`     | `#0D0F26` | nadpisy, tlačítka, tmavé plochy      |
| `--gold`     | `#DDA300` | dekorativní akcenty (linky, hover)   |
| `--gold-text`| `#8F6A00` | zlatá pro textové odkazy (kontrast AA)|
| `--tint`     | `#f6f6f4` | podbarvení střídavých sekcí          |

## Licence fontů

- **Mona Sans** — svobodný font od GitHubu (SIL OFL), soubory z
  [github.com/github/mona-sans](https://github.com/github/mona-sans).
- **TT Polls** — komerční font (TypeType); soubory pocházejí z webu ssps.cz,
  kde je škola má licencované. Používat jen v rámci projektů školy,
  nešířit dál.

## Obsah

Texty a fotografie pocházejí z původního webu krytradlice.cz
(projekt studentů SSPŠ a G, vedoucí týmu Matěj Růžička).
