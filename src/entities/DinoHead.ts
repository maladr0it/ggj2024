import { GRAVITY, GROUND_LEVEL } from "../constants";
import { Entity } from "./Entity";
import { state } from "../state";
import { sprites } from "../assets";

const HEAD_VEL_X = -100;
const HEAD_VEL_Y = -200;

const animations = {
  default: [sprites["dino/dino-head.png"]],
};

export class DinoHead extends Entity {
  worldX: number;
  groundY = GROUND_LEVEL + 28;

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
