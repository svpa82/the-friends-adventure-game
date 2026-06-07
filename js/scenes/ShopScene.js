// Butik: köp accessoarer för coins och utrusta dem på ditt djur.

import { drawBackdrop } from "../ui/background.js?v=3";
import { makeButton } from "../ui/button.js?v=3";
import { getCharacter } from "../data/characters.js?v=3";
import {
  getSelectedCharacter,
  getCoins,
  owns,
  buyItem,
  getEquipped,
  setEquipped,
} from "../systems/save.js?v=3";

export default class ShopScene extends Phaser.Scene {
  constructor() {
    super("ShopScene");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;
    const charId = getSelectedCharacter();
    const char = getCharacter(charId);

    drawBackdrop(this);

    this.add
      .text(w / 2, 50, "🛍️ Butiken", {
        fontSize: "44px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#bf6aa0",
        strokeThickness: 7,
      })
      .setOrigin(0.5);

    // Djuret + coins
    this.add.image(70, 60, char.texture).setScale(0.6);
    this.add.image(w - 130, 40, "coin").setScale(0.6);
    this.add
      .text(w - 108, 40, String(getCoins()), {
        fontSize: "26px", fontStyle: "bold", color: "#ffffff",
        stroke: "#3a2a14", strokeThickness: 5,
      })
      .setOrigin(0, 0.5);

    // Accessoar-kort
    const items = char.accessories;
    const startX = w / 2 - ((items.length - 1) * 230) / 2;
    items.forEach((item, i) => {
      this._makeShopCard(char, item, startX + i * 230, 260);
    });

    makeButton(this, w / 2, h - 50, "◀ Tillbaka", () => this.scene.start("LevelSelectScene"), {
      width: 220, height: 58, color: 0x8a9aa8, colorDark: 0x6c7c8a, fontSize: "26px",
    });
  }

  _makeShopCard(char, item, x, y) {
    const cardW = 200;
    const cardH = 240;
    const owned = owns(char.id, item.id);
    const equipped = getEquipped(char.id) === item.id;

    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.92);
    g.fillRoundedRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 20);
    g.lineStyle(5, equipped ? 0x6bbf3a : char.color, 1);
    g.strokeRoundedRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 20);

    this.add.image(x, y - 50, item.texture).setScale(1.3);
    this.add
      .text(x, y + 10, item.name, {
        fontSize: "26px", fontStyle: "bold", color: "#3a2a14",
      })
      .setOrigin(0.5);

    if (!owned) {
      // Pris (siffra + liten coin-bild)
      this.add
        .text(x - 10, y + 42, String(item.price), {
          fontSize: "22px",
          fontStyle: "bold",
          color: "#7a6a54",
        })
        .setOrigin(1, 0.5);
      this.add.image(x + 8, y + 42, "coin").setScale(0.45);

      const canAfford = getCoins() >= item.price;
      makeButton(this, x, y + 82, canAfford ? "Köp" : "För dyrt", () => {
        if (buyItem(char.id, item.id, item.price)) {
          setEquipped(char.id, item.id); // utrusta direkt
          this.scene.restart();
        }
      }, {
        width: 140, height: 48, fontSize: "22px",
        color: canAfford ? 0x6bbf3a : 0xbbbbbb,
        colorDark: canAfford ? 0x4f9e28 : 0x999999,
      });
    } else if (equipped) {
      this.add
        .text(x, y + 42, "✅ På", { fontSize: "22px", fontStyle: "bold", color: "#3a8a3a" })
        .setOrigin(0.5);
      makeButton(this, x, y + 82, "Ta av", () => {
        setEquipped(char.id, null);
        this.scene.restart();
      }, { width: 140, height: 48, fontSize: "22px", color: 0x8a9aa8, colorDark: 0x6c7c8a });
    } else {
      this.add
        .text(x, y + 42, "Köpt", { fontSize: "22px", color: "#7a6a54" })
        .setOrigin(0.5);
      makeButton(this, x, y + 82, "Sätt på", () => {
        setEquipped(char.id, item.id);
        this.scene.restart();
      }, { width: 140, height: 48, fontSize: "22px" });
    }
  }
}
