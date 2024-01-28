import * as PIXI from "pixi.js";

import { GROUND_LEVEL } from "../constants";
import { state } from "../state";
import { Entity } from "./Entity";
import { log_write } from "../log";
import { Player } from "tone";
import { playSound } from "../audio";

const animations = {
  idle: [await PIXI.Texture.fromURL("sprites/car.png")],
};

const CAR_SPEED = 2_000;

export class Car extends Entity {
  speed = 0;
  started = false;

  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "idle");
    this.sprite.scale = { x: 0.33, y: 0.33 };
    this.x = x;
    this.y = y;
  }

  sound?: Player;

  update(dt: number) {
    // if on-screen, speed up the car
    if (
      !this.started &&
      state.clipping.mask.getBounds().intersects(this.hitbox)
    ) {
      this.started = true;
      this.speed = CAR_SPEED;
    }
    this.x -= (this.speed + state.runSpeed) * dt;
    if (this.x < 1300) {
      this.sound ??= playSound("car");
    }
  }

  cleanup(): void {
    this.sound?.dispose();
  }
}
