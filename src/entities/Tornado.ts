import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";
import { sprites } from "../assets";

const animations = {
  default: [
    sprites["tornado/tornado-1.png"],
    sprites["tornado/tornado-2.png"],
    sprites["tornado/tornado-3.png"],
    sprites["tornado/tornado-4.png"],
    sprites["tornado/tornado-5.png"],
  ],
};

export class Tornado extends Entity {
  constructor(x = 0, y = GROUND_LEVEL - 3) {
    super(animations, "default");
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    this.x -= state.runSpeed * dt;
  }

  onCollide(other: Entity): void {
    // pass
  }
}
