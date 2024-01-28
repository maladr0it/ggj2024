import * as PIXI from "pixi.js";

import { GameStatus, setGameStatus, state } from "../state";
import { Entity } from "./Entity";
import { GROUND_LEVEL } from "../constants";

const animations = {
  idle: [
    await PIXI.Texture.fromURL("sprites/ufo/ufo-1.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-2.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-3.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-4.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-5.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-6.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-7.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-8.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-9.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-10.png"),
    await PIXI.Texture.fromURL("sprites/ufo/ufo-11.png"),
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
