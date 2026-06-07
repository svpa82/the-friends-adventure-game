// Liten hjälpare som ritar en glad bakgrund: himmel, moln, kullar.
// Används av menyerna (GameScene har sin egen rullande bakgrund).

export function drawBackdrop(scene) {
  const w = scene.scale.width;
  const h = scene.scale.height;

  // Himmel (gradient)
  const sky = scene.add.graphics();
  sky.fillGradientStyle(0x7ec8f0, 0x7ec8f0, 0xcdeeff, 0xcdeeff, 1);
  sky.fillRect(0, 0, w, h);

  // Sol
  scene.add.circle(w - 90, 80, 46, 0xffe48a).setAlpha(0.9);
  scene.add.circle(w - 90, 80, 32, 0xffd23f);

  // Moln
  const cloud = (x, y, s) => {
    const g = scene.add.graphics();
    g.fillStyle(0xffffff, 0.95);
    g.fillCircle(x, y, 26 * s);
    g.fillCircle(x + 28 * s, y + 6 * s, 20 * s);
    g.fillCircle(x - 28 * s, y + 6 * s, 20 * s);
    g.fillRoundedRect(x - 44 * s, y, 88 * s, 22 * s, 11 * s);
  };
  cloud(150, 90, 1);
  cloud(420, 60, 0.8);
  cloud(700, 110, 0.9);

  // Gräskullar
  const hills = scene.add.graphics();
  hills.fillStyle(0x9bd66f, 1);
  hills.fillEllipse(180, h + 40, 520, 220);
  hills.fillEllipse(680, h + 50, 620, 240);
  // Mark längst ner
  hills.fillStyle(0x7cc24f, 1);
  hills.fillRect(0, h - 70, w, 70);
}
