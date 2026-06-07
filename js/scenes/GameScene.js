// Själva hoppbanan. Bygger banan från data, hanterar rörelse, faror,
// godsaker, hjärtan och målet.

import Controls from "../systems/controls.js?v=8";
import Hud from "../ui/hud.js?v=8";
import { getCharacter } from "../data/characters.js?v=8";
import { getItem } from "../data/items.js?v=8";
import { getLevel, GROUND_TOP } from "../data/levels.js?v=8";
import { getEquipped, getItemColor, getCoins, addCoins, setProgress } from "../systems/save.js?v=8";

const MOVE_SPEED = 235;
const JUMP_VELOCITY = -600;
const MAX_HEARTS = 3;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  init(data) {
    this.charId = data.charId || "milla";
    this.levelIndex = data.levelIndex ?? 0;
  }

  create() {
    const char = getCharacter(this.charId);
    const level = getLevel(this.levelIndex);
    this.char = char;
    this.level = level;
    this.hearts = MAX_HEARTS;
    this.invuln = false;
    this.finished = false;
    this.safePos = { x: level.start.x, y: level.start.y };

    const screenH = this.scale.height;

    // Världen är bredare än skärmen; lite extra höjd så man kan ramla i hål.
    this.physics.world.setBounds(0, 0, level.width, screenH + 250);
    this.cameras.main.setBounds(0, 0, level.width, screenH);

    this._buildBackground(level.width, screenH);
    this._buildGround(level, screenH);
    this._buildPlatforms(level);
    this._buildTreats(level);
    this._buildHazards(level, char);
    this._buildGoal(level, char);
    this._buildPlayer(level, char);

    // Kollisioner
    this.physics.add.collider(this.player, this.solids);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(this.player, this.treats, this._collectTreat, null, this);
    this.physics.add.overlap(this.player, this.hazards, this._hitHazard, null, this);
    this.physics.add.overlap(this.player, this.goal, this._reachGoal, null, this);

    // Kamera följer djuret
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(120, 200);

    // HUD + kontroller
    this.hud = new Hud(this, MAX_HEARTS, getCoins());
    this.hud.setHearts(this.hearts);
    this.controls = new Controls(this);

    this._buildTopBar(level);
  }

  // ---------- Bygg-hjälpare ----------

  _buildBackground(worldW, screenH) {
    // Himmel (fast på skärmen)
    const sky = this.add.graphics().setScrollFactor(0).setDepth(-10);
    sky.fillGradientStyle(0x7ec8f0, 0x7ec8f0, 0xcdeeff, 0xcdeeff, 1);
    sky.fillRect(0, 0, this.scale.width, screenH);
    this.add.circle(this.scale.width - 90, 80, 44, 0xffd23f).setScrollFactor(0).setDepth(-9);

    // Moln med långsam parallax
    for (let i = 0; i < Math.ceil(worldW / 400); i++) {
      const x = 150 + i * 400;
      const y = 70 + (i % 2) * 50;
      const c = this.add.graphics().setDepth(-8).setScrollFactor(0.3);
      c.fillStyle(0xffffff, 0.95);
      c.fillCircle(x, y, 26);
      c.fillCircle(x + 26, y + 6, 18);
      c.fillCircle(x - 26, y + 6, 18);
    }

    // Dekorativa kullar långt bak
    const hills = this.add.graphics().setDepth(-7).setScrollFactor(0.5);
    hills.fillStyle(0x9bd66f, 1);
    for (let x = 0; x < worldW; x += 500) {
      hills.fillEllipse(x + 250, screenH + 20, 600, 260);
    }
  }

  _buildGround(level, screenH) {
    this.solids = [];
    const groundColorTop = 0x7cc24f;
    const groundColorDirt = 0x9b6b3c;
    const top = GROUND_TOP;
    const hgt = screenH - top + 80;

    // Marken delas upp i segment som hoppar över hålen.
    const segments = this._groundSegments(level);
    segments.forEach((seg) => {
      const cx = seg.x + seg.w / 2;
      const cy = top + hgt / 2;

      const g = this.add.graphics().setDepth(1);
      g.fillStyle(groundColorDirt, 1);
      g.fillRect(seg.x, top + 16, seg.w, hgt);
      g.fillStyle(groundColorTop, 1);
      g.fillRect(seg.x, top, seg.w, 20);
      // lite grästofsar
      g.fillStyle(0x8fd95e, 1);
      for (let gx = seg.x + 12; gx < seg.x + seg.w; gx += 36) {
        g.fillTriangle(gx, top, gx + 8, top - 8, gx + 16, top);
      }

      const body = this.add.rectangle(cx, cy, seg.w, hgt, 0x000000, 0);
      this.physics.add.existing(body, true);
      this.solids.push(body);
    });
  }

  _groundSegments(level) {
    // Skapar markbitar mellan hålen.
    const gaps = (level.gaps || []).slice().sort((a, b) => a.x - b.x);
    const segments = [];
    let cursor = 0;
    gaps.forEach((gap) => {
      const gapStart = gap.x - gap.w / 2;
      if (gapStart > cursor) {
        segments.push({ x: cursor, w: gapStart - cursor });
      }
      cursor = gap.x + gap.w / 2;
    });
    if (cursor < level.width) {
      segments.push({ x: cursor, w: level.width - cursor });
    }
    return segments;
  }

  _buildPlatforms(level) {
    this.platforms = this.physics.add.staticGroup();
    level.platforms.forEach((p) => {
      const hgt = 26;
      const g = this.add.graphics().setDepth(1);
      g.fillStyle(0x9b6b3c, 1);
      g.fillRoundedRect(p.x - p.w / 2, p.y - hgt / 2 + 4, p.w, hgt, 8);
      g.fillStyle(0x7cc24f, 1);
      g.fillRoundedRect(p.x - p.w / 2, p.y - hgt / 2, p.w, hgt - 8, 8);

      const body = this.add.rectangle(p.x, p.y, p.w, hgt, 0x000000, 0);
      this.physics.add.existing(body, true);
      // Enkelriktad: man kan hoppa upp underifrån, landar bara ovanpå.
      body.body.checkCollision.down = false;
      body.body.checkCollision.left = false;
      body.body.checkCollision.right = false;
      this.platforms.add(body);
    });
  }

  _buildTreats(level) {
    this.treats = this.physics.add.group({ allowGravity: false, immovable: true });
    level.treats.forEach((t) => {
      const treat = this.treats.create(t.x, t.y, "treat").setDepth(2);
      this.tweens.add({
        targets: treat,
        y: t.y - 8,
        duration: 900,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    });
  }

  _buildHazards(level, char) {
    this.hazards = this.physics.add.group({ allowGravity: false, immovable: true });
    level.hazards.forEach((hz) => {
      const texture = char.hazards[hz.kind] || char.hazards[0];
      const hazard = this.hazards.create(hz.x, hz.y, texture).setDepth(2);
      hazard.setOrigin(0.5, 1); // står på marken
      hazard.y = hz.y + 36;
      hazard.body.setSize(hazard.width * 0.7, hazard.height * 0.7);
      // liten gungning så det känns levande
      this.tweens.add({
        targets: hazard,
        angle: { from: -4, to: 4 },
        duration: 1200,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    });
  }

  _buildGoal(level, char) {
    // Stolpe med det gyllene priset i toppen.
    const g = this.add.graphics().setDepth(1);
    g.fillStyle(0xb07a3c, 1);
    g.fillRect(level.goal.x - 5, level.goal.y - 90, 10, 150);
    this.add
      .text(level.goal.x, level.goal.y - 120, "MÅL", {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#e08a2e",
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setDepth(2);

    this.goal = this.physics.add.staticGroup();
    const prize = this.goal
      .create(level.goal.x, level.goal.y - 90, char.prize.texture)
      .setDepth(2);
    this.tweens.add({
      targets: prize,
      y: prize.y - 12,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
  }

  _buildPlayer(level, char) {
    this.player = this.physics.add.sprite(level.start.x, level.start.y, char.texture);
    this.player.setScale(0.46).setDepth(5);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(96, 128).setOffset(37, 32);

    // Utrustad accessoar (om någon köpts + valts)
    const item = getItem(getEquipped(this.charId));
    if (item) {
      const off = item.offset;
      this.accessory = this.add.image(this.player.x, this.player.y, item.texture);
      this.accessory.setScale(off.scale).setDepth(6);
      if (item.colorable) {
        const color = getItemColor(item.id);
        this.accessory.setTint(color === null ? item.defaultColor : color);
      }
      this._accOffset = off;
    }
  }

  _buildTopBar(level) {
    const w = this.scale.width;
    // Bana-namn i mitten
    this.add
      .text(w / 2, 30, `Bana ${this.levelIndex + 1}: ${level.name}`, {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffffff",
        stroke: "#3a8fc0",
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(900);

    // Paus / tillbaka-knapp
    const pause = this.add
      .text(w / 2, 64, "⏸  Meny", {
        fontSize: "18px",
        color: "#ffffff",
        backgroundColor: "#00000055",
        padding: { x: 10, y: 4 },
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(900)
      .setInteractive({ useHandCursor: true });
    pause.on("pointerdown", () => this.scene.start("LevelSelectScene"));
  }

  // ---------- Spel-händelser ----------

  _collectTreat(player, treat) {
    treat.destroy();
    const total = addCoins(1);
    this.hud.setCoins(total);
    // liten "+1"-pop
    const pop = this.add
      .text(treat.x, treat.y, "+1", {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffce3e",
        stroke: "#a85e12",
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(20);
    this.tweens.add({
      targets: pop,
      y: pop.y - 40,
      alpha: 0,
      duration: 600,
      onComplete: () => pop.destroy(),
    });
  }

  _hitHazard(player, hazard) {
    if (this.invuln || this.finished) return;
    const dir = player.x < hazard.x ? -1 : 1; // knuffas bort från faran
    this._loseHeart(dir);
  }

  _loseHeart(knockDir = -1) {
    this.hearts -= 1;
    this.hud.setHearts(this.hearts);

    if (this.hearts <= 0) {
      this._gameOver();
      return;
    }

    // Kort osårbarhet + blink + liten knuff
    this.invuln = true;
    this.player.setVelocity(knockDir * 180, -260);
    const blink = this.tweens.add({
      targets: this.player,
      alpha: 0.3,
      duration: 120,
      yoyo: true,
      repeat: 5,
    });
    this.time.delayedCall(1100, () => {
      this.invuln = false;
      this.player.setAlpha(1);
      blink.stop();
    });
  }

  _reachGoal() {
    if (this.finished) return;
    this.finished = true;
    this.physics.pause();
    setProgress(this.charId, this.levelIndex + 1);
    this.scene.start("ResultScene", {
      win: true,
      charId: this.charId,
      levelIndex: this.levelIndex,
    });
  }

  _gameOver() {
    if (this.finished) return;
    this.finished = true;
    this.physics.pause();
    this.scene.start("ResultScene", {
      win: false,
      charId: this.charId,
      levelIndex: this.levelIndex,
    });
  }

  _respawnAfterFall() {
    // _loseHeart sköter game over om hjärtana tar slut.
    this._loseHeart(0);
    if (this.finished) return;
    this.player.setVelocity(0, 0);
    this.player.setPosition(this.safePos.x, this.safePos.y - 20);
  }

  // ---------- Loop ----------

  update() {
    if (this.finished) return;
    const player = this.player;

    this.controls.update();

    // Rörelse vänster/höger
    if (this.controls.isLeft()) {
      player.setVelocityX(-MOVE_SPEED);
      player.setFlipX(true);
    } else if (this.controls.isRight()) {
      player.setVelocityX(MOVE_SPEED);
      player.setFlipX(false);
    } else {
      player.setVelocityX(0);
    }

    // Hopp (bara när man står på marken)
    const onGround = player.body.blocked.down || player.body.touching.down;
    if (onGround && this.controls.jumpPressed) {
      player.setVelocityY(JUMP_VELOCITY);
    }

    // Kom ihåg senaste säkra ställe (på fast mark, inte över ett hål)
    if (onGround && !this._overGap(player.x)) {
      this.safePos = { x: player.x, y: player.y };
    }

    // Ramlat i ett hål?
    if (player.y > this.scale.height + 80) {
      this._respawnAfterFall();
    }

    // Accessoaren följer med
    if (this.accessory) {
      this.accessory.x = player.x + (player.flipX ? -this._accOffset.x : this._accOffset.x);
      this.accessory.y = player.y + this._accOffset.y;
      this.accessory.setFlipX(player.flipX);
      this.accessory.setAlpha(player.alpha);
    }
  }

  _overGap(x) {
    return (this.level.gaps || []).some((g) => x > g.x - g.w / 2 - 20 && x < g.x + g.w / 2 + 20);
  }
}
