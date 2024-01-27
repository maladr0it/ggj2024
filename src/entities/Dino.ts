import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "../constants";
import { state } from "../state";
import { playSound } from "../audio";
import { Entity } from "./Entity";

// Assets
const animations: Record<string, PIXI.Texture[]> = {
  running: [
    await PIXI.Texture.fromURL("sprites/dino-run1.png"),
    await PIXI.Texture.fromURL("sprites/dino-run2.png"),
  ],
  jumping: [await PIXI.Texture.fromURL("sprites/dino-jump1.png")],
  decapitate: [await PIXI.Texture.fromURL("sprites/dino-decap.png")],
};

export class Dino extends Entity {
  private dy = 0;
  private dx = 0;

  constructor() {
    super(animations, "jumping");
  }

  update(dt: number) {
    // apply forces
    const prevDinoY = this.y;
    this.dy += GRAVITY * dt;
    this.y = Math.min(this.y + this.dy * dt, GROUND_LEVEL);

    // dino hit the ground
    if (prevDinoY < GROUND_LEVEL && this.y === GROUND_LEVEL) {
      this.playAnimation("running");
    }

    // dino jumped
    if (state.keyboard.activeButtons.has("jump") && this.y === GROUND_LEVEL) {
      this.dy = JUMP_VEL;
      this.playAnimation("jumping");
      playSound("jump");
    }
  }
}
