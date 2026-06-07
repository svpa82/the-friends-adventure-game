// Spar-system: läser/skriver spelarens framsteg i localStorage.
// Allt går via detta så vi har ett enda ställe för spar-logik.

const KEY = "vannerna-save-v1";

const DEFAULT_SAVE = {
  coins: 0,
  selectedCharacter: "milla",
  owned: { nala: [], pompom: [], milla: [] }, // köpta accessoarer per djur
  equipped: { nala: null, pompom: null, milla: null }, // utrustad accessoar per djur
  progress: { nala: 0, pompom: 0, milla: 0 }, // antal klarade banor per djur
  itemColors: {}, // vald färg per färgbart föremål: { itemId: 0xRRGGBB }
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let cache = null;

export function load() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      cache = deepClone(DEFAULT_SAVE);
    } else {
      // Slå ihop med default så nya fält inte saknas i gamla sparfiler.
      cache = Object.assign(deepClone(DEFAULT_SAVE), JSON.parse(raw));
      cache.owned = Object.assign(deepClone(DEFAULT_SAVE.owned), cache.owned);
      cache.equipped = Object.assign(deepClone(DEFAULT_SAVE.equipped), cache.equipped);
      cache.progress = Object.assign(deepClone(DEFAULT_SAVE.progress), cache.progress);
      cache.itemColors = Object.assign({}, cache.itemColors);
    }
  } catch (e) {
    cache = deepClone(DEFAULT_SAVE);
  }
  return cache;
}

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(load()));
  } catch (e) {
    // localStorage kan vara avstängt (privat läge) – spelet funkar ändå, bara utan att spara.
  }
}

export function getCoins() {
  return load().coins;
}

export function addCoins(n) {
  load().coins += n;
  save();
  return load().coins;
}

export function spendCoins(n) {
  const data = load();
  if (data.coins < n) return false;
  data.coins -= n;
  save();
  return true;
}

export function getSelectedCharacter() {
  return load().selectedCharacter;
}

export function setSelectedCharacter(id) {
  load().selectedCharacter = id;
  save();
}

export function getProgress(charId) {
  return load().progress[charId] || 0;
}

export function setProgress(charId, levelsCleared) {
  const data = load();
  // Spara bara om det är ett nytt rekord (så man inte tappar upplåsta banor).
  if (levelsCleared > (data.progress[charId] || 0)) {
    data.progress[charId] = levelsCleared;
    save();
  }
}

export function owns(charId, itemId) {
  return load().owned[charId].includes(itemId);
}

export function buyItem(charId, itemId, price) {
  if (owns(charId, itemId)) return true;
  if (!spendCoins(price)) return false;
  load().owned[charId].push(itemId);
  save();
  return true;
}

export function getEquipped(charId) {
  return load().equipped[charId];
}

export function setEquipped(charId, itemId) {
  load().equipped[charId] = itemId;
  save();
}

// Vald färg för ett färgbart föremål (delas mellan alla djur).
// Returnerar null om ingen färg valts – då används föremålets defaultColor.
export function getItemColor(itemId) {
  const c = load().itemColors[itemId];
  return c === undefined ? null : c;
}

export function setItemColor(itemId, color) {
  load().itemColors[itemId] = color;
  save();
}

// Mest för felsökning / "börja om från början"-knapp i framtiden.
export function resetSave() {
  cache = deepClone(DEFAULT_SAVE);
  save();
}
