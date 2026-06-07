// Karaktärsdata. Allt som skiljer djuren åt ligger här – lätt att ändra med barnen.
// hazards = texturnycklar för faror på banan (måste finnas i assets/images/).
// prize   = det gyllene priset i mål.
// accessories = saker man kan köpa i butiken för coins.

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
    accessories: [
      { id: "bow", name: "Rosett", texture: "acc-bow", price: 10 },
      { id: "glasses", name: "Glasögon", texture: "acc-glasses", price: 15 },
      { id: "crown", name: "Krona", texture: "acc-crown", price: 30 },
    ],
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
    accessories: [
      { id: "bow", name: "Rosett", texture: "acc-bow", price: 10 },
      { id: "scarf", name: "Halsduk", texture: "acc-scarf", price: 20 },
      { id: "crown", name: "Krona", texture: "acc-crown", price: 30 },
    ],
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
    accessories: [
      { id: "bow", name: "Rosett", texture: "acc-bow", price: 10 },
      { id: "scarf", name: "Halsduk", texture: "acc-scarf", price: 20 },
      { id: "crown", name: "Krona", texture: "acc-crown", price: 30 },
    ],
  },
};

export const CHARACTER_ORDER = ["nala", "pompom", "milla"];

export function getCharacter(id) {
  return CHARACTERS[id] || CHARACTERS.milla;
}

// Slår upp en accessoars data (texturnyckel mm) för en karaktär.
export function getAccessory(charId, accId) {
  if (!accId) return null;
  const char = getCharacter(charId);
  return char.accessories.find((a) => a.id === accId) || null;
}
