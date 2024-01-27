import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "../constants";
import { state } from "../state";
import { Entity } from "./Entity";

const animations = {
  idle: [await PIXI.Texture.fromURL("sprites/car1.png")],
};

const CAR_SPEED = 10;

export class Car extends Entity {
  constructor() {
    super(animations, "idle");
  }

  update(_dt: number) {
    // move the car
    const bounds = this.w;
    const wishX = (this.x -= CAR_SPEED);
  }
}
