import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";
import { sprites } from "../assets";

const animations = {
  default: [sprites["cactus-ghost.png"]],
};

export class GhostCactus extends Entity {
  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    this.x -= state.runSpeed * dt;
  }
}
