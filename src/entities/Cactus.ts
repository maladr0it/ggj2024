import * as PIXI from "pixi.js";
import {GROUND_LEVEL} from "../constants";

export class Cactus {
  sprite = PIXI.AnimatedSprite.fromImages(["sprites/cactus1.png"]);
  hitbox = this.sprite.getBounds();

  constructor() {
    this.sprite.anchor.set(0, 1);
  }

  static create(x: number, y = GROUND_LEVEL) {
    const entity = new Cactus();
    entity.x = x
    entity.y = y;
    return entity;
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

  isCollidingWith(hitbox: PIXI.Rectangle) {
    return this.hitbox.intersects(hitbox);
  }
}
