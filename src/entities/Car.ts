import * as PIXI from "pixi.js";

import { GRAVITY, GROUND_LEVEL, JUMP_VEL } from "../constants";
import { GameStatus, setGameStatus, state } from "../state";
import { Entity } from "./Entity";

const animations = {
  idle: [await PIXI.Texture.fromURL("sprites/car1.png")],
};

const CAR_SPEED = 15;

export class Car extends Entity {
  constructor() {
    super(animations, "idle");
    this.sprite.scale = { x: 0.33, y: 0.33 };
  }

  update(dt: number) {
    // move the car
    this.x -= (CAR_SPEED + state.runSpeed) * dt;

    if (this.isCollidingWith(state.dino.hitbox)) {
      state.dino.dieFromCar();
      setGameStatus(GameStatus.GameOver);
    }
  }
}
