import * as PIXI from "pixi.js";

import { GROUND_LEVEL } from "../constants";
import { state } from "../state";
import { Entity } from "./Entity";

const animations = {
  idle: [await PIXI.Texture.fromURL("sprites/car.png")],
};

const CAR_SPEED = 2_000;

export class Car extends Entity {
  speed = 0;

  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "idle");
    this.sprite.scale = { x: 0.33, y: 0.33 };
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    // if on-screen, speed up the car
    if (state.clipping.mask.getBounds().intersects(this.hitbox)) {
      this.speed = CAR_SPEED;
    }
    this.x -= (this.speed + state.runSpeed) * dt;
  }
}
