// Karaktärsdata. Allt som skiljer djuren åt ligger här – lätt att ändra med barnen.
// hazards = texturnycklar för faror på banan (måste finnas i assets/images/).
// prize   = det gyllene priset i mål.
// Butiks-föremålen är gemensamma för alla djur – se js/data/items.js.

export const CHARACTERS = {
  nala: {
    id: "nala",
    name: "Nala",
    species: "Hamster",
    color: 0xd9a066,
    texture: "nala",
    // Hamstern är rädd för katten och kvasten. (Lätt att ändra!)
    hazards: ["cat", "broom"],
    prize: { texture: "prize-seeds", name: "Solrosfrön" },
  },

  pompom: {
    id: "pompom",
    name: "Pompom",
    species: "Katt",
    color: 0x8d6e5c,
    texture: "pompom",
    // Katten är rädd för dammsugaren och vattenpölar.
    hazards: ["vacuum", "water"],
    prize: { texture: "prize-fish", name: "Färsk fisk" },
  },

  milla: {
    id: "milla",
    name: "Milla",
    species: "Hund",
    color: 0xf2d59b,
    texture: "milla",
    // Millas idé från barnen: rädd för män med keps + torrfoder.
    hazards: ["capman", "dryfood"],
    prize: { texture: "prize-wetfood", name: "Blötfoder" },
  },
};

export const CHARACTER_ORDER = ["nala", "pompom", "milla"];

export function getCharacter(id) {
  return CHARACTERS[id] || CHARACTERS.milla;
}
