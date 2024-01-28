import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL } from "../constants";
import { Entity } from "./Entity";
import { state } from "../state";

const HEAD_VEL_X = -100;
const HEAD_VEL_Y = -500;

const animations = {
  default: [await PIXI.Texture.fromURL("sprites/dino-head.png")],
};

export class DinoHead extends Entity {
  worldX: number;
  groundY = GROUND_LEVEL + 28;

  private dy = 0;
  private dx = 0;

  constructor(worldX: number) {
    super(animations, "default");
    this.worldX = worldX;
    this.dx = HEAD_VEL_X;
    this.dy = HEAD_VEL_Y;
  }

  update(dt: number) {
    this.dy += GRAVITY * dt;
    this.y = Math.min(this.y + this.dy * dt, GROUND_LEVEL + 28);

    this.worldX += this.dx * dt;
    this.x = this.worldX - state.distance;
    if (this.y === this.groundY) {
      this.dx = 0;
    }
  }
}
