// Gemensam butiks-katalog: samma föremål för alla tre djuren.
// Ändra namn/pris/ordning fritt – det syns direkt i butiken.
//
//  id        – unik nyckel (sparas i sparfilen)
//  name      – text i butiken
//  texture   – bildnyckel (laddas i PreloadScene, fil i assets/images/)
//  price     – kostnad i coins
//  colorable – true => kan färgas om (visar färgpalett, ritas med tint)
//  defaultColor – startfärg för färgbara föremål
//  offset    – var föremålet sitter på djuret i spelet (skärm-px från mitten)

export const ITEMS = [
  // --- Färgbara ---
  { id: "bow",        name: "Rosett",   texture: "acc-bow",        price: 10, colorable: true,  defaultColor: 0xff6fae, offset: { x: 0, y: -30, scale: 0.55 } },
  { id: "cap",        name: "Keps",     texture: "acc-cap",        price: 15, colorable: true,  defaultColor: 0x4d96ff, offset: { x: 4, y: -34, scale: 0.6 } },
  { id: "hat",        name: "Hatt",     texture: "acc-hat",        price: 20, colorable: true,  defaultColor: 0x8a5a2b, offset: { x: 0, y: -38, scale: 0.62 } },

  // --- Fasta färger ---
  { id: "heart",      name: "Hjärta",   texture: "acc-heart",      price: 10, colorable: false, offset: { x: 0, y: -44, scale: 0.5 } },
  { id: "donut",      name: "Donut",    texture: "acc-donut",      price: 15, colorable: false, offset: { x: 0, y: -38, scale: 0.5 } },
  { id: "sunglasses", name: "Coola brillor", texture: "acc-sunglasses", price: 15, colorable: false, offset: { x: 0, y: -10, scale: 0.62 } },
  { id: "nerd",       name: "Nörd-glasögon", texture: "acc-nerd",  price: 10, colorable: false, offset: { x: 0, y: -10, scale: 0.6 } },
  { id: "crown",      name: "Krona",    texture: "acc-crown",      price: 30, colorable: false, offset: { x: 0, y: -40, scale: 0.6 } },
  { id: "santa",      name: "Tomteluva", texture: "acc-santa",     price: 20, colorable: false, offset: { x: 2, y: -36, scale: 0.6 } },
  { id: "pumpkin",    name: "Pumpa",    texture: "acc-pumpkin",    price: 20, colorable: false, offset: { x: 0, y: -40, scale: 0.55 } },
  { id: "mario",      name: "Sweet Mario", texture: "acc-mario",   price: 25, colorable: false, offset: { x: 4, y: -34, scale: 0.6 } },
  { id: "orange",     name: "Apelsin",  texture: "acc-orange",     price: 10, colorable: false, offset: { x: 0, y: -42, scale: 0.5 } },
  { id: "wings",      name: "Ängla-vingar", texture: "acc-wings",  price: 25, colorable: false, offset: { x: 0, y: -6, scale: 0.85 } },
  { id: "tophat",     name: "Hatt & monokel", texture: "acc-tophat", price: 30, colorable: false, offset: { x: 2, y: -36, scale: 0.62 } },
  { id: "poop",       name: "Bajs",     texture: "acc-poop",       price: 5,  colorable: false, offset: { x: 0, y: -40, scale: 0.5 } },
];

// Färgpalett för "ändra färg".
export const COLORS = [
  0xff6fae, // rosa
  0xe7483b, // röd
  0xff9f43, // orange
  0xffd23f, // gul
  0x5bd66f, // grön
  0x4d96ff, // blå
  0xa066d9, // lila
  0xffffff, // vit
];

export function getItem(id) {
  if (!id) return null;
  return ITEMS.find((it) => it.id === id) || null;
}
