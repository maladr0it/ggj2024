import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "../constants";
import { state } from "../state";
import { playSound } from "../audio";

const ANIMATION_SPEED = 0.2;

// Assets
const animations: Record<string, PIXI.Texture[]> = {
  "running": [
    await PIXI.Texture.fromURL("sprites/dino-run1.png"),
    await PIXI.Texture.fromURL("sprites/dino-run2.png"),
  ],
  "jumping": [
    await PIXI.Texture.fromURL("sprites/dino-jump1.png")
  ],
  "decapitate": [
    await PIXI.Texture.fromURL("sprites/dino-decap.png"),
  ]
};

export class Dino {
  private spawned = false;
  private dy = 0;
  private dx = 0;
  public currentAnimation = "jumping";
  public sprite: PIXI.AnimatedSprite;

  constructor() {
    this.sprite = new PIXI.AnimatedSprite(animations[this.currentAnimation]);
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

  playAnimation(newAnimation: string) {
    this.currentAnimation = newAnimation;
    if (!this.spawned) {
      throw new Error("Entity must be spawned first");
    }
    this.sprite.textures = animations[this.currentAnimation];
    this.sprite.play();
  }

  update(dt: number) {
    // apply forces
    const prevDinoY = this.y;
    this.dy += GRAVITY * dt;
    this.y = Math.min(this.y + this.dy * dt, GROUND_LEVEL);

    // dino hit the ground
    if (prevDinoY < GROUND_LEVEL && this.y === GROUND_LEVEL) {
      this.playAnimation("running");
    }

    // dino jumped
    if (state.keyboard.activeButtons.has("jump") && this.y === GROUND_LEVEL) {
      this.dy = JUMP_VEL;
      this.playAnimation("jumping");
      playSound("jump");
    }
  }
}
