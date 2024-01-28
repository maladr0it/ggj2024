import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL } from "../constants";
import { Entity } from "./Entity";

const HEAD_VEL_X = -100;
const HEAD_VEL_Y = -500;

const animations = {
  default: [await PIXI.Texture.fromURL("sprites/dino-head.png")],
};

export class DinoHead extends Entity {
  private dy = 0;
  private dx = 0;

  constructor() {
    super(animations, "default");
    this.dx = HEAD_VEL_X;
    this.dy = HEAD_VEL_Y;
  }

  update(dt: number) {
    this.x += this.dx * dt;
    this.dy += GRAVITY * dt;
    this.y = Math.min(this.y + this.dy * dt, GROUND_LEVEL + 28);
  }
}
