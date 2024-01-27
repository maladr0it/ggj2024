import * as PIXI from "pixi.js";
import { GROUND_LEVEL } from "../constants";
import { state } from "../state";

export class Cactus {
  sprite = PIXI.AnimatedSprite.fromImages(["sprites/cactus1.png"]);
  private initialX = 0;

  constructor() {
    this.sprite.anchor.set(0, 1);
  }

  static spawn(x: number, y = GROUND_LEVEL) {
    const entity = new Cactus();
    entity.x = x;
    entity.y = y;
    entity.initialX = x;
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
    return this.sprite.getBounds().intersects(hitbox);
  }

  update(_dt: number) {
    this.x = this.initialX - state.distance;
    if(this.isCollidingWith(state.dino.hitbox)) {
      state.dino.dieWithDecapitation();
    }
  }
}
