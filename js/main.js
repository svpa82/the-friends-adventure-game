// Vännerna – Äventyrsspelet
// Phaser-config och scen-registrering. Phaser laddas globalt via CDN (se index.html).

import PreloadScene from "./scenes/PreloadScene.js?v=10";
import TitleScene from "./scenes/TitleScene.js?v=10";
import CharacterSelectScene from "./scenes/CharacterSelectScene.js?v=10";
import LevelSelectScene from "./scenes/LevelSelectScene.js?v=10";
import GameScene from "./scenes/GameScene.js?v=10";
import ResultScene from "./scenes/ResultScene.js?v=10";
import ShopScene from "./scenes/ShopScene.js?v=10";

// Fast höjd; bredden anpassas efter skärmens proportioner (liggande) så att
// spelet fyller hela skärmbredden utan svarta kanter på mobilen.
export const GAME_HEIGHT = 540;

// Räkna ut bredden från liggande-aspekten (long/short), oberoende av om sidan
// laddas i porträtt eller landskap. Begränsas till ett rimligt intervall.
function landscapeWidth() {
  const long = Math.max(window.innerWidth, window.innerHeight);
  const short = Math.min(window.innerWidth, window.innerHeight) || 1;
  const w = Math.round(GAME_HEIGHT * (long / short));
  return Phaser.Math.Clamp(w, 720, 1400);
}

export const GAME_WIDTH = landscapeWidth();

const config = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#7ec8f0",
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1100 },
      debug: false,
    },
  },
  // Tillåt flera fingrar samtidigt (gå + hoppa på mobil). Standard är bara 1.
  input: {
    activePointers: 3,
  },
  scene: [
    PreloadScene,
    TitleScene,
    CharacterSelectScene,
    LevelSelectScene,
    GameScene,
    ResultScene,
    ShopScene,
  ],
};

const game = new Phaser.Game(config);
// Exponera för enkel felsökning i webbläsarkonsolen.
window.game = game;
