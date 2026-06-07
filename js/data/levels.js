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
// VIKTIGT om räckvidd (uppmätt i motorn):
//  - Från marken når man UPP till ca y=282 och kan plocka godis med mitten-y ≈ 290–345.
//  - Man kan bara LANDA på plattformar vars y ≥ 360 (högre upp = onåbart från marken).
//  Håll därför godsaker på y ≈ 300–345 och plattformar på y ≈ 370–430.

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
      { x: 600, y: 390, w: 170 },
      { x: 950, y: 375, w: 150 },
      { x: 1300, y: 390, w: 160 },
      { x: 1650, y: 375, w: 150 },
      { x: 1900, y: 400, w: 150 },
    ],
    treats: [
      { x: 600, y: 330 },
      { x: 950, y: 315 },
      { x: 1300, y: 330 },
      { x: 1650, y: 315 },
      { x: 1900, y: 340 },
      { x: 780, y: 340 },
      { x: 1130, y: 340 },
    ],
    hazards: [
      { x: 850, y: 462, kind: 0 },
      { x: 1480, y: 462, kind: 1 },
      { x: 1780, y: 462, kind: 0 },
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
      { x: 600, y: 390, w: 150 },
      { x: 900, y: 425, w: 150 }, // bro
      { x: 1200, y: 380, w: 150 },
      { x: 1500, y: 370, w: 140 },
      { x: 1850, y: 425, w: 160 }, // bro
      { x: 2150, y: 385, w: 150 },
      { x: 2450, y: 395, w: 150 },
    ],
    treats: [
      { x: 600, y: 330 },
      { x: 1200, y: 320 },
      { x: 1500, y: 310 },
      { x: 2150, y: 325 },
      { x: 2450, y: 335 },
      { x: 900, y: 305 },
      { x: 1850, y: 305 },
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
      { x: 500, y: 390, w: 140 },
      { x: 760, y: 425, w: 150 }, // bro
      { x: 1050, y: 380, w: 140 },
      { x: 1300, y: 370, w: 130 },
      { x: 1500, y: 425, w: 150 }, // bro
      { x: 1800, y: 385, w: 140 },
      { x: 2050, y: 375, w: 130 },
      { x: 2400, y: 425, w: 150 }, // bro
      { x: 2700, y: 385, w: 140 },
      { x: 2950, y: 375, w: 130 },
      { x: 3170, y: 390, w: 140 },
    ],
    treats: [
      { x: 500, y: 330 },
      { x: 1050, y: 320 },
      { x: 1300, y: 310 },
      { x: 1800, y: 325 },
      { x: 2050, y: 315 },
      { x: 2700, y: 325 },
      { x: 2950, y: 315 },
      { x: 3170, y: 330 },
      { x: 760, y: 305 },
      { x: 1500, y: 305 },
      { x: 2400, y: 305 },
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
      { x: 560, y: 385, w: 130 },
      { x: 1100, y: 375, w: 130 },
      { x: 1750, y: 380, w: 130 },
      { x: 2500, y: 375, w: 130 },
      { x: 3120, y: 385, w: 130 },
      { x: 3600, y: 390, w: 140 },
    ],
    treats: [
      { x: 560, y: 325 },
      { x: 1100, y: 315 },
      { x: 1750, y: 320 },
      { x: 2500, y: 315 },
      { x: 3120, y: 325 },
      { x: 3600, y: 330 },
      { x: 780, y: 305 },
      { x: 1480, y: 305 },
      { x: 2180, y: 305 },
      { x: 2880, y: 305 },
    ],
    hazards: [
      { x: 500, y: 462, kind: 0 },
      { x: 1300, y: 462, kind: 1 },
      { x: 2000, y: 462, kind: 0 },
      { x: 2620, y: 462, kind: 1 },
      { x: 3150, y: 462, kind: 0 },
      { x: 3700, y: 462, kind: 1 },
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
      { x: 560, y: 385, w: 120 },
      { x: 980, y: 375, w: 120 },
      { x: 1620, y: 380, w: 120 },
      { x: 2050, y: 425, w: 130 }, // bro över brett hål
      { x: 2300, y: 378, w: 120 },
      { x: 2950, y: 382, w: 120 },
      { x: 3350, y: 425, w: 130 }, // bro över brett hål
      { x: 3620, y: 380, w: 120 },
      { x: 4180, y: 390, w: 130 },
    ],
    treats: [
      { x: 560, y: 325 },
      { x: 980, y: 315 },
      { x: 1620, y: 320 },
      { x: 2300, y: 318 },
      { x: 2950, y: 322 },
      { x: 3620, y: 320 },
      { x: 4180, y: 330 },
      { x: 760, y: 305 },
      { x: 1380, y: 305 },
      { x: 2700, y: 305 },
      { x: 3950, y: 305 },
      { x: 2050, y: 360 },
      { x: 3350, y: 360 },
    ],
    hazards: [
      { x: 470, y: 462, kind: 0 },
      { x: 1080, y: 462, kind: 1 },
      { x: 1700, y: 462, kind: 0 },
      { x: 2400, y: 462, kind: 1 },
      { x: 3050, y: 462, kind: 0 },
      { x: 3700, y: 462, kind: 1 },
      { x: 4250, y: 462, kind: 0 },
    ],
  },
];

export const LEVEL_COUNT = LEVELS.length;

export function getLevel(index) {
  return LEVELS[Phaser.Math.Clamp(index, 0, LEVELS.length - 1)];
}
