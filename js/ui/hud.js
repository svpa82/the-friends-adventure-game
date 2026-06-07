// HUD: hjärtan uppe till vänster, coin-räknare uppe till höger.
// Ligger fast på skärmen (scrollFactor 0) ovanpå banan.

export default class Hud {
  constructor(scene, maxHearts, coins) {
    this.scene = scene;
    this.maxHearts = maxHearts;
    this.hearts = [];

    // Hjärtan
    for (let i = 0; i < maxHearts; i++) {
      const heart = scene.add
        .image(34 + i * 42, 34, "heart")
        .setScrollFactor(0)
        .setDepth(900)
        .setScale(0.8);
      this.hearts.push(heart);
    }

    // Coin-ikon + text uppe till höger
    const w = scene.scale.width;
    this.coinIcon = scene.add
      .image(w - 120, 34, "coin")
      .setScrollFactor(0)
      .setDepth(900)
      .setScale(0.7);
    this.coinText = scene.add
      .text(w - 96, 34, String(coins), {
        fontSize: "30px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#3a2a14",
        strokeThickness: 5,
      })
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(900);
  }

  setHearts(n) {
    this.hearts.forEach((heart, i) => {
      if (i < n) {
        heart.setAlpha(1).clearTint();
      } else {
        heart.setAlpha(0.35).setTint(0x555555);
      }
    });
  }

  setCoins(n) {
    this.coinText.setText(String(n));
    // liten studs när man får coins
    this.scene.tweens.add({
      targets: this.coinIcon,
      scale: 0.9,
      duration: 100,
      yoyo: true,
    });
  }
}
