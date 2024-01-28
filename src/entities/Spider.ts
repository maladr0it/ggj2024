import { state } from "../state";
import { Entity } from "./Entity";
import { DINO_X_POS, GROUND_LEVEL } from "../constants";
import { sprites } from "../assets";
import { Player } from "tone";
import { playSound } from "../audio";

const SURPRISE_JUMP_VEL = 2000;

const animations = {
  default: [sprites["spider.png"]],
};

export class Spider extends Entity {
  private sound?: Player;

  constructor(x = 0, y = GROUND_LEVEL - 300) {
    super(animations, "default");
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    this.x -= state.runSpeed * dt;

    if (this.x < DINO_X_POS - 100) {
      return;
    }

    else if (this.x < DINO_X_POS + 160) {
      this.dy = SURPRISE_JUMP_VEL * dt;
      this.y = Math.min(this.y + this.dy, GROUND_LEVEL - 50);
      this.sound ??= playSound("spider");
      this.sound.volume.value = 24;
    }
  }
}
