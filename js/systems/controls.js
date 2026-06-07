// Styrning: knappar på skärmen (för mobil) + piltangenter/WASD (för dator).
// GameScene skapar en Controls och frågar varje bildruta: left? right? hoppa?

export default class Controls {
  constructor(scene) {
    this.scene = scene;

    // Hålls-nere-läge
    this.left = false;
    this.right = false;
    this._jumpQueued = false; // touch-hopp som väntar på att läsas av

    // ---- Tangentbord ----
    const kb = scene.input.keyboard;
    this.keys = kb.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      w: Phaser.Input.Keyboard.KeyCodes.W,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this._buildTouchButtons();
  }

  _buildTouchButtons() {
    const scene = this.scene;
    const h = scene.scale.height;
    const w = scene.scale.width;
    const r = 52; // knappradie

    const makeButton = (x, y, label, color) => {
      const g = scene.add.graphics();
      g.fillStyle(color, 0.45);
      g.lineStyle(4, 0xffffff, 0.7);
      g.fillCircle(x, y, r);
      g.strokeCircle(x, y, r);
      g.setScrollFactor(0).setDepth(1000);

      const txt = scene.add
        .text(x, y, label, { fontSize: "44px", color: "#ffffff" })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1001);

      // Interaktiv träffyta (lite större än ritningen för barnfingrar)
      const zone = scene.add
        .circle(x, y, r + 14, 0xffffff, 0.001)
        .setScrollFactor(0)
        .setDepth(1002)
        .setInteractive({ useHandCursor: true });

      return { g, txt, zone };
    };

    // Vänster + höger nere till vänster
    const leftBtn = makeButton(80, h - 80, "◀", 0x4a78c0);
    const rightBtn = makeButton(200, h - 80, "▶", 0x4a78c0);
    // Hopp nere till höger
    const jumpBtn = makeButton(w - 90, h - 80, "⤒", 0x2fa84f);

    leftBtn.zone.on("pointerdown", () => (this.left = true));
    leftBtn.zone.on("pointerup", () => (this.left = false));
    leftBtn.zone.on("pointerout", () => (this.left = false));

    rightBtn.zone.on("pointerdown", () => (this.right = true));
    rightBtn.zone.on("pointerup", () => (this.right = false));
    rightBtn.zone.on("pointerout", () => (this.right = false));

    jumpBtn.zone.on("pointerdown", () => (this._jumpQueued = true));

    this.buttons = [leftBtn, rightBtn, jumpBtn];
  }

  // Hålls vänster?
  isLeft() {
    return this.left || this.keys.left.isDown || this.keys.a.isDown;
  }

  // Hålls höger?
  isRight() {
    return this.right || this.keys.right.isDown || this.keys.d.isDown;
  }

  // Trycktes hopp just nu? (läses av en gång per bildruta)
  jumpJustPressed() {
    const kbJump =
      Phaser.Input.Keyboard.JustDown(this.keys.up) ||
      Phaser.Input.Keyboard.JustDown(this.keys.w) ||
      Phaser.Input.Keyboard.JustDown(this.keys.space);
    if (this._jumpQueued || kbJump) {
      this._jumpQueued = false;
      return true;
    }
    return false;
  }

  destroy() {
    if (this.buttons) {
      this.buttons.forEach((b) => {
        b.g.destroy();
        b.txt.destroy();
        b.zone.destroy();
      });
    }
  }
}
