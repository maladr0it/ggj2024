import { state } from "../state";
import { Entity } from "./Entity";
import { DINO_X_POS, GROUND_LEVEL } from "../constants";
import { sprites } from "../assets";

const animations = {
  default: [sprites["cactus1.png"]],
};

export class SurpriseCactus extends Entity {
  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "default");
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    this.x -= state.runSpeed * dt;

    if (this.x < DINO_X_POS + 100) {
      this.dy = -800 * dt;
    }

    this.y = Math.max(this.y + this.dy, 0);
  }
}
