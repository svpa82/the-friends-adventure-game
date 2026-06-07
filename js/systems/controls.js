// Styrning: knappar på skärmen (för mobil) + piltangenter/WASD (för dator).
//
// Mobil-knapparna hanteras genom att POLLA alla aktiva fingrar varje bildruta
// (istället för pointerdown/up/out-händelser). Det gör att man kan hålla
// gå-knappen och trycka hopp samtidigt – flera fingrar krockar inte längre.
// Kräver flera aktiva pekare i game-config (input.activePointers).

const BTN_RADIUS = 52; // ritad storlek
const TOUCH_RADIUS = 70; // träffyta (lite större för barnfingrar)

export default class Controls {
  constructor(scene) {
    this.scene = scene;
    this._prevJumpDown = false;
    this.jumpPressed = false;

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

    // Knappositioner i spel-koordinater (skärmfasta).
    this.btnLeft = { x: 80, y: h - 80, r: TOUCH_RADIUS };
    this.btnRight = { x: 200, y: h - 80, r: TOUCH_RADIUS };
    this.btnJump = { x: w - 90, y: h - 80, r: TOUCH_RADIUS };

    this._gfx = [];
    this._drawButton(this.btnLeft, "◀", 0x4a78c0);
    this._drawButton(this.btnRight, "▶", 0x4a78c0);
    this._drawButton(this.btnJump, "⤒", 0x2fa84f);
  }

  _drawButton(btn, label, color) {
    const scene = this.scene;
    const g = scene.add.graphics();
    g.fillStyle(color, 0.45);
    g.lineStyle(4, 0xffffff, 0.7);
    g.fillCircle(btn.x, btn.y, BTN_RADIUS);
    g.strokeCircle(btn.x, btn.y, BTN_RADIUS);
    g.setScrollFactor(0).setDepth(1000);

    const txt = scene.add
      .text(btn.x, btn.y, label, { fontSize: "44px", color: "#ffffff" })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1001);

    this._gfx.push(g, txt);
  }

  // Är något nedtryckt finger inom knappens träffyta?
  // pointer.x/y är i spel-koordinater (skärmrymd), precis som knapparna.
  _anyFingerOn(btn) {
    const pointers = this.scene.input.manager.pointers;
    for (let i = 0; i < pointers.length; i++) {
      const p = pointers[i];
      if (!p.isDown) continue;
      const dx = p.x - btn.x;
      const dy = p.y - btn.y;
      if (dx * dx + dy * dy <= btn.r * btn.r) return true;
    }
    return false;
  }

  // Anropas en gång per bildruta (av GameScene) innan tillstånd läses.
  update() {
    const kbJustDown =
      Phaser.Input.Keyboard.JustDown(this.keys.up) ||
      Phaser.Input.Keyboard.JustDown(this.keys.w) ||
      Phaser.Input.Keyboard.JustDown(this.keys.space);

    const padDown = this._anyFingerOn(this.btnJump);
    const padEdge = padDown && !this._prevJumpDown; // bara i ögonblicket man trycker
    this._prevJumpDown = padDown;

    this.jumpPressed = kbJustDown || padEdge;
  }

  isLeft() {
    return this.keys.left.isDown || this.keys.a.isDown || this._anyFingerOn(this.btnLeft);
  }

  isRight() {
    return this.keys.right.isDown || this.keys.d.isDown || this._anyFingerOn(this.btnRight);
  }

  destroy() {
    if (this._gfx) this._gfx.forEach((o) => o.destroy());
  }
}
