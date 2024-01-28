import * as PIXI from "pixi.js";

import { GROUND_LEVEL } from "../constants";
import { GameStatus, setGameStatus, state } from "../state";
import { Entity } from "./Entity";

const animations = {
  idle: [await PIXI.Texture.fromURL("sprites/car1.png")],
};

const CAR_SPEED = 2_000;

export class Car extends Entity {
  speed = CAR_SPEED;

  constructor(x = 0, y = GROUND_LEVEL) {
    super(animations, "idle");
    this.sprite.scale = { x: 0.33, y: 0.33 };
    this.x = x;
    this.y = y;
  }

  update(dt: number) {
    // move the car
    this.x -= (this.speed + state.runSpeed) * dt;

    if (this.isCollidingWith(state.dino.hitbox)) {
      state.dino.dieFromCar();
      setGameStatus(GameStatus.GameOver);
    }
  }
}
