// Laddar all grafik och visar en enkel laddningsruta.

const IMAGES = [
  // djuren
  ["nala", "nala.svg", 170, 170],
  ["pompom", "pompom.svg", 170, 170],
  ["milla", "milla.svg", 170, 170],
  // samlas / coins
  ["treat", "treat.svg", 56, 56],
  ["coin", "coin.svg", 56, 56],
  // faror
  ["capman", "capman.svg", 100, 112],
  ["dryfood", "dryfood.svg", 86, 86],
  ["cat", "cat.svg", 100, 100],
  ["broom", "broom.svg", 72, 96],
  ["vacuum", "vacuum.svg", 100, 88],
  ["water", "water.svg", 100, 62],
  // priser
  ["prize-wetfood", "prize-wetfood.svg", 120, 120],
  ["prize-fish", "prize-fish.svg", 120, 120],
  ["prize-seeds", "prize-seeds.svg", 120, 120],
  // accessoarer
  ["acc-bow", "acc-bow.svg", 70, 47],
  ["acc-glasses", "acc-glasses.svg", 84, 36],
  ["acc-crown", "acc-crown.svg", 72, 48],
  ["acc-scarf", "acc-scarf.svg", 84, 48],
  // hud
  ["heart", "heart.svg", 44, 40],
];

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    const { width, height } = this.scale;

    // Bakgrund + laddningstext
    this.cameras.main.setBackgroundColor("#7ec8f0");
    this.add
      .text(width / 2, height / 2 - 60, "Vännerna", {
        fontSize: "52px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#e08a2e",
        strokeThickness: 8,
      })
      .setOrigin(0.5);
    this.add
      .text(width / 2, height / 2 - 10, "Laddar… 🐾", {
        fontSize: "24px",
        color: "#3a2a14",
      })
      .setOrigin(0.5);

    // Laddningsstapel
    const barW = 360;
    const barX = width / 2 - barW / 2;
    const barY = height / 2 + 40;
    const border = this.add.graphics();
    border.lineStyle(4, 0xffffff, 1).strokeRoundedRect(barX, barY, barW, 26, 13);
    const bar = this.add.graphics();
    this.load.on("progress", (p) => {
      bar.clear();
      bar.fillStyle(0xffce3e, 1);
      bar.fillRoundedRect(barX + 4, barY + 4, (barW - 8) * p, 18, 9);
    });

    // Ladda alla bilder
    this.load.path = "assets/images/";
    IMAGES.forEach(([key, file, w, h]) => {
      this.load.svg(key, file, { width: w, height: h });
    });
  }

  create() {
    this.scene.start("TitleScene");
  }
}
