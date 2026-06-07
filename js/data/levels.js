// Bandata. Varje bana är bara data – inga banor rör spelmotorn.
// Vill ni lägga till en bana? Kopiera ett objekt nedan och ändra koordinaterna.
//
// Koordinater: x,y är MITTEN av varje sak. Banan är "world.width" bred.
// y=0 är högst upp, marken ligger på GROUND_TOP (500). Större y = längre ner.
//
// platforms: { x, y, w }   svävande plattform att hoppa på (w = bredd)
// gaps:      { x, w }       hål i marken (faller man ner tappar man ett hjärta)
// treats:    { x, y }       godsak att samla (blir coins)
// hazards:   { x, y, kind } fara. kind 0 eller 1 = djurets två faror (se characters.js)
// goal:      { x, y }       det gyllene priset i mål
// start:     { x, y }       där djuret börjar
//
// Tips om svårighet: smalare plattformar + bredare hål + fler faror = svårare.
// Spelaren kan hoppa ~160 px högt och ~210 px brett – håll hopp inom det.

export const GROUND_TOP = 500; // markens ovansida i spel-koordinater

export const LEVELS = [
  // ---- Bana 1: lugn uppvärmning, inga hål ----
  {
    name: "Trädgården",
    width: 2600,
    start: { x: 330, y: 430 },
    goal: { x: 2080, y: 440 },
    gaps: [],
    platforms: [
      { x: 520, y: 410, w: 160 },
      { x: 780, y: 330, w: 140 },
      { x: 1080, y: 380, w: 160 },
      { x: 1380, y: 320, w: 140 },
      { x: 1680, y: 380, w: 150 },
      { x: 1900, y: 430, w: 150 },
    ],
    treats: [
      { x: 520, y: 360 },
      { x: 780, y: 280 },
      { x: 1080, y: 330 },
      { x: 1380, y: 270 },
      { x: 1680, y: 330 },
      { x: 900, y: 455 },
      { x: 1250, y: 455 },
    ],
    hazards: [
      { x: 980, y: 462, kind: 0 },
      { x: 1550, y: 462, kind: 1 },
      { x: 1820, y: 462, kind: 0 },
    ],
  },

  // ---- Bana 2: lite hål och fler faror ----
  {
    name: "Skogsstigen",
    width: 3300,
    start: { x: 330, y: 430 },
    goal: { x: 2780, y: 440 },
    gaps: [
      { x: 900, w: 190 },
      { x: 1850, w: 200 },
    ],
    platforms: [
      { x: 520, y: 400, w: 150 },
      { x: 760, y: 320, w: 130 },
      { x: 900, y: 430, w: 140 }, // bro över hålet
      { x: 1180, y: 360, w: 140 },
      { x: 1450, y: 300, w: 130 },
      { x: 1700, y: 380, w: 130 },
      { x: 1850, y: 430, w: 150 }, // bro över hålet
      { x: 2120, y: 340, w: 130 },
      { x: 2400, y: 390, w: 140 },
    ],
    treats: [
      { x: 760, y: 270 },
      { x: 1180, y: 310 },
      { x: 1450, y: 250 },
      { x: 2120, y: 290 },
      { x: 2400, y: 340 },
      { x: 620, y: 455 },
      { x: 2650, y: 455 },
    ],
    hazards: [
      { x: 660, y: 462, kind: 0 },
      { x: 1350, y: 462, kind: 1 },
      { x: 1600, y: 462, kind: 0 },
      { x: 2300, y: 462, kind: 1 },
    ],
  },

  // ---- Bana 3: smalare plattformar, fler hål ----
  {
    name: "Berget",
    width: 3900,
    start: { x: 330, y: 430 },
    goal: { x: 3380, y: 440 },
    gaps: [
      { x: 760, w: 200 },
      { x: 1500, w: 210 },
      { x: 2400, w: 210 },
    ],
    platforms: [
      { x: 460, y: 400, w: 130 },
      { x: 760, y: 430, w: 140 }, // bro
      { x: 1040, y: 350, w: 120 },
      { x: 1270, y: 290, w: 110 },
      { x: 1500, y: 430, w: 140 }, // bro
      { x: 1780, y: 360, w: 120 },
      { x: 2030, y: 300, w: 110 },
      { x: 2400, y: 430, w: 140 }, // bro
      { x: 2680, y: 360, w: 120 },
      { x: 2930, y: 300, w: 110 },
      { x: 3170, y: 370, w: 130 },
    ],
    treats: [
      { x: 1040, y: 300 },
      { x: 1270, y: 240 },
      { x: 1780, y: 310 },
      { x: 2030, y: 250 },
      { x: 2680, y: 310 },
      { x: 2930, y: 250 },
      { x: 460, y: 350 },
      { x: 3170, y: 320 },
    ],
    hazards: [
      { x: 600, y: 462, kind: 0 },
      { x: 1150, y: 462, kind: 1 },
      { x: 1950, y: 462, kind: 0 },
      { x: 2750, y: 462, kind: 1 },
      { x: 3050, y: 462, kind: 0 },
    ],
  },

  // ---- Bana 4: NY – många direkta hålhopp + täta faror ----
  {
    name: "Grottan",
    width: 4300,
    start: { x: 330, y: 430 },
    goal: { x: 3780, y: 440 },
    gaps: [
      { x: 780, w: 200 },
      { x: 1480, w: 205 },
      { x: 2180, w: 210 },
      { x: 2880, w: 205 },
      { x: 3450, w: 200 },
    ],
    platforms: [
      { x: 560, y: 380, w: 120 },
      { x: 1010, y: 340, w: 110 },
      { x: 1240, y: 285, w: 100 },
      { x: 1720, y: 340, w: 110 },
      { x: 1950, y: 290, w: 100 },
      { x: 2420, y: 340, w: 110 },
      { x: 2650, y: 290, w: 100 },
      { x: 3120, y: 345, w: 110 },
      { x: 3340, y: 300, w: 100 },
      { x: 3600, y: 370, w: 120 },
    ],
    treats: [
      { x: 560, y: 330 },
      { x: 1010, y: 290 },
      { x: 1240, y: 235 },
      { x: 1720, y: 290 },
      { x: 1950, y: 240 },
      { x: 2420, y: 290 },
      { x: 2650, y: 240 },
      { x: 3120, y: 295 },
      { x: 3340, y: 250 },
      { x: 3600, y: 320 },
    ],
    hazards: [
      { x: 500, y: 462, kind: 0 },
      { x: 1150, y: 462, kind: 1 },
      { x: 1800, y: 462, kind: 0 },
      { x: 2500, y: 462, kind: 1 },
      { x: 3100, y: 462, kind: 0 },
      { x: 3650, y: 462, kind: 1 },
    ],
  },

  // ---- Bana 5: NY – längst, breda hål med broar + massor av faror ----
  {
    name: "Molnslottet",
    width: 5000,
    start: { x: 330, y: 430 },
    goal: { x: 4400, y: 440 },
    gaps: [
      { x: 760, w: 210 },
      { x: 1380, w: 215 },
      { x: 2050, w: 300 }, // brett – använd bron
      { x: 2700, w: 215 },
      { x: 3350, w: 300 }, // brett – använd bron
      { x: 3950, w: 210 },
    ],
    platforms: [
      { x: 560, y: 380, w: 105 },
      { x: 980, y: 330, w: 100 },
      { x: 1180, y: 285, w: 95 },
      { x: 1620, y: 335, w: 100 },
      { x: 1830, y: 285, w: 95 },
      { x: 2050, y: 430, w: 120 }, // bro över brett hål
      { x: 2300, y: 335, w: 100 },
      { x: 2510, y: 285, w: 95 },
      { x: 2950, y: 340, w: 100 },
      { x: 3150, y: 290, w: 95 },
      { x: 3350, y: 430, w: 120 }, // bro över brett hål
      { x: 3620, y: 340, w: 100 },
      { x: 3820, y: 295, w: 95 },
      { x: 4180, y: 360, w: 120 },
    ],
    treats: [
      { x: 980, y: 285 },
      { x: 1180, y: 240 },
      { x: 1620, y: 290 },
      { x: 1830, y: 240 },
      { x: 2300, y: 290 },
      { x: 2510, y: 240 },
      { x: 2950, y: 295 },
      { x: 3150, y: 245 },
      { x: 3620, y: 295 },
      { x: 3820, y: 250 },
      { x: 4180, y: 310 },
      { x: 760, y: 400 },
      { x: 1380, y: 400 },
      { x: 2700, y: 400 },
      { x: 3950, y: 400 },
    ],
    hazards: [
      { x: 470, y: 462, kind: 0 },
      { x: 1080, y: 462, kind: 1 },
      { x: 1620, y: 462, kind: 0 },
      { x: 2380, y: 462, kind: 1 },
      { x: 2950, y: 462, kind: 0 },
      { x: 3650, y: 462, kind: 1 },
      { x: 4200, y: 462, kind: 0 },
    ],
  },
];

export const LEVEL_COUNT = LEVELS.length;

export function getLevel(index) {
  return LEVELS[Phaser.Math.Clamp(index, 0, LEVELS.length - 1)];
}
