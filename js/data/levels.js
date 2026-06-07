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
      { x: 770, y: 330, w: 150 },
      { x: 1080, y: 380, w: 200 },
      { x: 1450, y: 320, w: 150 },
      { x: 1760, y: 410, w: 180 },
    ],
    treats: [
      { x: 520, y: 360 },
      { x: 770, y: 280 },
      { x: 1080, y: 330 },
      { x: 1450, y: 270 },
      { x: 900, y: 455 },
      { x: 1300, y: 455 },
    ],
    hazards: [
      { x: 1000, y: 462, kind: 0 },
      { x: 1620, y: 462, kind: 1 },
    ],
  },

  // ---- Bana 2: lite hål och fler faror ----
  {
    name: "Skogsstigen",
    width: 3300,
    start: { x: 330, y: 430 },
    goal: { x: 2780, y: 440 },
    gaps: [
      { x: 900, w: 180 },
      { x: 1850, w: 200 },
    ],
    platforms: [
      { x: 520, y: 400, w: 150 },
      { x: 760, y: 320, w: 140 },
      { x: 900, y: 430, w: 150 }, // bro över hålet
      { x: 1200, y: 360, w: 170 },
      { x: 1500, y: 300, w: 140 },
      { x: 1700, y: 390, w: 140 },
      { x: 1850, y: 440, w: 160 }, // bro över hålet
      { x: 2150, y: 350, w: 160 },
      { x: 2450, y: 400, w: 170 },
    ],
    treats: [
      { x: 760, y: 270 },
      { x: 1200, y: 310 },
      { x: 1500, y: 250 },
      { x: 2150, y: 300 },
      { x: 2450, y: 350 },
      { x: 620, y: 455 },
      { x: 2650, y: 455 },
    ],
    hazards: [
      { x: 680, y: 462, kind: 0 },
      { x: 1380, y: 462, kind: 1 },
      { x: 2300, y: 462, kind: 0 },
    ],
  },

  // ---- Bana 3: längst och klämmigast ----
  {
    name: "Berget",
    width: 3900,
    start: { x: 330, y: 430 },
    goal: { x: 3380, y: 440 },
    gaps: [
      { x: 760, w: 190 },
      { x: 1500, w: 220 },
      { x: 2400, w: 220 },
    ],
    platforms: [
      { x: 460, y: 400, w: 140 },
      { x: 760, y: 430, w: 150 },
      { x: 1050, y: 350, w: 150 },
      { x: 1280, y: 280, w: 130 },
      { x: 1500, y: 430, w: 150 },
      { x: 1780, y: 360, w: 140 },
      { x: 2050, y: 300, w: 130 },
      { x: 2400, y: 430, w: 150 },
      { x: 2700, y: 360, w: 140 },
      { x: 2950, y: 300, w: 140 },
      { x: 3180, y: 380, w: 160 },
    ],
    treats: [
      { x: 1050, y: 300 },
      { x: 1280, y: 230 },
      { x: 1780, y: 310 },
      { x: 2050, y: 250 },
      { x: 2700, y: 310 },
      { x: 2950, y: 250 },
      { x: 460, y: 350 },
      { x: 3180, y: 330 },
    ],
    hazards: [
      { x: 600, y: 462, kind: 0 },
      { x: 1150, y: 462, kind: 1 },
      { x: 1950, y: 462, kind: 0 },
      { x: 2850, y: 462, kind: 1 },
      { x: 3050, y: 462, kind: 0 },
    ],
  },
];

export const LEVEL_COUNT = LEVELS.length;

export function getLevel(index) {
  return LEVELS[Phaser.Math.Clamp(index, 0, LEVELS.length - 1)];
}
