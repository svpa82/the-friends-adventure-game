// Återanvändbar knapp för menyerna – rund, glad, med tryck-känsla.

export function makeButton(scene, x, y, label, onClick, opts = {}) {
  const width = opts.width || 240;
  const height = opts.height || 64;
  const color = opts.color ?? 0x6bbf3a;
  const colorDark = opts.colorDark ?? 0x4f9e28;
  const fontSize = opts.fontSize || "28px";

  const container = scene.add.container(x, y);

  const g = scene.add.graphics();
  const draw = (fill) => {
    g.clear();
    g.fillStyle(colorDark, 1);
    g.fillRoundedRect(-width / 2, -height / 2 + 5, width, height, 18);
    g.fillStyle(fill, 1);
    g.fillRoundedRect(-width / 2, -height / 2, width, height - 2, 18);
    g.lineStyle(3, 0xffffff, 0.85);
    g.strokeRoundedRect(-width / 2, -height / 2, width, height - 2, 18);
  };
  draw(color);

  const txt = scene.add
    .text(0, -2, label, {
      fontSize,
      fontStyle: "bold",
      color: "#ffffff",
      stroke: colorDark,
      strokeThickness: 4,
    })
    .setOrigin(0.5);

  container.add([g, txt]);
  container.setSize(width, height);
  container.setInteractive({ useHandCursor: true });

  container.on("pointerover", () => draw(0x7fd24a));
  container.on("pointerout", () => {
    draw(color);
    container.setScale(1);
  });
  container.on("pointerdown", () => container.setScale(0.94));
  container.on("pointerup", () => {
    container.setScale(1);
    if (onClick) onClick();
  });

  return container;
}
