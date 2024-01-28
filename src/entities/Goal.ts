import { Entity } from "./Entity";
import { state } from "../state";
import { GROUND_LEVEL } from "../constants";
import { Dino } from "./Dino";
import { sprites } from "../assets";

export class Goal extends Entity {
  offset: number;
  constructor(offset: number) {
    super({ default: [sprites["cloud.png"]] }, "default");
    this.x = offset;
    this.offset = offset;
    this.sprite.y = GROUND_LEVEL;
  }
  completed = false;
  onCollide(other: Entity): void {
    if (this.completed) return;
    this.completed = true;
    if (other instanceof Dino) {
      state.runSpeed = 0;
      state.dino.alive = false;
      // @patrick set the win animation here
      setTimeout(() => {
        window.location.href = "https://globalgamejam.org/";
      }, 2000);
    }
  }
  update() {
    this.x = this.offset - state.distance;
  }
}
