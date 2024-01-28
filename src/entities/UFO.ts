import * as PIXI from "pixi.js";

import { GameStatus, setGameStatus, state } from "../state";
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

export class UFO extends Entity {
  velocity = { x: 100, y: 0 };
  base_y = 0;
  total_time = 0;

  constructor(x = 0, y = GROUND_LEVEL - 100) {
    super(animations, "idle");
    this.x = x;
    this.y = y;
    this.base_y = y;
    this.sprite.scale = { x: 0.1, y: 0.1 };
  }

  update(dt: number) {
    // move the ufo
    this.total_time += dt;
    this.x -= (this.velocity.x + state.runSpeed) * dt;
    this.y = this.base_y + Math.sin(this.total_time * 5) * 40;

    if (this.isCollidingWith(state.dino.hitbox)) {
      state.dino.dieFromCar();
      setGameStatus(GameStatus.GameOver);
    }
  }
}
