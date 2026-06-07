// Vännerna – Äventyrsspelet
// Phaser-config och scen-registrering. Phaser laddas globalt via CDN (se index.html).

import PreloadScene from "./scenes/PreloadScene.js?v=8";
import TitleScene from "./scenes/TitleScene.js?v=8";
import CharacterSelectScene from "./scenes/CharacterSelectScene.js?v=8";
import LevelSelectScene from "./scenes/LevelSelectScene.js?v=8";
import GameScene from "./scenes/GameScene.js?v=8";
import ResultScene from "./scenes/ResultScene.js?v=8";
import ShopScene from "./scenes/ShopScene.js?v=8";

// Spelets logiska storlek (liggande 16:9). Scale.FIT skalar till skärmen.
export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

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
