// Välj djur: Nala, Pompom eller Milla. Valet sparas.

import { drawBackdrop } from "../ui/background.js?v=10";
import { makeButton } from "../ui/button.js?v=10";
import { CHARACTER_ORDER, getCharacter } from "../data/characters.js?v=10";
import { setSelectedCharacter, getCoins } from "../systems/save.js?v=10";

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super("CharacterSelectScene");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    drawBackdrop(this);

    this.add
      .text(w / 2, 60, "Välj din kompis!", {
        fontSize: "44px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#e08a2e",
        strokeThickness: 7,
      })
      .setOrigin(0.5);

    // Coin-räknare
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

    // Tre kort
    const startX = w / 2 - 240;
    CHARACTER_ORDER.forEach((id, i) => {
      this._makeCard(getCharacter(id), startX + i * 240, 260);
    });

    makeButton(this, w / 2, h - 50, "◀ Tillbaka", () => this.scene.start("TitleScene"), {
      width: 200,
      height: 56,
      color: 0x8a9aa8,
      colorDark: 0x6c7c8a,
      fontSize: "24px",
    });
  }

  _makeCard(char, x, y) {
    const cardW = 200;
    const cardH = 250;

    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.9);
    g.fillRoundedRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 22);
    g.lineStyle(5, char.color, 1);
    g.strokeRoundedRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 22);

    const sprite = this.add.image(x, y - 30, char.texture).setScale(1.1);
    this.tweens.add({
      targets: sprite,
      y: y - 42,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    this.add
      .text(x, y + 62, char.name, {
        fontSize: "30px",
        fontStyle: "bold",
        color: "#3a2a14",
      })
      .setOrigin(0.5);
    this.add
      .text(x, y + 90, char.species, {
        fontSize: "20px",
        color: "#7a6a54",
      })
      .setOrigin(0.5);

    makeButton(this, x, y + 130, "Välj", () => {
      setSelectedCharacter(char.id);
      this.scene.start("LevelSelectScene");
    }, { width: 130, height: 50, fontSize: "24px" });
  }
}
