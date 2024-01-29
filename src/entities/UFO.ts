import { state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";
import { sprites } from "../assets";

const animations = {
  idle: [
    sprites["ufo/ufo1.png"],
    sprites["ufo/ufo2.png"],
    sprites["ufo/ufo3.png"],
    sprites["ufo/ufo4.png"],
    sprites["ufo/ufo5.png"],
    sprites["ufo/ufo6.png"],
    sprites["ufo/ufo7.png"],
    sprites["ufo/ufo8.png"],
    sprites["ufo/ufo9.png"],
    sprites["ufo/ufo10.png"],
    sprites["ufo/ufo11.png"],
  ],
};

const UFO_SPEED = 100;

export class UFO extends Entity {
  speed = 0;
  started = false;
  base_y = GROUND_LEVEL - 150;

  constructor(x = 0, y = GROUND_LEVEL - 160) {
    super(animations, "idle");
    this.x = x;
    this.y = y;
    this.base_y = y;
    this.sprite.scale = { x: 0.1, y: 0.1 };
  }

  update(dt: number) {
    // if on-screen, speed up the ufo
    if (
      !this.started &&
      state.clipping.mask.getBounds().intersects(this.hitbox)
    ) {
      this.started = true;
      this.speed = UFO_SPEED;
    }
    this.x -= (this.speed + state.runSpeed) * dt;

    this.y = this.base_y + Math.sin(state.distance / 100) * 30;
  }
}
