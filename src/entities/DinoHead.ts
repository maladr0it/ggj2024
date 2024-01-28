import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL } from "../constants";
import { state } from "../state";

// Assets
const anim = [await PIXI.Texture.fromURL("sprites/dino-head.png")];

export class DinoHead {
  private initialX = 0;
  private dy: number;
  public sprite: PIXI.AnimatedSprite;

  constructor() {
    this.sprite = new PIXI.AnimatedSprite(anim);
    this.sprite.anchor.set(0, 1);
    this.dy = -600;
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
    this.initialX = x;
  }

  despawn() {
    this.sprite.parent.removeChild(this.sprite);
  }

  update(dt: number) {
    this.x = this.initialX - state.distance;
    this.dy += GRAVITY * dt;
    this.y = Math.min(this.y + this.dy * dt, GROUND_LEVEL + 28);
  }
}
