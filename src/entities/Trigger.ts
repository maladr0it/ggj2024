import { Entity } from "./Entity";
import { state } from "../state";
import { GROUND_LEVEL } from "../constants";
import { sprites } from "../assets";
import { Dino } from "./Dino";

const animations = {
  default: [sprites["gun.png"]],
};

export class Trigger extends Entity {
  offset: number;
  onHit: () => void;
  constructor(offset: number, onHit: () => void = () => console.log("bang!")) {
    super(animations, "default");
    this.offset = offset;
    this.sprite.visible = false;
    this.sprite.y = GROUND_LEVEL;
    this.sprite.height = 1000;
    this.onHit = onHit;
  }
  fired = false;
  onCollide(other: Entity): void {
    if (this.fired) return;
    if (other instanceof Dino) {
      this.onHit();
      this.fired = true;
    }
  }
  update() {
    this.x = this.offset - state.distance;
  }
}
