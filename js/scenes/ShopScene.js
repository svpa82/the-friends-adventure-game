// Butik: köp föremål för coins och utrusta dem på ditt djur.
// Samma sortiment för alla djur (js/data/items.js). Många föremål => sidor.
// Färgbara föremål (rosett/keps/hatt): köp en gång => byt färg fritt via paletten.

import { drawBackdrop } from "../ui/background.js?v=6";
import { makeButton } from "../ui/button.js?v=6";
import { getCharacter } from "../data/characters.js?v=6";
import { ITEMS, COLORS } from "../data/items.js?v=6";
import {
  getSelectedCharacter,
  getCoins,
  owns,
  buyItem,
  getEquipped,
  setEquipped,
  getItemColor,
  setItemColor,
} from "../systems/save.js?v=6";

const PER_PAGE = 4;

export default class ShopScene extends Phaser.Scene {
  constructor() {
    super("ShopScene");
  }

  init(data) {
    this.page = (data && data.page) || 0;
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;
    const charId = getSelectedCharacter();
    const char = getCharacter(charId);
    this.charId = charId;

    drawBackdrop(this);

    this.add
      .text(w / 2, 44, "🛍️ Butiken", {
        fontSize: "40px", fontStyle: "bold", color: "#ffffff",
        stroke: "#bf6aa0", strokeThickness: 7,
      })
      .setOrigin(0.5);

    // Djuret + coins
    this.add.image(60, 50, char.texture).setScale(0.5);
    this.add
      .text(110, 50, char.name, { fontSize: "22px", fontStyle: "bold", color: "#ffffff", stroke: "#3a8fc0", strokeThickness: 4 })
      .setOrigin(0, 0.5);
    this.add.image(w - 130, 44, "coin").setScale(0.6);
    this.add
      .text(w - 108, 44, String(getCoins()), {
        fontSize: "26px", fontStyle: "bold", color: "#ffffff", stroke: "#3a2a14", strokeThickness: 5,
      })
      .setOrigin(0, 0.5);

    // Sidor
    const pageCount = Math.ceil(ITEMS.length / PER_PAGE);
    this.page = Phaser.Math.Clamp(this.page, 0, pageCount - 1);
    const start = this.page * PER_PAGE;
    const pageItems = ITEMS.slice(start, start + PER_PAGE);

    const spacing = 224;
    const startX = w / 2 - ((pageItems.length - 1) * spacing) / 2;
    pageItems.forEach((item, i) => {
      this._makeCard(char, item, startX + i * spacing, 270);
    });

    // Pil-knappar mellan sidor
    if (this.page > 0) {
      this._arrow(40, h / 2, "◀", () => this.scene.restart({ page: this.page - 1 }));
    }
    if (this.page < pageCount - 1) {
      this._arrow(w - 40, h / 2, "▶", () => this.scene.restart({ page: this.page + 1 }));
    }
    this.add
      .text(w / 2, h - 92, `Sida ${this.page + 1} / ${pageCount}`, {
        fontSize: "18px", color: "#3a2a14",
      })
      .setOrigin(0.5);

    makeButton(this, w / 2, h - 44, "◀ Tillbaka", () => this.scene.start("LevelSelectScene"), {
      width: 220, height: 52, color: 0x8a9aa8, colorDark: 0x6c7c8a, fontSize: "24px",
    });
  }

  _arrow(x, y, label, cb) {
    const c = this.add.circle(x, y, 30, 0x4a78c0, 0.9).setInteractive({ useHandCursor: true });
    c.setStrokeStyle(4, 0xffffff);
    this.add.text(x, y - 2, label, { fontSize: "30px", color: "#ffffff" }).setOrigin(0.5);
    c.on("pointerdown", cb);
  }

  _makeCard(char, item, x, y) {
    const cardW = 196;
    const cardH = 320;
    const owned = owns(char.id, item.id);
    const equipped = getEquipped(char.id) === item.id;

    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.93);
    g.fillRoundedRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 18);
    g.lineStyle(5, equipped ? 0x6bbf3a : 0xe0b94e, 1);
    g.strokeRoundedRect(x - cardW / 2, y - cardH / 2, cardW, cardH, 18);

    // Bild (färgad om färgbart)
    const img = this.add.image(x, y - 96, item.texture).setScale(1.25);
    if (item.colorable) {
      const col = getItemColor(item.id);
      img.setTint(col === null ? item.defaultColor : col);
    }

    this.add
      .text(x, y - 36, item.name, { fontSize: "22px", fontStyle: "bold", color: "#3a2a14", align: "center", wordWrap: { width: cardW - 16 } })
      .setOrigin(0.5);

    // Köp / utrusta-knapp
    if (!owned) {
      this.add.text(x - 12, y + 6, String(item.price), { fontSize: "22px", fontStyle: "bold", color: "#7a6a54" }).setOrigin(1, 0.5);
      this.add.image(x + 8, y + 6, "coin").setScale(0.45);

      const canAfford = getCoins() >= item.price;
      makeButton(this, x, y + 48, canAfford ? "Köp" : "För dyrt", () => {
        if (buyItem(char.id, item.id, item.price)) {
          setEquipped(char.id, item.id);
          this.scene.restart({ page: this.page });
        }
      }, {
        width: 150, height: 46, fontSize: "22px",
        color: canAfford ? 0x6bbf3a : 0xbbbbbb,
        colorDark: canAfford ? 0x4f9e28 : 0x999999,
      });
    } else if (equipped) {
      this.add.text(x, y + 6, "✅ På", { fontSize: "20px", fontStyle: "bold", color: "#3a8a3a" }).setOrigin(0.5);
      makeButton(this, x, y + 48, "Ta av", () => {
        setEquipped(char.id, null);
        this.scene.restart({ page: this.page });
      }, { width: 150, height: 46, fontSize: "22px", color: 0x8a9aa8, colorDark: 0x6c7c8a });
    } else {
      this.add.text(x, y + 6, "Köpt", { fontSize: "20px", color: "#7a6a54" }).setOrigin(0.5);
      makeButton(this, x, y + 48, "Sätt på", () => {
        setEquipped(char.id, item.id);
        this.scene.restart({ page: this.page });
      }, { width: 150, height: 46, fontSize: "22px" });
    }

    // Färgpalett (bara för färgbara som man äger)
    if (item.colorable && owned) {
      this._palette(item, x, y + 100, cardW);
    } else if (item.colorable) {
      this.add.text(x, y + 100, "🎨 köp för att färga", { fontSize: "13px", color: "#9a8a74" }).setOrigin(0.5);
    }
  }

  _palette(item, cx, y, cardW) {
    const current = getItemColor(item.id);
    const sel = current === null ? item.defaultColor : current;
    const n = COLORS.length;
    const gap = 21;
    const startX = cx - ((n - 1) * gap) / 2;
    COLORS.forEach((col, i) => {
      const sx = startX + i * gap;
      const dot = this.add.circle(sx, y, 8.5, col).setInteractive({ useHandCursor: true });
      dot.setStrokeStyle(col === sel ? 4 : 1.5, col === sel ? 0x222222 : 0xaaaaaa);
      dot.on("pointerdown", () => {
        setItemColor(item.id, col);
        this.scene.restart({ page: this.page });
      });
    });
  }
}
