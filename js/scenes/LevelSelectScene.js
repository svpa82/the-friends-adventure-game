// Välj bana för det valda djuret. Banor låses upp när man klarar den föregående.

import { drawBackdrop } from "../ui/background.js?v=12";
import { makeButton } from "../ui/button.js?v=12";
import { getCharacter } from "../data/characters.js?v=12";
import { LEVELS } from "../data/levels.js?v=12";
import { getSelectedCharacter, getProgress, getCoins } from "../systems/save.js?v=12";

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super("LevelSelectScene");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;
    const charId = getSelectedCharacter();
    const char = getCharacter(charId);
    const cleared = getProgress(charId);

    drawBackdrop(this);

    // Rubrik + djuret
    this.add.image(80, 70, char.texture).setScale(0.7);
    this.add
      .text(140, 56, char.name, {
        fontSize: "40px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#e08a2e",
        strokeThickness: 6,
      })
      .setOrigin(0, 0.5);
    this.add
      .text(142, 92, "Välj en bana", { fontSize: "20px", color: "#3a2a14" })
      .setOrigin(0, 0.5);

    // Coins
    this.add.image(w - 130, 40, "coin").setScale(0.6);
    this.add
      .text(w - 108, 40, String(getCoins()), {
        fontSize: "26px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#3a2a14",
        strokeThickness: 5,
      })
      .setOrigin(0, 0.5);

    // Ban-knappar (avståndet anpassas så alla banor får plats i bredd)
    const spacing = Math.min(200, (w - 80) / LEVELS.length);
    const startX = w / 2 - ((LEVELS.length - 1) * spacing) / 2;
    LEVELS.forEach((level, i) => {
      const unlocked = i <= cleared;
      this._makeLevelButton(level, i, startX + i * spacing, 270, unlocked, charId);
    });

    // Butik + tillbaka
    makeButton(this, w / 2 - 140, h - 50, "🛍️ Butik", () => this.scene.start("ShopScene"), {
      width: 220,
      height: 58,
      color: 0xe08ac0,
      colorDark: 0xbf6aa0,
      fontSize: "26px",
    });
    makeButton(this, w / 2 + 140, h - 50, "◀ Byt djur", () => this.scene.start("CharacterSelectScene"), {
      width: 220,
      height: 58,
      color: 0x8a9aa8,
      colorDark: 0x6c7c8a,
      fontSize: "26px",
    });
  }

  _makeLevelButton(level, index, x, y, unlocked, charId) {
    const cardW = 150;
    const cardH = 180;
    const g = this.add.graphics();
    g.fillStyle(unlocked ? 0xffffff : 0xcfcfcf, unlocked ? 0.92 : 0.8);
    g.fillRoundedRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 18);
    g.lineStyle(4, unlocked ? 0x6bbf3a : 0x9a9a9a, 1);
    g.strokeRoundedRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 18);

    this.add
      .text(x, y - 55, `Bana ${index + 1}`, {
        fontSize: "26px",
        fontStyle: "bold",
        color: unlocked ? "#3a2a14" : "#777",
      })
      .setOrigin(0.5);
    this.add
      .text(x, y - 22, level.name, {
        fontSize: "18px",
        color: unlocked ? "#7a6a54" : "#999",
      })
      .setOrigin(0.5);

    if (unlocked) {
      makeButton(this, x, y + 40, "Spela ▶", () => {
        this.scene.start("GameScene", { charId, levelIndex: index });
      }, { width: 130, height: 50, fontSize: "22px" });
    } else {
      this.add.text(x, y + 30, "🔒", { fontSize: "44px" }).setOrigin(0.5);
    }
  }
}
