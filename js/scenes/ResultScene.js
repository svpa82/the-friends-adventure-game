// Visas efter en bana: antingen vinst (gyllene pris) eller game over.

import { drawBackdrop } from "../ui/background.js?v=9";
import { makeButton } from "../ui/button.js?v=9";
import { getCharacter } from "../data/characters.js?v=9";
import { LEVEL_COUNT } from "../data/levels.js?v=9";
import { getCoins } from "../systems/save.js?v=9";

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super("ResultScene");
  }

  init(data) {
    this.win = data.win;
    this.charId = data.charId;
    this.levelIndex = data.levelIndex;
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;
    const char = getCharacter(this.charId);

    drawBackdrop(this);

    if (this.win) {
      this._winScreen(w, h, char);
    } else {
      this._loseScreen(w, h, char);
    }

    // Coins längst ner
    this.add.image(w / 2 - 24, h - 24, "coin").setScale(0.5);
    this.add
      .text(w / 2, h - 24, String(getCoins()), {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#3a2a14",
      })
      .setOrigin(0, 0.5);
  }

  _winScreen(w, h, char) {
    this.add
      .text(w / 2, 80, "BRA JOBBAT! 🎉", {
        fontSize: "56px",
        fontStyle: "bold",
        color: "#ffce3e",
        stroke: "#a85e12",
        strokeThickness: 10,
      })
      .setOrigin(0.5);

    this.add
      .text(w / 2, 140, `${char.name} klarade banan!`, {
        fontSize: "26px",
        color: "#ffffff",
        stroke: "#3a8fc0",
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    // Det gyllene priset
    const prize = this.add.image(w / 2, 250, char.prize.texture).setScale(1.6);
    this.tweens.add({
      targets: prize,
      angle: { from: -6, to: 6 },
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
    this.add
      .text(w / 2, 330, `Du vann: ${char.prize.name}!`, {
        fontSize: "26px",
        fontStyle: "bold",
        color: "#3a2a14",
      })
      .setOrigin(0.5);

    this._confetti(w);

    const hasNext = this.levelIndex + 1 < LEVEL_COUNT;
    const y = h - 80;
    if (hasNext) {
      makeButton(this, w / 2 - 150, y, "Nästa bana ▶", () => {
        this.scene.start("GameScene", { charId: this.charId, levelIndex: this.levelIndex + 1 });
      }, { width: 220, height: 60, fontSize: "24px" });
      makeButton(this, w / 2 + 150, y, "Meny", () => this.scene.start("LevelSelectScene"), {
        width: 180, height: 60, color: 0x8a9aa8, colorDark: 0x6c7c8a, fontSize: "24px",
      });
    } else {
      this.add
        .text(w / 2, y - 50, "Du klarade alla banor! ⭐", {
          fontSize: "24px", fontStyle: "bold", color: "#3a2a14",
        })
        .setOrigin(0.5);
      makeButton(this, w / 2, y, "Till menyn", () => this.scene.start("LevelSelectScene"), {
        width: 240, height: 60, fontSize: "26px",
      });
    }
  }

  _loseScreen(w, h, char) {
    this.add
      .text(w / 2, 110, "Aj då! 💔", {
        fontSize: "56px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#c0392b",
        strokeThickness: 9,
      })
      .setOrigin(0.5);

    const sprite = this.add.image(w / 2, 250, char.texture).setScale(1.4);
    sprite.setTint(0xbbbbbb);
    this.tweens.add({ targets: sprite, angle: { from: -4, to: 4 }, duration: 600, yoyo: true, repeat: -1 });

    this.add
      .text(w / 2, 340, "Hjärtana tog slut – försök igen!", {
        fontSize: "24px", color: "#3a2a14",
      })
      .setOrigin(0.5);

    const y = h - 80;
    makeButton(this, w / 2 - 150, y, "Försök igen", () => {
      this.scene.start("GameScene", { charId: this.charId, levelIndex: this.levelIndex });
    }, { width: 220, height: 60, fontSize: "24px" });
    makeButton(this, w / 2 + 150, y, "Meny", () => this.scene.start("LevelSelectScene"), {
      width: 180, height: 60, color: 0x8a9aa8, colorDark: 0x6c7c8a, fontSize: "24px",
    });
  }

  _confetti(w) {
    const colors = [0xff6fae, 0xffce3e, 0x5bd6a0, 0x5b8fd6, 0xff8a5b];
    for (let i = 0; i < 40; i++) {
      const x = Phaser.Math.Between(0, w);
      const star = this.add.rectangle(x, -20, 10, 10, Phaser.Utils.Array.GetRandom(colors));
      star.setAngle(Phaser.Math.Between(0, 360));
      this.tweens.add({
        targets: star,
        y: this.scale.height + 40,
        angle: star.angle + 360,
        duration: Phaser.Math.Between(2000, 4000),
        delay: Phaser.Math.Between(0, 1500),
        repeat: -1,
        ease: "Linear",
      });
    }
  }
}
