import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "../constants";
import { state } from "../state";
import { playSound } from "../audio";

const ANIMATION_SPEED = 0.1;

// Assets
const runAnim = [
  await PIXI.Texture.fromURL("sprites/dino-run1.png"),
  await PIXI.Texture.fromURL("sprites/dino-run2.png"),
];
const jumpAnim = [await PIXI.Texture.fromURL("sprites/dino-jump1.png")];

export const dinoDecapAnim = [
  await PIXI.Texture.fromURL("sprites/dino-decap.png"),
];

export class Dino {
  private spawned = false;
  private dy = 0;
  private dx = 0;
  public sprite: PIXI.AnimatedSprite;

  constructor() {
    this.sprite = new PIXI.AnimatedSprite(runAnim);
    this.sprite.anchor.set(0, 1);
    this.sprite.animationSpeed = ANIMATION_SPEED;
  }

  set x(x: number) {
    this.sprite.x = x;
  }

  set y(y: number) {
    this.sprite.y = y;
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }

  get hitbox() {
    return this.sprite.getBounds();
  }

  spawn(container: PIXI.Container, x: number, y: number) {
    container.addChild(this.sprite);
    this.x = x;
    this.y = y;

    this.spawned = true;
  }

  despawn() {
    this.sprite.parent.removeChild(this.sprite);
  }

  playAnimation(anim: PIXI.Texture[]) {
    if (!this.spawned) {
      throw new Error("Entity must be spawned first");
    }
    this.sprite.textures = anim;
    this.sprite.play();
  }

  update(dt: number) {
    // apply forces
    const prevDinoY = this.y;
    this.dy += GRAVITY * dt;
    this.y = Math.min(this.y + this.dy * dt, GROUND_LEVEL);

    // dino hit the ground
    if (prevDinoY < GROUND_LEVEL && this.y === GROUND_LEVEL) {
      this.playAnimation(runAnim);
    }

    // dino jumped
    if (state.keyboard.activeButtons.has("up") && this.y === GROUND_LEVEL) {
      this.dy = JUMP_VEL;
      this.playAnimation(jumpAnim);
      playSound("jump");
    }
  }
}
