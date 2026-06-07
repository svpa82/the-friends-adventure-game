// Titelskärm: logga, de tre djuren som studsar, och en STARTA-knapp.

import { drawBackdrop } from "../ui/background.js?v=10";
import { makeButton } from "../ui/button.js?v=10";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    drawBackdrop(this);

    // Titel
    this.add
      .text(w / 2, 90, "VÄNNERNA", {
        fontSize: "72px",
        fontStyle: "bold",
        color: "#ffce3e",
        stroke: "#a85e12",
        strokeThickness: 12,
      })
      .setOrigin(0.5);
    this.add
      .text(w / 2, 150, "Äventyrsspelet", {
        fontSize: "30px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#3a8fc0",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    // De tre djuren som studsar glatt
    const trio = [
      { key: "nala", x: w / 2 - 180 },
      { key: "pompom", x: w / 2 },
      { key: "milla", x: w / 2 + 180 },
    ];
    trio.forEach((p, i) => {
      const sprite = this.add.image(p.x, 300, p.key).setScale(1.1);
      this.tweens.add({
        targets: sprite,
        y: 282,
        duration: 700,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
        delay: i * 180,
      });
    });

    // Starta-knapp
    makeButton(this, w / 2, h - 70, "STARTA  ▶", () => this.scene.start("CharacterSelectScene"), {
      width: 280,
      height: 72,
      fontSize: "34px",
    });

    this.add
      .text(w / 2, h - 18, "Ett spel av Mimmi & Caisa 💛", {
        fontSize: "16px",
        color: "#3a2a14",
      })
      .setOrigin(0.5);
  }
}
